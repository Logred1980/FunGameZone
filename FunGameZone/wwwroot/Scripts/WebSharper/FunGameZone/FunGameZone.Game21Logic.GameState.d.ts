import Suit from "./FunGameZone.Game21CardTypes.Suit"
import Rank from "./FunGameZone.Game21CardTypes.Rank"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
import FSharpSet from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpSet`1"
export function New(Deck, RoundOver, CurrentPlayerToken, PlayerOrder, PassedPlayers, Winner)
export default interface GameState {
  Deck:FSharpList_T<{Suit:Suit,Rank:Rank}>;
  RoundOver:boolean;
  CurrentPlayerToken:string;
  PlayerOrder:FSharpList_T<string>;
  PassedPlayers:FSharpSet<string>;
  Winner:FSharpSet<string>;
}
