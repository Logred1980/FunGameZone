import Suit from "./FunGameZone.Game21CardTypes.Suit"
import Rank from "./FunGameZone.Game21CardTypes.Rank"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
export function New(Token, Hand, Wins)
export default interface PlayerState {
  Token:string;
  Hand:FSharpList_T<{Suit:Suit,Rank:Rank}>;
  Wins:number;
}
