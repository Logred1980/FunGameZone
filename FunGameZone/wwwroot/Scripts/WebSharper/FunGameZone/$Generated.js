import { DecodeUnion, Id, DecodeRecord, DecodeList, DecodeSet, EncodeUnion, DecodeDateTime } from "../WebSharper.Web/WebSharper.ClientSideJson.Provider.js"
import { LoadLocalTemplates, NamedTemplate } from "../WebSharper.UI/WebSharper.UI.Client.Templates.js"
import { Some } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1.js"
let Decoder_FSharpResult_2;
let Decoder_Suit;
let Decoder_Rank;
let Decoder_Card;
let Decoder_PlayerState;
let Decoder_FSharpOption_1;
let Decoder_GameState;
let Decoder_FSharpOption_2;
let Decoder_FSharpOption_3;
let Encoder_FSharpOption_1;
let Decoder_RoomInfo;
let Decoder_FSharpOption_4;
export function DecodeJson_FSharpResult_2(){
  return Decoder_FSharpResult_2?Decoder_FSharpResult_2:Decoder_FSharpResult_2=(DecodeUnion(void 0, "$", [[0, [["$0", "ResultValue", Id(), 0]]], [1, [["$0", "ErrorValue", Id(), 0]]]]))();
}
export function DecodeJson_FSharpOption_1(){
  return Decoder_FSharpOption_1?Decoder_FSharpOption_1:Decoder_FSharpOption_1=(DecodeUnion(void 0, "$", [null, [1, [["$0", "Value", DecodeJson_PlayerState, 0]]]]))();
}
export function DecodeJson_PlayerState(){
  return Decoder_PlayerState?Decoder_PlayerState:Decoder_PlayerState=(DecodeRecord(void 0, [["Token", Id(), 0], ["Hand", DecodeList(DecodeJson_Card), 0], ["Wins", Id(), 0]]))();
}
export function DecodeJson_Card(){
  return Decoder_Card?Decoder_Card:Decoder_Card=(DecodeRecord(void 0, [["Suit", DecodeJson_Suit, 0], ["Rank", DecodeJson_Rank, 0]]))();
}
export function DecodeJson_Suit(){
  return Decoder_Suit?Decoder_Suit:Decoder_Suit=(DecodeUnion(void 0, "$", [[0, []], [1, []], [2, []], [3, []]]))();
}
export function DecodeJson_Rank(){
  return Decoder_Rank?Decoder_Rank:Decoder_Rank=(DecodeUnion(void 0, "$", [[0, []], [1, []], [2, []], [3, []], [4, []], [5, []], [6, []], [7, []], [8, []], [9, []], [10, []], [11, []], [12, []]]))();
}
export function DecodeJson_FSharpOption_2(){
  return Decoder_FSharpOption_2?Decoder_FSharpOption_2:Decoder_FSharpOption_2=(DecodeUnion(void 0, "$", [null, [1, [["$0", "Value", DecodeJson_GameState, 0]]]]))();
}
export function DecodeJson_GameState(){
  return Decoder_GameState?Decoder_GameState:Decoder_GameState=(DecodeRecord(void 0, [["Deck", DecodeList(DecodeJson_Card), 0], ["RoundOver", Id(), 0], ["CurrentPlayerToken", Id(), 0], ["PlayerOrder", DecodeList(Id()), 0], ["PassedPlayers", DecodeSet(Id()), 0], ["Winner", DecodeSet(Id()), 0]]))();
}
export function DecodeJson_FSharpOption_3(){
  return Decoder_FSharpOption_3?Decoder_FSharpOption_3:Decoder_FSharpOption_3=(DecodeUnion(void 0, "$", [null, [1, [["$0", "Value", Id(), 0]]]]))();
}
export function EncodeJson_FSharpOption_1(){
  return Encoder_FSharpOption_1?Encoder_FSharpOption_1:Encoder_FSharpOption_1=(EncodeUnion(void 0, "$", [null, [1, [["$0", "Value", Id(), 0]]]]))();
}
export function DecodeJson_FSharpOption_4(){
  return Decoder_FSharpOption_4?Decoder_FSharpOption_4:Decoder_FSharpOption_4=(DecodeUnion(void 0, "$", [null, [1, [["$0", "Value", DecodeJson_RoomInfo, 0]]]]))();
}
export function DecodeJson_RoomInfo(){
  return Decoder_RoomInfo?Decoder_RoomInfo:Decoder_RoomInfo=(DecodeRecord(void 0, [["RoomToken", Id(), 0], ["HostToken", Id(), 0], ["HostName", Id(), 0], ["RoomName", Id(), 0], ["Players", DecodeList(Id()), 0], ["CreatedDT", DecodeDateTime(), 0], ["IsOpen", Id(), 0], ["CurrentGame", Id(), 1]]))();
}
export function mainform(h){
  LoadLocalTemplates("main");
  return h?NamedTemplate("main", Some("mainform"), h):void 0;
}
