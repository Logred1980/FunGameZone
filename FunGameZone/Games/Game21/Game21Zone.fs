namespace FunGameZone

open WebSharper
open WebSharper.UI
open WebSharper.UI.Html
open Game21Logic
open Game21CardTypes

[<JavaScript>]
module Game21Zone =

    let renderCard (card: Card) =
        let rankToString = function
            | Two -> "2" | Three -> "3" | Four -> "4" | Five -> "5"
            | Six -> "6" | Seven -> "7" | Eight -> "8" | Nine -> "9" | Ten -> "10"
            | Jack -> "J" | Queen -> "Q" | King -> "K" | Ace -> "A"

        let suitToSymbol = function
            | Hearts -> "♥"
            | Diamonds -> "♦"
            | Clubs -> "♣"
            | Spades -> "♠"

        let value = rankToString card.Rank + suitToSymbol card.Suit
        span [attr.``class`` "me-1"] [text value]
    
    let showGameZone
        (roomToken: string)
        (myToken: string)
        (stateObj: obj)
        (playerStateOptObj: obj option)
        : Doc =

        let state = unbox<Game21Logic.GameState> stateObj
        let playerStateOpt = playerStateOptObj |> Option.map (fun o -> unbox<Game21Logic.PlayerState> o)
        let players = state.PlayerOrder |> List.indexed

        div [attr.``class`` "d-flex flex-wrap justify-content-start mt-3"] [
            for (i, token) in players do
                let isMe = (token = myToken)
                let bgColor = if isMe then "bg-light" else "bg-secondary"
                let cardDocs =
                    if isMe then
                        match playerStateOpt with
                        | Some ps -> ps.Hand |> List.map renderCard
                        | None -> [text "(n/a)"]
                    else
                        [ for _ in 1 .. 2 -> span [attr.``class`` "me-1"] [text "🂠"] ]
                yield
                    div [
                        attr.``class`` (bgColor + " text-dark rounded p-3 me-3 mb-3 position-relative")
                        attr.style "min-width: 300px; flex: 1; max-width: 48%;"
                    ] [
                        div [
                            attr.``class`` "position-absolute top-0 start-0 fw-bold text-white bg-dark px-2"
                            attr.style "border-bottom-right-radius: 0.5rem;"
                        ] [text $"{i + 1}."]

                        h5 [
                            attr.``class`` "fw-bold mb-2"
                            attr.style "margin-left: 15px"
                        ] [text (if isMe then "You" else token)]

                        div [] cardDocs

                        div [attr.``class`` "mt-2"] [
                            button [
                                attr.``class`` "btn btn-sm btn-primary me-2"
                            ] [text "Draw"]
                            button [
                                attr.``class`` "btn btn-sm btn-warning"
                            ] [text "Pass"]
                        ]
                    ]
        ]
        (*let showGameZone
        (roomToken: string)
        (myToken: string)
        (state: GameState)
        : Doc =

        let players = state.PlayerOrder |> List.indexed

        div [attr.``class`` "d-flex flex-wrap justify-content-start mt-3"] [
            for (i, token) in players do
                let isMe = (token = myToken)
                let bgColor = if isMe then "bg-light" else "bg-secondary"
                yield
                    div [
                        attr.``class`` (bgColor + " text-dark rounded p-3 me-3 mb-3 position-relative")
                        attr.style "min-width: 300px; flex: 1; max-width: 48%;"
                    ] [
                        div [
                            attr.``class`` "position-absolute top-0 start-0 fw-bold text-white bg-dark px-2"
                            attr.style "border-bottom-right-radius: 0.5rem;"
                        ] [text $"{i + 1}."]

                        h5 [
                            attr.``class`` "fw-bold mb-2"
                            attr.style "margin-left: 15px"
                        ] [text (if isMe then "You" else token)]

                        div [] [
                            text "Your cards will appear here..."
                        ]

                        div [attr.``class`` "mb-2"] [
                            button [
                                attr.``class`` "btn btn-sm btn-primary me-2"
                            ] [text "Draw"]
                            button [
                                attr.``class`` "btn btn-sm btn-warning"
                            ] [text "Pass"]
                        ]
                    ]
        ]*)