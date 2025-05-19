namespace FunGameZone

open WebSharper
open RoomTypes
open System.IO

module Server =

    [<Rpc>]
    let RegisterRoom (hostName: string, hostToken: string, roomName: string, roomToken: string) : Async<Result<unit, string>> =
        async {
            let existingRoom =
                RoomsDB.getAllRooms ()
                |> List.exists (fun r -> r.RoomName = roomName)

            if existingRoom then
                return Result.Error "A room with that name already exists!"
            else
                let newRoom =
                    {
                        RoomToken = roomToken
                        HostToken = hostToken
                        HostName = hostName
                        RoomName = roomName
                        Players = []
                        CreatedDT = System.DateTime.Now
                        IsOpen = true
                        CurrentGame = None
                    }

                RoomsDB.addRoom (hostName, hostToken, roomName, roomToken)
                return Result.Ok ()
        }

    [<Rpc>]
    let AddPlayerToRoom (roomToken: string, playerName: string, playerToken: string) : Async<Result<unit, string>> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room when not room.IsOpen ->
                return Result.Error "This room is closed!"
            | Some room ->
                let nameAlreadyExists =
                    room.HostName = playerName ||
                    room.Players |> List.exists (fun p -> p.Name = playerName)

                if nameAlreadyExists then
                    return Result.Error "This name is already exist in this room!"
                else
                    let alreadyExists = room.Players |> List.exists (fun p -> p.Token = playerToken)
                    let updatedPlayers =
                        if alreadyExists then room.Players
                        else { Token = playerToken; Name = playerName; Points = 0 } :: room.Players

                    let updatedRoom = { room with Players = updatedPlayers }
                    RoomsDB.updateRoom roomToken updatedRoom
                    return Ok ()
            | None ->
                return Result.Error "Room does not exist!"
        }

    [<Rpc>]
    let GetRoomUrl token =
        async {
            return "/room/" + token
        }

    [<Rpc>]
    let GetAllRooms () =
        async {
            return RoomsDB.getAllRooms ()
        }

    [<Rpc>]
    let GetPlayersInRoom (roomToken: string) =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room -> return room.Players
            | None -> return []
        }

    [<Rpc>]
    let GetAvailableGames () : Async<list<string>> =
        async {
            try
                let folders = System.IO.Directory.GetDirectories("Games")
                let games = folders |> Array.map System.IO.Path.GetFileName |> Array.toList
                return games
            with
            | ex ->
                return []
        }

    [<Rpc>]
    let GetRoomByToken (roomToken: string) : Async<Option<RoomInfo>> =
        async {
            return RoomsDB.getRoom roomToken
        }

    [<Rpc>]
    let GetIsOpen (roomToken: string) : Async<bool> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room -> return room.IsOpen
            | None -> return false
        }

    [<Rpc>]
    let RemovePlayerFromRoom (roomToken: string, playerToken: string) : Async<Result<unit, string>> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room ->
                let updatedPlayers = room.Players |> List.filter (fun p -> p.Token <> playerToken)
                let updatedRoom = { room with Players = updatedPlayers }
                RoomsDB.updateRoom roomToken updatedRoom
                return Ok ()
            | None ->
                return Error "Room does not exist!"
        }
    
    [<Rpc>]
    let RemoveRoom (roomToken: string) : Async<Result<unit, string>> =
        async {
            let removed = RoomsDB.removeRoom roomToken
            if removed then
                return Ok ()
            else
                return Error "Room does not exist!"
        }

    [<Rpc>]
    let SetRoomOpenState (roomToken: string, isOpen: bool) : Async<Result<unit, string>> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room ->
                let updatedRoom = { room with IsOpen = isOpen }
                RoomsDB.updateRoom roomToken updatedRoom
                return Ok ()
            | None ->
                return Error "Room does not exist!"
        }

    [<Rpc>]
    let SetCurrentGame (roomToken: string, gameName: string option) : Async<unit> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room ->
                let updated = { room with CurrentGame = gameName }
                RoomsDB.updateRoom roomToken updated
            | None -> ()
        }

    [<Rpc>]
    let GetCurrentGame (roomToken: string) : Async<string option> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room -> return room.CurrentGame
            | None -> return None
        }

    [<Rpc>]
    let GetGameState (roomToken: string) : Async<Option<Game21Logic.GameState>> =
        async {
            match GameStatesDB.getGameState roomToken with
            | Some (:? Game21Logic.GameState as gs) -> return Some gs
            | _ -> return None
        }

    [<Rpc>]
    let GetPlayerState (roomToken: string, playerToken: string) : Async<option<Game21Logic.PlayerState>> =
        async {
            match GameStatesDB.getPlayerStates roomToken with
            | Some states ->
                match Map.tryFind playerToken states with
                | Some (:? Game21Logic.PlayerState as state) -> return Some state
                | _ -> return None
            | None -> return None
        }

    [<Rpc>]
    let StartGame (roomToken: string) : Async<Result<unit, string>> =
        async {
            match RoomsDB.getRoom roomToken with
            | Some room ->
                match room.CurrentGame with
                | Some "Game21" ->
                    let deck = Game21Deck.createDecks 1 |> Game21Deck.shuffleDeck
                    let playerOrder = room.HostToken :: (room.Players |> List.map (fun p -> p.Token))
                    let playerInfos = ({ Name = room.HostName; Token = room.HostToken; Points = 0 } :: room.Players)
                    let remainingDeck = Game21Logic.prepareGame roomToken playerInfos deck
                    let initialState: Game21Logic.GameState = {
                        Deck = remainingDeck
                        RoundOver = false
                        CurrentPlayerToken = List.head playerOrder
                        PlayerOrder = playerOrder
                        PassedPlayers = Set.empty
                        Winner = Set.empty
                    }

                    let playerStates =
                        playerOrder
                        |> List.map (fun token ->
                            token,
                            ({ Token = token; Hand = []; Wins = 0 } : Game21Logic.PlayerState) :> obj
                        )
                        |> Map.ofList

                    FunGameZone.GameStatesDB.setGameState roomToken (initialState :> obj)
                    FunGameZone.GameStatesDB.setPlayerStates roomToken playerStates
                    return Ok ()

                | Some unknownGame ->
                    return Error $"Unknown game: {unknownGame}"

                | None ->
                    return Error "The game is not set up for this room!"
            | None ->
                return Error "Room does not exist!"
        }
