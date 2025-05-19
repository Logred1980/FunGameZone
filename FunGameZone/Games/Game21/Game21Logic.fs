namespace FunGameZone

open WebSharper
open Game21CardTypes
open Game21Deck
open RoomTypes
open GameStatesDB

module Game21Logic =

    type GameState =
        {
            Deck: Card list
            RoundOver: bool
            CurrentPlayerToken: string
            PlayerOrder: string list
            PassedPlayers: Set<string>
            Winner: Set<string>
        }

    type PlayerState =
        {
            Token: string
            Hand: Card list
            Wins: int
        }

    let shufflePlayerOrder (tokens: string list) : string list =
        let rand = System.Random()
        tokens |> List.sortBy (fun _ -> rand.Next())

    let prepareGame (roomToken: string) (players: list<PlayerInfo>) (deck: Card list) : Card list =
        let rec dealCards deck tokens acc =
            match tokens with
            | [] -> deck, acc
            | token::rest ->
                let (c1, d1) = drawCard deck
                let (c2, d2) = drawCard d1
                let cards = [c1; c2] |> List.choose id
                let playerState: PlayerState = { Token = token; Hand = cards; Wins = 0 }
                dealCards d2 rest ((token, playerState :> obj) :: acc)

        let tokens = players |> List.map (fun p -> p.Token)
        let remainingDeck, playerStates = dealCards deck tokens []

        setPlayerStates roomToken (Map.ofList playerStates)
        remainingDeck