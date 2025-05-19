import { FSharpResult } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpResult`2"
import FSharpAsync from "../WebSharper.StdLib/Microsoft.FSharp.Control.FSharpAsync`1"
import Suit from "./FunGameZone.Game21CardTypes.Suit"
import Rank from "./FunGameZone.Game21CardTypes.Rank"
import { FSharpList_T } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1"
import { FSharpOption } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1"
import FSharpSet from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpSet`1"
export function StartGame(roomToken:string):FSharpAsync<FSharpResult<void, string>>
export function GetPlayerState(roomToken:string, playerToken:string):FSharpAsync<FSharpOption<{Token:string,Hand:FSharpList_T<{Suit:Suit,Rank:Rank}>,Wins:number}>>
export function GetGameState(roomToken:string):FSharpAsync<FSharpOption<{Deck:FSharpList_T<{Suit:Suit,Rank:Rank}>,RoundOver:boolean,CurrentPlayerToken:string,PlayerOrder:FSharpList_T<string>,PassedPlayers:FSharpSet<string>,Winner:FSharpSet<string>}>>
export function GetCurrentGame(roomToken:string):FSharpAsync<FSharpOption<string>>
export function SetCurrentGame(roomToken:string, gameName:FSharpOption<string>):FSharpAsync<void>
export function SetRoomOpenState(roomToken:string, isOpen:boolean):FSharpAsync<FSharpResult<void, string>>
export function RemoveRoom(roomToken:string):FSharpAsync<FSharpResult<void, string>>
export function RemovePlayerFromRoom(roomToken:string, playerToken:string):FSharpAsync<FSharpResult<void, string>>
export function GetIsOpen(roomToken:string):FSharpAsync<boolean>
export function GetRoomByToken(roomToken:string):FSharpAsync<FSharpOption<{RoomToken:string,HostToken:string,HostName:string,RoomName:string,Players:FSharpList_T<{Token:string,Name:string,Points:number}>,CreatedDT:number,IsOpen:boolean,CurrentGame:FSharpOption<string>}>>
export function GetAvailableGames():FSharpAsync<FSharpList_T<string>>
export function GetPlayersInRoom(roomToken:string):FSharpAsync<FSharpList_T<{Token:string,Name:string,Points:number}>>
export function GetAllRooms():FSharpAsync<FSharpList_T<{RoomToken:string,HostToken:string,HostName:string,RoomName:string,Players:FSharpList_T<{Token:string,Name:string,Points:number}>,CreatedDT:number,IsOpen:boolean,CurrentGame:FSharpOption<string>}>>
export function GetRoomUrl(token:string):FSharpAsync<string>
export function AddPlayerToRoom(roomToken:string, playerName:string, playerToken:string):FSharpAsync<FSharpResult<void, string>>
export function RegisterRoom(hostName:string, hostToken:string, roomName:string, roomToken:string):FSharpAsync<FSharpResult<void, string>>
