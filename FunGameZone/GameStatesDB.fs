namespace FunGameZone

open System.Collections.Concurrent

module GameStatesDB =
    let private gameStates = ConcurrentDictionary<string, obj>()
    let private playerStates = ConcurrentDictionary<string, Map<string, obj>>()

    let setGameState roomToken (state: obj) =
        gameStates.[roomToken] <- state

    let getGameState roomToken =
        match gameStates.TryGetValue roomToken with
        | true, state -> Some state
        | _ -> None

    let setPlayerStates roomToken (states: Map<string, obj>) =
        playerStates.[roomToken] <- states

    let getPlayerStates roomToken =
        match playerStates.TryGetValue roomToken with
        | true, s -> Some s
        | _ -> None
