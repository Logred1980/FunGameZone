import Doc from "../WebSharper.UI/WebSharper.UI.Doc"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
import { View_T } from "../WebSharper.UI/WebSharper.UI.View`1"
import { FSharpOption } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1"
export function RoomPlayerPage(roomToken:string, playerToken:string):Doc
export function RoomHostPage(roomToken:string, hostToken:string):Doc
export function RoomTemplatePage(hostName:string, personalToken:string, roomName:string, roomToken:string, isHost:boolean, playerInfosView:View_T<FSharpList_T<{Token:string,Name:string,Points:number}>>, leftExtras:FSharpList_T<Doc>, rightExtras:FSharpOption<((a:string) => Doc)>):Doc
export function Main():Doc
