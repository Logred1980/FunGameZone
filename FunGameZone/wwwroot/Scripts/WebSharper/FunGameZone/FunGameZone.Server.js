import { Bind, Return } from "../WebSharper.StdLib/WebSharper.Concurrency.js"
import AjaxRemotingProvider from "../WebSharper.StdLib/WebSharper.Remoting.AjaxRemotingProvider.js"
import { DecodeJson_FSharpResult_2, DecodeJson_FSharpOption_1, DecodeJson_FSharpOption_2, DecodeJson_FSharpOption_3, EncodeJson_FSharpOption_1, DecodeJson_FSharpOption_4, DecodeJson_RoomInfo } from "./$Generated.js"
import { DecodeList, Id } from "../WebSharper.Web/WebSharper.ClientSideJson.Provider.js"
export function StartGame(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/StartGame", [roomToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
export function GetPlayerState(roomToken, playerToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetPlayerState", [roomToken, playerToken]), (o) => Return((DecodeJson_FSharpOption_1())(o)));
}
export function GetGameState(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetGameState", [roomToken]), (o) => Return((DecodeJson_FSharpOption_2())(o)));
}
export function GetCurrentGame(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetCurrentGame", [roomToken]), (o) => Return((DecodeJson_FSharpOption_3())(o)));
}
export function SetCurrentGame(roomToken, gameName){
  return(new AjaxRemotingProvider()).Async("Server/SetCurrentGame", [roomToken, (EncodeJson_FSharpOption_1())(gameName)]);
}
export function SetRoomOpenState(roomToken, isOpen){
  return Bind((new AjaxRemotingProvider()).Async("Server/SetRoomOpenState", [roomToken, isOpen]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
export function RemoveRoom(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/RemoveRoom", [roomToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
export function RemovePlayerFromRoom(roomToken, playerToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/RemovePlayerFromRoom", [roomToken, playerToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
export function GetIsOpen(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetIsOpen", [roomToken]), (o) => Return(o));
}
export function GetRoomByToken(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetRoomByToken", [roomToken]), (o) => Return((DecodeJson_FSharpOption_4())(o)));
}
export function GetAvailableGames(){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetAvailableGames", []), (o) => Return(((DecodeList(Id()))())(o)));
}
export function GetPlayersInRoom(roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetPlayersInRoom", [roomToken]), (o) => Return(((DecodeList(Id()))())(o)));
}
export function GetAllRooms(){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetAllRooms", []), (o) => Return(((DecodeList(DecodeJson_RoomInfo))())(o)));
}
export function GetRoomUrl(token){
  return Bind((new AjaxRemotingProvider()).Async("Server/GetRoomUrl", [token]), (o) => Return(o));
}
export function AddPlayerToRoom(roomToken, playerName, playerToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/AddPlayerToRoom", [roomToken, playerName, playerToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
export function RegisterRoom(hostName, hostToken, roomName, roomToken){
  return Bind((new AjaxRemotingProvider()).Async("Server/RegisterRoom", [hostName, hostToken, roomName, roomToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
