import Var from "../WebSharper.UI/WebSharper.UI.Var.js"
import FSharpList from "../WebSharper.StdLib/Microsoft.FSharp.Collections.FSharpList`1.js"
import { Delay, Bind, Combine, Zero, Sleep, StartImmediate, Return } from "../WebSharper.StdLib/WebSharper.Concurrency.js"
import { GetPlayersInRoom, GetRoomByToken, RemovePlayerFromRoom, RemoveRoom, SetRoomOpenState, GetPlayerState, GetCurrentGame, GetGameState, SetCurrentGame, StartGame, AddPlayerToRoom, GetAllRooms, RegisterRoom } from "./FunGameZone.Server.js"
import { length, ofArray, filter, ofSeq, map } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
import Doc from "../WebSharper.UI/WebSharper.UI.Doc.js"
import { Map } from "../WebSharper.UI/WebSharper.UI.View.js"
import { tryFind, delay, append, collect } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.SeqModule.js"
import { Some } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1.js"
import Attr from "../WebSharper.UI/WebSharper.UI.Attr.js"
import { Handler } from "../WebSharper.UI/WebSharper.UI.Client.Attr.js"
import { showGameZone } from "./FunGameZone.Game21Zone.js"
import { Equals } from "../WebSharper.StdLib/Microsoft.FSharp.Core.Operators.Unchecked.js"
import { Trim } from "../WebSharper.StdLib/Microsoft.FSharp.Core.StringModule.js"
import { generateToken } from "./FunGameZone.CommonMethods.js"
import { DateFormatter } from "../WebSharper.StdLib/WebSharper.JavaScript.Pervasives.DateTime.js"
import ProviderBuilder from "../WebSharper.UI.Templating.Runtime/WebSharper.UI.Templating.Runtime.Server.ProviderBuilder.js"
import Elt from "../WebSharper.UI/WebSharper.UI.TemplateHoleModule.Elt.js"
import { CompleteHoles } from "../WebSharper.UI.Templating.Runtime/WebSharper.UI.Templating.Runtime.Server.Handler.js"
import TemplateInstance from "../WebSharper.UI.Templating.Runtime/WebSharper.UI.Templating.Runtime.Server.TemplateInstance.js"
import { mainform } from "./$Generated.js"
export function RoomPlayerPage(roomToken, playerToken){
  const playersVar=Var.Create_1(FSharpList.Empty);
  const roomInfoVar=Var.Create_1(null);
  const lastPlayerCount=[0];
  function loop(){
    const _3=null;
    return Delay(() => Bind(GetPlayersInRoom(roomToken), (a) => {
      const currentCount=length(a);
      return Combine(currentCount!==lastPlayerCount[0]?(playersVar.Set(a),lastPlayerCount[0]=currentCount,Zero()):Zero(), Delay(() => Bind(Sleep(1000), () => loop())));
    }));
  }
  const _1=null;
  StartImmediate(Delay(() => Bind(GetPlayersInRoom(roomToken), (a) => {
    playersVar.Set(a);
    lastPlayerCount[0]=length(a);
    return Zero();
  })), null);
  StartImmediate(loop(), null);
  const _2=null;
  StartImmediate(Delay(() => Bind(GetRoomByToken(roomToken), (a) => {
    roomInfoVar.Set(a);
    return Zero();
  })), null);
  return Doc.EmbedView(Map((roomOpt) => {
    if(roomOpt==null)return Doc.Element("div", [], [Doc.TextNode("Room does not exist!")]);
    else {
      const room=roomOpt.$0;
      const o=tryFind((p) => p.Token==playerToken, playersVar.Get());
      const o_1=o==null?null:Some(o.$0.Name);
      const ownName=o_1==null?"Unknown":o_1.$0;
      return RoomTemplatePage(room.HostName, playerToken, room.RoomName, roomToken, false, playersVar.View, ofArray([Doc.Element("p", [], [Doc.TextNode("Your name: "+ownName)]), Doc.Element("button", [Attr.Create("class", "btn btn-danger btn-sm mt-2"), Handler("click", () =>() => {
        const _3=null;
        return StartImmediate(Delay(() => Bind(RemovePlayerFromRoom(roomToken, playerToken), (a) => a.$==1?(alert(a.$0),Zero()):(globalThis.close(),Zero()))), null);
      })], [Doc.TextNode("Exit")])]), null);
    }
  }, roomInfoVar.View));
}
export function RoomHostPage(roomToken, hostToken){
  const playersVar=Var.Create_1(FSharpList.Empty);
  const roomInfoVar=Var.Create_1(null);
  const lastPlayerCount=[0];
  function loop(){
    const _3=null;
    return Delay(() => Bind(GetPlayersInRoom(roomToken), (a) => {
      const currentCount=length(a);
      return Combine(currentCount!==lastPlayerCount[0]?(playersVar.Set(a),lastPlayerCount[0]=currentCount,Zero()):Zero(), Delay(() => Bind(Sleep(1000), () => loop())));
    }));
  }
  const _1=null;
  StartImmediate(Delay(() => Bind(GetPlayersInRoom(roomToken), (a) => {
    playersVar.Set(a);
    lastPlayerCount[0]=length(a);
    return Zero();
  })), null);
  StartImmediate(loop(), null);
  const _2=null;
  StartImmediate(Delay(() => Bind(GetRoomByToken(roomToken), (a) => {
    roomInfoVar.Set(a);
    return Zero();
  })), null);
  return Doc.EmbedView(Map((roomOpt) => {
    if(roomOpt==null)return Doc.Element("div", [], [Doc.TextNode("Room does not exist!")]);
    else {
      const room=roomOpt.$0;
      return RoomTemplatePage(room.HostName, hostToken, room.RoomName, roomToken, true, playersVar.View, ofArray([Doc.Element("button", [Attr.Create("class", "btn btn-danger btn-sm mt-2 me-2"), Handler("click", () =>() => {
        const _3=null;
        return StartImmediate(Delay(() => Bind(RemoveRoom(roomToken), (a) => a.$==1?(alert(a.$0),Zero()):(globalThis.close(),Zero()))), null);
      })], [Doc.TextNode("Del Room")]), Doc.Element("button", [Attr.Create("class", "btn btn-primary btn-sm mt-2 me-2"), Handler("click", () =>() => {
        const _3=null;
        return StartImmediate(Delay(() => Bind(SetRoomOpenState(roomToken, !room.IsOpen), (a) => a.$==1?(alert(a.$0),Zero()):Bind(GetRoomByToken(roomToken), (a_1) => {
          roomInfoVar.Set(a_1);
          return Zero();
        }))), null);
      })], [Doc.TextNode(room.IsOpen?"Close Room":"Open Room")])]), Some(() => Doc.Empty));
    }
  }, roomInfoVar.View));
}
export function RoomTemplatePage(hostName, personalToken, roomName, roomToken, isHost, playerInfosView, leftExtras, rightExtras){
  const currentGameVar=Var.Create_1(null);
  const playerStateVar=Var.Create_1(null);
  const _1=null;
  StartImmediate(Delay(() => Bind(GetPlayerState(roomToken, personalToken), (a) => {
    playerStateVar.Set(a);
    return Zero();
  })), null);
  const availableGames=ofArray([["Game21", (roomToken_1) =>(ownToken) =>(stateObj) =>(playerStateObjOpt) => showGameZone(roomToken_1, ownToken, stateObj, playerStateObjOpt)]]);
  const refreshCurrentGame=() => {
    const _3=null;
    return Delay(() => Bind(GetCurrentGame(roomToken), (a) => {
      currentGameVar.Set(a);
      return Zero();
    }));
  };
  StartImmediate(refreshCurrentGame(), null);
  function refreshGameLoop(){
    const _3=null;
    return Delay(() => Bind(GetCurrentGame(roomToken), (a) => Combine(!Equals(a, currentGameVar.Get())?(currentGameVar.Set(a),Zero()):Zero(), Delay(() => Bind(Sleep(1000), () => refreshGameLoop())))));
  }
  StartImmediate(refreshGameLoop(), null);
  const playerList=Map((players) => {
    const hostPlayer=tryFind((p) => p.Token==personalToken, players);
    const ordered=hostPlayer==null?filter((p) => p.Token!=personalToken, players):FSharpList.Cons(hostPlayer.$0, filter((p) => p.Token!=personalToken, players));
    return Doc.Element("div", [Attr.Create("class", "bg-secondary text-white rounded p-3 ms-3"), Attr.Create("style", "width: 20%")], ofSeq(delay(() => append([Doc.Element("h5", [Attr.Create("class", "mb-3")], [Doc.TextNode("Players")])], delay(() => map((player) => Doc.Element("div", [Attr.Create("class", "d-flex justify-content-between align-items-center mb-2")], ofSeq(delay(() => append([Doc.Element("span", [], [Doc.TextNode(player.Name)])], delay(() => {
      let _3;
      return rightExtras!=null&&rightExtras.$==1&&(isHost&&player.Token!=personalToken&&(_3=rightExtras.$0,true))?[Doc.Element("button", [Attr.Create("class", "btn btn-danger btn-sm mt-2"), Attr.Create("style", "margin-left: 5px"), Handler("click", () =>() => {
        const _4=null;
        return StartImmediate(Delay(() => Bind(RemovePlayerFromRoom(roomToken, player.Token), (a) => a.$==1?(alert(a.$0),Zero()):Zero())), null);
      })], [Doc.TextNode("X")])]:[Doc.Empty];
    }))))), ordered))))));
  }, playerInfosView);
  let _2=Doc.Element("div", [Attr.Create("class", "d-flex flex-wrap justify-content-between mt-3")], [Doc.Element("div", [Attr.Create("class", "bg-secondary text-white rounded p-3 me-3"), Attr.Create("style", "width: 20%")], ofSeq(delay(() => append([Doc.Element("h5", [], [Doc.TextNode(isHost?"Host datas":"Players datas")])], delay(() => append([Doc.Element("p", [], [Doc.TextNode("Room name: "+roomName)])], delay(() => append([Doc.Element("p", [], [Doc.TextNode("Host name: "+hostName)])], delay(() => leftExtras))))))))), Doc.Element("div", [Attr.Create("class", "col-md-6")], [Doc.Element("div", [Attr.Create("class", "bg-secondary text-white rounded p-3 mb-3 w-100")], [Doc.Element("h5", [], [Doc.TextNode("Game Zone")])]), Doc.EmbedView(Map((a) => {
    if(a!=null&&a.$==1){
      const gameName=a.$0;
      const _3=null;
      return Doc.Async(Delay(() => Bind(GetGameState(roomToken), (a_1) => {
        let _4;
        if(a_1==null)_4=Doc.TextNode("The Game state does not exist!");
        else {
          const m=tryFind((t) => t[0]==gameName, availableGames);
          if(m==null)_4=Doc.TextNode("This game is wrong...");
          else {
            let _5=((m.$0[1](roomToken))(personalToken))(a_1.$0);
            const o=playerStateVar.Get();
            _4=_5(o==null?null:Some(o.$0));
          }
        }
        return Return(_4);
      })));
    }
    else return Doc.Element("div", [Attr.Create("class", "border border-info rounded p-3 w-100")], [Doc.Element("ul", [Attr.Create("class", "mb-0 list-unstyled")], ofSeq(delay(() => collect((m) => {
      const gameName_1=m[0];
      return[Doc.Element("li", [Attr.Create("class", "d-flex justify-content-between align-items-center mb-2 w-100")], ofSeq(delay(() => append([Doc.Element("div", [], [Doc.TextNode(gameName_1)])], delay(() => isHost?[Doc.Element("button", [Attr.Create("class", "btn btn-primary btn-sm"), Handler("click", () =>() => {
        const _4=null;
        return StartImmediate(Delay(() => Bind(SetCurrentGame(roomToken, Some(gameName_1)), () => Bind(refreshCurrentGame(), () => Bind(StartGame(roomToken), () => Return(null))))), null);
      })], [Doc.TextNode("Start")])]:[])))))];
    }, availableGames))))]);
  }, currentGameVar.View))]), Doc.EmbedView(playerList)]);
  return _2;
}
export function Main(){
  const container=Var.Create_1(Doc.Empty);
  const hostNameVar=Var.Create_1("");
  const roomNameVar=Var.Create_1("");
  const lastRoomCount=[0];
  const lastRoomState=[FSharpList.Empty];
  const renderRoom=(roomName, roomToken, hostName, created, isOpen) => {
    const playerNameVar=Var.Create_1("");
    return Doc.Element("div", [Attr.Create("class", "d-flex flex-wrap align-items-center mb-2")], [Doc.Element("button", ofSeq(delay(() => append([Attr.Create("class", "btn btn-outline-light btn-sm me-2")], delay(() => append(!isOpen?[Attr.Create("disabled", "")]:[], delay(() =>[Handler("click", () =>() => {
      const _4=null;
      return StartImmediate(Delay(() => {
        const playerName=Trim(playerNameVar.Get());
        if(playerName!=""){
          const playerToken=generateToken();
          return Bind(AddPlayerToRoom(roomToken, playerName, playerToken), (a) => a.$==1?(alert(a.$0),Zero()):(globalThis.open("/room/"+roomToken+"/player/"+playerToken, "_blank"),Zero()));
        }
        else {
          alert("Enter your player name!");
          return Zero();
        }
      }), null);
    })])))))), [Doc.TextNode("Join the room")]), Doc.Element("label", [Attr.Create("class", "me-2 ms-3")], [Doc.TextNode("Player Name:")]), Doc.Input([Attr.Create("class", "form-control form-control-sm"), Attr.Create("style", "width: 150px")], playerNameVar), Doc.Element("div", [Attr.Create("class", "text-light ms-3 me-2 fw-bold")], [Doc.TextNode("Room name:")]), Doc.Element("div", [Attr.Create("class", "text-light ms-2 me-4")], [Doc.TextNode(roomName)]), Doc.Element("div", [Attr.Create("class", "text-light ms-3 me-2 fw-bold")], [Doc.TextNode("Host name:")]), Doc.Element("div", [Attr.Create("class", "text-light ms-2 me-4")], [Doc.TextNode(hostName)]), Doc.Element("div", [Attr.Create("class", "text-light ms-3 me-2 fw-bold")], [Doc.TextNode("Create date:")]), Doc.Element("div", [Attr.Create("class", "text-muted small")], [Doc.TextNode(created)])]);
  };
  function refreshRoomsLoop(){
    const _4=null;
    return Delay(() => Bind(GetAllRooms(), (a) => {
      const currentState=map((r) =>[r.RoomToken, r.IsOpen], a);
      return Combine(length(a)!==length(lastRoomState[0])||!Equals(currentState, lastRoomState[0])?(container.Set(Doc.Concat(map((r) => renderRoom(r.RoomName, r.RoomToken, r.HostName, DateFormatter(r.CreatedDT, "yyyy-MM-dd HH:mm:ss"), r.IsOpen), a))),lastRoomState[0]=currentState,Zero()):Zero(), Delay(() => Bind(Sleep(2000), () => refreshRoomsLoop())));
    }));
  }
  StartImmediate(refreshRoomsLoop(), null);
  function loop(){
    const _4=null;
    return Delay(() => Bind(GetAllRooms(), (a) => {
      const currentCount=length(a);
      return Combine(currentCount!==lastRoomCount[0]?(container.Set(Doc.Concat(map((r) => renderRoom(r.RoomName, r.RoomToken, r.HostName, DateFormatter(r.CreatedDT, "yyyy-MM-dd HH:mm:ss"), r.IsOpen), a))),lastRoomCount[0]=currentCount,Zero()):Zero(), Delay(() => Bind(Sleep(2000), () => loop())));
    }));
  }
  StartImmediate(loop(), null);
  const B=Doc.Element("div", [], [Doc.Element("div", [Attr.Create("class", "border border-success rounded p-3 mb-4")], [Doc.Element("div", [Attr.Create("class", "d-flex flex-wrap align-items-center")], [Doc.Element("button", [Attr.Create("class", "btn btn-success me-3"), Handler("click", () =>() => {
    const _4=null;
    return StartImmediate(Delay(() => {
      const hostName=Trim(hostNameVar.Get());
      const roomName=Trim(roomNameVar.Get());
      if(hostName!=""&&roomName!=""){
        const roomToken=generateToken();
        const hostToken=generateToken();
        return Bind(RegisterRoom(hostName, hostToken, roomName, roomToken), (a) => a.$==1?(alert(a.$0),Zero()):(globalThis.open("/room/"+roomToken+"/host/"+hostToken, "_blank"),Zero()));
      }
      else {
        alert("You did not enter the Host or Room name!");
        return Zero();
      }
    }), null);
  })], [Doc.TextNode("Create Room")]), Doc.Element("label", [Attr.Create("class", "me-2")], [Doc.TextNode("Host Name:")]), Doc.Input([Attr.Create("class", "form-control form-control-sm me-4"), Attr.Create("style", "width: 150px")], hostNameVar), Doc.Element("label", [Attr.Create("class", "me-2")], [Doc.TextNode("Room Name:")]), Doc.Input([Attr.Create("class", "form-control form-control-sm"), Attr.Create("style", "width: 150px")], roomNameVar)])]), Doc.Element("div", [Attr.Create("class", "border border-secondary rounded p-3")], [Doc.EmbedView(container.View)])]);
  const this_1=new ProviderBuilder("New_1");
  const b=(this_1.h.push(new Elt("body", B)),this_1);
  const p=CompleteHoles(b.k, b.h, []);
  const i=new TemplateInstance(p[1], mainform(p[0]));
  let _1=(b.i=i,i);
  let _2=_1.Doc;
  let _3=_2;
  return _3;
}
