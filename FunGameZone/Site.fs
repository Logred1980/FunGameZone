namespace FunGameZone

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Server

type EndPoint =
    | [<EndPoint "/">] Zone
    | [<EndPoint "/about">] About
    | [<EndPoint "/contact">] Contact
    | [<EndPoint "/room/">] Room
    | [<EndPoint "/room/">] PersonalRoom of roomToken:string * strHost:string * hostToken:string

module Templating =
    open WebSharper.UI.Html

    let MenuBar (ctx: Context<EndPoint>) (current: EndPoint) : Doc list =
        let menuItem txt act =
            let isActive =
                match current, act with
                | EndPoint.Zone, EndPoint.Zone
                | EndPoint.About, EndPoint.About
                | EndPoint.Contact, EndPoint.Contact -> true
                | _ -> false

            let cls = if isActive then "nav-link active" else "nav-link"

            li [attr.``class`` "nav-item"] [
                a [
                    attr.``class`` cls
                    attr.href (ctx.Link act)
                ] [text txt]
            ]
        [
            menuItem "Zone" EndPoint.Zone
            menuItem "About" EndPoint.About
            menuItem "Contact" EndPoint.Contact
        ]

    let Main ctx action (title: string) (body: Doc list) =
        Templates.MainTemplate()
            .Title(title)
            .MenuBar(MenuBar ctx action)
            .Body(body)
            .Doc()

module Site =
    open WebSharper.UI.Html

    open type WebSharper.UI.ClientServer

    let ZonePage ctx =
        Content.Page(
            Templating.Main ctx EndPoint.Zone "Zone" [
                div [] [client (Client.Main())]
            ],
            Bundle = "zone"
        )

    let AboutPage ctx =
        Content.Page(
            Templating.Main ctx EndPoint.About "About" [
                h1 [] [text "About"]
                p [] [text "This is a template WebSharper client-server application."]
            ], 
            Bundle = "about"
        )

    let ContactPage ctx =
        Content.Page(
            Templating.Main ctx EndPoint.Contact "Contact" [
                h1 [] [text "Contact"]
                p [] [text "This is a template WebSharper client-server application."]
            ], 
            Bundle = "contact"
        )

    let RoomPage ctx =
       Content.Page(
            Templating.Main ctx EndPoint.Zone "Room" [
                h1 [] [text "Room page"]
            ],
            Bundle = "zone"
        )

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Zone -> ZonePage ctx
            | EndPoint.About -> AboutPage ctx
            | EndPoint.Contact -> ContactPage ctx
            | EndPoint.Room -> RoomPage ctx
            | EndPoint.PersonalRoom (roomToken, postName, personalToken) ->
                match postName with
                | "host" ->
                    Content.Page(
                        Templating.Main ctx EndPoint.Zone "Host Room" [
                            div [] [client <@ Client.RoomHostPage roomToken personalToken @>]
                        ]
                    )
                | "player" ->
                    Content.Page(
                        Templating.Main ctx EndPoint.Zone "Player Room" [
                            div [] [client <@ Client.RoomPlayerPage roomToken personalToken @>]
                        ]
                    )
                | _ ->
                    Content.Page(
                        Templating.Main ctx EndPoint.Zone "Error" [
                            h1 [] [text "Unknown error!"]
                            p [] [text ("Check the connection!")]
                        ]
                    )
                )