import { FSharpOption } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1"
import Doc from "../WebSharper.UI/WebSharper.UI.Doc"
import Suit from "./FunGameZone.Game21CardTypes.Suit"
import Rank from "./FunGameZone.Game21CardTypes.Rank"
export function showGameZone(roomToken:string, myToken:string, stateObj, playerStateOptObj:FSharpOption<any>):Doc
export function renderCard(card:{Suit:Suit,Rank:Rank}):Doc
