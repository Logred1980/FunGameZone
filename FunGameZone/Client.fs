namespace FunGameZone

open WebSharper
open WebSharper.UI
open WebSharper.UI.Templating
open WebSharper.UI.Notation
open WebSharper.UI.Html
open WebSharper.UI.Client
open WebSharper.JavaScript
open FunGameZone.CommonMethods
open RoomTypes

[<JavaScript>]
module Templates =

    type MainTemplate = Templating.Template<"Main.html", ClientLoad.FromDocument, ServerLoad.WhenChanged>

[<JavaScript>]
module Client =

    let Main () =
        let container = Var.Create(Doc.Empty)
        let hostNameVar = Var.Create("")
        let roomNameVar = Var.Create("")

        let lastRoomCount = ref 0
        let lastRoomState = ref List.empty<(string * bool)>

        let renderRoom (roomName:string, roomToken: string, hostName: string, created: string, isOpen: bool) =
            let playerNameVar = Var.Create("")

            div [attr.``class`` "d-flex flex-wrap align-items-center mb-2"] [
                button [
                    attr.``class`` "btn btn-outline-light btn-sm me-2"
                    if (not isOpen) then attr.disabled("")
                    on.click (fun _ _ ->
                        async {
                            let playerName = playerNameVar.Value.Trim()
                            if playerName <> "" then
                                let playerToken = generateToken ()
                                let! result = Server.AddPlayerToRoom(roomToken, playerName, playerToken)
                                match result with
                                | Ok () ->
                                    let url = "/room/" + roomToken + "/player/" + playerToken
                                    JS.Window.Open(url, "_blank") |> ignore
                                | Error msg ->
                                    JS.Alert msg |> ignore
                            else
                                JS.Alert("Enter your player name!") |> ignore
                        } |> Async.StartImmediate
                    )
                ] [text "Join the room"]
                label [attr.``class`` "me-2 ms-3"] [text "Player Name:"]
                Doc.InputType.Text [
                    attr.``class`` "form-control form-control-sm"
                    attr.``style`` "width: 150px"
                ] playerNameVar
                div [attr.``class`` "text-light ms-3 me-2 fw-bold"] [text "Room name:"]
                div [attr.``class`` "text-light ms-2 me-4"] [text roomName]
                div [attr.``class`` "text-light ms-3 me-2 fw-bold"] [text "Host name:"]
                div [attr.``class`` "text-light ms-2 me-4"] [text hostName]
                div [attr.``class`` "text-light ms-3 me-2 fw-bold"] [text "Create date:"]
                div [attr.``class`` "text-muted small"] [text created]
            ]

        let getRoomState rooms =
            rooms |> List.map (fun r -> r.RoomToken, r.IsOpen)

        let rec refreshRoomsLoop () =
            async {
                let! rooms = Server.GetAllRooms ()
                let currentState = getRoomState rooms
                if List.length rooms <> List.length !lastRoomState || currentState <> !lastRoomState then
                    let docs =
                        rooms
                        |> List.map (fun r -> renderRoom (r.RoomName, r.RoomToken, r.HostName, r.CreatedDT.ToString("yyyy-MM-dd HH:mm:ss"), r.IsOpen))
                    container := Doc.Concat docs
                    lastRoomState := currentState
                do! Async.Sleep 2000
                return! refreshRoomsLoop ()
            }
        refreshRoomsLoop () |> Async.StartImmediate

        let addRoom () =
            async {
                let hostName = hostNameVar.Value.Trim()
                let roomName = roomNameVar.Value.Trim()

                if hostName <> "" && roomName <> "" then
                    let roomToken = generateToken ()
                    let hostToken = generateToken ()

                    let! result = Server.RegisterRoom (hostName, hostToken, roomName, roomToken)

                    match result with
                    | Result.Ok () ->
                        let hostUrl = "/room/" + roomToken + "/host/" + hostToken
                        JS.Window.Open(hostUrl, "_blank") |> ignore
                    | Result.Error msg ->
                        JS.Alert msg |> ignore
                else
                    JS.Alert("You did not enter the Host or Room name!") |> ignore
            }
            |> Async.StartImmediate

        let rec loop () =
            async {
                let! rooms = Server.GetAllRooms ()
                let currentCount = List.length rooms
                if currentCount <> !lastRoomCount then
                    let docs =
                        rooms
                        |> List.map (fun r -> renderRoom (r.RoomName, r.RoomToken, r.HostName, r.CreatedDT.ToString("yyyy-MM-dd HH:mm:ss"), r.IsOpen))
                    container := Doc.Concat docs
                    lastRoomCount := currentCount
                do! Async.Sleep 2000
                return! loop ()
            }
        loop () |> Async.StartImmediate
        
        Templates.MainTemplate.MainForm()
            .Body(
                div [] [
                    div [attr.``class`` "border border-success rounded p-3 mb-4"] [
                        div [attr.``class`` "d-flex flex-wrap align-items-center"] [
                            button [
                                attr.``class`` "btn btn-success me-3"
                                on.click (fun _ _ -> addRoom ())
                            ] [text "Create Room"]

                            label [attr.``class`` "me-2"] [text "Host Name:"]
                            Doc.InputType.Text [attr.``class`` "form-control form-control-sm me-4"; attr.``style`` "width: 150px"] hostNameVar

                            label [attr.``class`` "me-2"] [text "Room Name:"]
                            Doc.InputType.Text [attr.``class`` "form-control form-control-sm"; attr.``style`` "width: 150px"] roomNameVar
                        ]
                    ]
                    div [attr.``class`` "border border-secondary rounded p-3"] [
                        Doc.EmbedView container.View
                    ]
                ]
            )
            .Doc()
    
    [<JavaScript>]
    let RoomTemplatePage
        (hostName: string)
        (personalToken: string)
        (roomName: string)
        (roomToken: string)
        (isHost: bool)
        (playerInfosView: View<list<PlayerInfo>>)
        (leftExtras: Doc list)
        (rightExtras: (string -> Doc) option) =

        let currentGameVar = Var.Create None
        let playerStateVar = Var.Create<Option<Game21Logic.PlayerState>> None

        async {
            let! psOpt = Server.GetPlayerState(roomToken, personalToken)
            playerStateVar := psOpt
        } |> Async.StartImmediate |> ignore

        let availableGames : (string * (string -> string -> obj -> obj option -> Doc)) list = [
            "Game21", (fun roomToken ownToken stateObj playerStateObjOpt ->
                FunGameZone.Game21Zone.showGameZone roomToken ownToken stateObj playerStateObjOpt
            )
        ]

        let refreshCurrentGame () =
            async {
                let! currentGame = Server.GetCurrentGame(roomToken)
                currentGameVar := currentGame
            }
        refreshCurrentGame () |> Async.StartImmediate |> ignore

        let rec refreshGameLoop () =
            async {
                let! current = Server.GetCurrentGame(roomToken)
                if current <> currentGameVar.Value then
                    currentGameVar := current
                do! Async.Sleep 1000
                return! refreshGameLoop ()
            }
        refreshGameLoop () |> Async.StartImmediate |> ignore

        let playerList =
            View.Map (fun players ->
                let ordered =
                    let hostPlayer = players |> List.tryFind (fun p -> p.Token = personalToken)
                    let others = players |> List.filter (fun p -> p.Token <> personalToken)
                    match hostPlayer with
                    | Some h -> h :: others
                    | None -> others
                div [
                    attr.``class`` "bg-secondary text-white rounded p-3 ms-3"
                    attr.style "width: 20%"
                ] [
                    h5 [attr.``class`` "mb-3"] [text "Players"]
                    yield!
                        ordered
                        |> List.map (fun player ->
                            div [attr.``class`` "d-flex justify-content-between align-items-center mb-2"] [
                                span [] [text player.Name]
                                match rightExtras with
                                | Some gen when isHost && player.Token <> personalToken ->
                                    button [
                                        attr.``class`` "btn btn-danger btn-sm mt-2"
                                        attr.style "margin-left: 5px"
                                        on.click (fun _ _ ->
                                            async {
                                                let! result = Server.RemovePlayerFromRoom(roomToken, player.Token)
                                                match result with
                                                | Ok () -> ()
                                                | Error msg -> JS.Alert msg |> ignore
                                            } |> Async.StartImmediate
                                        )
                                    ] [text "X"]

                                | _ -> Doc.Empty
                            ]
                        )
                ]
            ) playerInfosView

        div [attr.``class`` "d-flex flex-wrap justify-content-between mt-3"] [
            
            // Left Zone - Own Data
            div [attr.``class`` "bg-secondary text-white rounded p-3 me-3"; attr.style "width: 20%"] [
                h5 [] [text (if isHost then "Host datas" else "Players datas")]
                p [] [text ("Room name: " + roomName)]
                p [] [text ("Host name: " + hostName)]
                
                yield! leftExtras
            ]

            // Middle Zone
            div [attr.``class`` "col-md-6"] [
                div [attr.``class`` "bg-secondary text-white rounded p-3 mb-3 w-100"] [
                    h5 [] [text "Game Zone"]
                ]
                Doc.EmbedView (
                    View.Map (function
                        | None ->
                            div [attr.``class`` "border border-info rounded p-3 w-100"] [
                                ul [attr.``class`` "mb-0 list-unstyled"] [
                                    for (gameName, showGame) in availableGames do
                                        yield li [attr.``class`` "d-flex justify-content-between align-items-center mb-2 w-100"] [
                                            yield div [] [text gameName]
                                            if isHost then
                                                yield button [
                                                    attr.``class`` "btn btn-primary btn-sm"
                                                    on.click (fun _ _ ->
                                                        async {
                                                            do! Server.SetCurrentGame(roomToken, Some gameName)
                                                            do! refreshCurrentGame ()
                                                            do! Server.StartGame roomToken |> Async.Ignore
                                                        } |> Async.StartImmediate
                                                    )
                                                ] [text "Start"]
                                        ]
                                ]
                            ]
                        | Some gameName ->
                            Doc.Async (async {
                                let! stateOpt = Server.GetGameState roomToken
                                return
                                    match stateOpt with
                                    | Some state ->
                                        match List.tryFind (fun (n, _) -> n = gameName) availableGames with
                                        | Some (_, buildGameUI) ->
                                            buildGameUI roomToken personalToken state (playerStateVar.Value |> Option.map box)
                                        | None -> Doc.TextNode "This game is wrong..."
                                    | None -> Doc.TextNode "The Game state does not exist!"
                            })
                    ) currentGameVar.View
                )
            ]

            // Right Zone - Players Data
            Doc.EmbedView playerList
        ]

    [<JavaScript>]
    let RoomHostPage (roomToken: string) (hostToken: string) =
        let playersVar = Var.Create<List<PlayerInfo>>([])
        let roomInfoVar = Var.Create None

        let lastPlayerCount = ref 0

        let refreshDatas () =
            async {
                let! players = Server.GetPlayersInRoom roomToken
                playersVar := players
                lastPlayerCount := List.length players
            }

        let rec loop () =
            async {
                let! players = Server.GetPlayersInRoom roomToken
                let currentCount = List.length players
                if currentCount <> !lastPlayerCount then
                    playersVar := players
                    lastPlayerCount := currentCount
                do! Async.Sleep 1000
                return! loop ()
            }
        refreshDatas () |> Async.StartImmediate |> ignore
        loop () |> Async.StartImmediate |> ignore

        let refreshRoomInfo () =
            async {
                let! roomOpt = Server.GetRoomByToken roomToken
                roomInfoVar := roomOpt
            }
        refreshRoomInfo () |> Async.StartImmediate |> ignore

        Doc.EmbedView (
            View.Map (fun roomOpt ->
                match roomOpt with
                | Some room ->
                    RoomTemplatePage
                        room.HostName
                        hostToken
                        room.RoomName
                        roomToken
                        true
                        playersVar.View
                        [
                            button [
                                attr.``class`` "btn btn-danger btn-sm mt-2 me-2"
                                on.click (fun _ _ ->
                                    async {
                                        let! result = Server.RemoveRoom(roomToken)
                                        match result with
                                        | Ok () -> JS.Window.Close()
                                        | Error msg -> JS.Alert msg |> ignore
                                    } |> Async.StartImmediate
                                )
                            ] [text "Del Room"]
                            button [
                                attr.``class`` "btn btn-primary btn-sm mt-2 me-2"
                                on.click (fun _ _ ->
                                    async {
                                        let newState = not room.IsOpen
                                        let! result = Server.SetRoomOpenState(roomToken, newState)
                                        match result with
                                        | Ok () ->
                                            // Frissítsd a roomInfoVar-t, hogy a View is frissüljön!
                                            let! updatedRoom = Server.GetRoomByToken roomToken
                                            roomInfoVar := updatedRoom
                                        | Error msg -> JS.Alert msg |> ignore
                                    } |> Async.StartImmediate
                                )
                            ] [text (if room.IsOpen then "Close Room" else "Open Room")]
                        ]
                        (Some (fun _ -> Doc.Empty))
                | None ->
                    div [] [text "Room does not exist!"]
            ) roomInfoVar.View
        )

    [<JavaScript>]
    let RoomPlayerPage (roomToken: string) (playerToken: string) =
        let playersVar = Var.Create<List<PlayerInfo>>([])
        let roomInfoVar = Var.Create None

        let lastPlayerCount = ref 0

        let refreshDatas () =
            async {
                let! players = Server.GetPlayersInRoom roomToken
                playersVar := players
                lastPlayerCount := List.length players
            }

        let rec loop () =
            async {
                let! players = Server.GetPlayersInRoom roomToken
                let currentCount = List.length players
                if currentCount <> !lastPlayerCount then
                    playersVar := players
                    lastPlayerCount := currentCount
                do! Async.Sleep 1000
                return! loop ()
            }
        refreshDatas () |> Async.StartImmediate |> ignore
        loop () |> Async.StartImmediate |> ignore

        let refreshRoomInfo () =
            async {
                let! roomOpt = Server.GetRoomByToken roomToken
                roomInfoVar := roomOpt
            }
        refreshRoomInfo () |> Async.StartImmediate |> ignore

        Doc.EmbedView (
            View.Map (fun roomOpt ->
                match roomOpt with
                | Some room ->
                    let ownName =
                        playersVar.Value
                        |> List.tryFind (fun p -> p.Token = playerToken)
                        |> Option.map (fun p -> p.Name)
                        |> Option.defaultValue "Unknown"

                    RoomTemplatePage
                        room.HostName
                        playerToken
                        room.RoomName
                        roomToken
                        false
                        playersVar.View
                        [
                            p [] [text ("Your name: " + ownName)]
                            button [
                                attr.``class`` "btn btn-danger btn-sm mt-2"
                                on.click (fun _ _ ->
                                    async {
                                        let! result = Server.RemovePlayerFromRoom(roomToken, playerToken)
                                        match result with
                                        | Ok () ->
                                            JS.Window.Close()
                                        | Error msg ->
                                            JS.Alert msg |> ignore
                                    } |> Async.StartImmediate
                                )
                            ] [text "Exit"]
                        ]
                        None
                | None ->
                    div [] [text "Room does not exist!"]
            ) roomInfoVar.View
        )