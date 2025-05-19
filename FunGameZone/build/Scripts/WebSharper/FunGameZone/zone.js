export { default as Runtime } from "../WebSharper.Core.JavaScript/Runtime.js"
import { Lazy, Create as Create_1, MarkResizable, SetOptional, GetOptional, CreateFuncWithArgs, DeleteEmptyFields } from "../WebSharper.Core.JavaScript/Runtime.js"
function isIDisposable(x){
  return"Dispose"in x;
}
class Object_1 {
  Equals(obj){
    return this===obj;
  }
  GetHashCode(){
    return -1;
  }
}
class Control extends Object_1 { }
export function Main(){
  const container=_c.Create_1(Doc.Empty);
  const hostNameVar=_c.Create_1("");
  const roomNameVar=_c.Create_1("");
  const lastRoomCount=[0];
  const lastRoomState=[FSharpList.Empty];
  const renderRoom=(roomName, roomToken, hostName, created, isOpen) => {
    const playerNameVar=_c.Create_1("");
    return Doc.Element("div", [Attr.Create("class", "d-flex flex-wrap align-items-center mb-2")], [Doc.Element("button", ofSeq(delay(() => append([Attr.Create("class", "btn btn-outline-light btn-sm me-2")], delay(() => append(!isOpen?[Attr.Create("disabled", "")]:[], delay(() =>[Handler("click", () =>() => {
      const _4=null;
      return StartImmediate(Delay(() => {
        const playerName=Trim(playerNameVar.Get());
        if(playerName!=""){
          const playerToken=generateToken();
          return Bind_1(AddPlayerToRoom(roomToken, playerName, playerToken), (a) => a.$==1?(alert(a.$0),Zero()):(globalThis.open("/room/"+roomToken+"/player/"+playerToken, "_blank"),Zero()));
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
    return Delay(() => Bind_1(GetAllRooms(), (a) => {
      const currentState=map((r) =>[r.RoomToken, r.IsOpen], a);
      return Combine(length(a)!==length(lastRoomState[0])||!Equals(currentState, lastRoomState[0])?(container.Set(Doc.Concat(map((r) => renderRoom(r.RoomName, r.RoomToken, r.HostName, DateFormatter(r.CreatedDT, "yyyy-MM-dd HH:mm:ss"), r.IsOpen), a))),lastRoomState[0]=currentState,Zero()):Zero(), Delay(() => Bind_1(Sleep(2000), () => refreshRoomsLoop())));
    }));
  }
  StartImmediate(refreshRoomsLoop(), null);
  function loop(){
    const _4=null;
    return Delay(() => Bind_1(GetAllRooms(), (a) => {
      const currentCount=length(a);
      return Combine(currentCount!==lastRoomCount[0]?(container.Set(Doc.Concat(map((r) => renderRoom(r.RoomName, r.RoomToken, r.HostName, DateFormatter(r.CreatedDT, "yyyy-MM-dd HH:mm:ss"), r.IsOpen), a))),lastRoomCount[0]=currentCount,Zero()):Zero(), Delay(() => Bind_1(Sleep(2000), () => loop())));
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
        return Bind_1(RegisterRoom(hostName, hostToken, roomName, roomToken), (a) => a.$==1?(alert(a.$0),Zero()):(globalThis.open("/room/"+roomToken+"/host/"+hostToken, "_blank"),Zero()));
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
let _c=Lazy((_i) => class Var_1 extends Object_1 {
  static {
    _c=_i(this);
  }
  static Create_1(v){
    return new ConcreteVar(false, {s:Ready(v, [])}, v);
  }
  static { }
});
class Doc extends Object_1 {
  docNode;
  updates;
  static get Empty(){
    return Doc.Mk(null, Const());
  }
  static Concat(xs){
    return TreeReduce(Doc.Empty, Doc.Append, ofSeqNonCopying(xs));
  }
  static Mk(node, updates){
    return new Doc(node, updates);
  }
  static TextNode(v){
    return Doc.Mk(TextNodeDoc(globalThis.document.createTextNode(v)), Const());
  }
  static Input(attr_1, var_1){
    return Doc.InputInternal("input", () => append(attr_1, [Value(var_1)]));
  }
  static Append(a, b){
    return Doc.Mk(AppendDoc(a.docNode, b.docNode), Map2Unit_1(a.updates, b.updates));
  }
  static EmbedView(view){
    const node=CreateEmbedNode();
    return Doc.Mk(EmbedDoc(node), Map_1(() => { }, Bind((doc) => {
      UpdateEmbedNode(node, doc.docNode);
      return doc.updates;
    }, view)));
  }
  static Element(name, attr_1, children){
    const a=Attr.Concat(attr_1);
    const c=Doc.Concat(children);
    return Elt_1.New(globalThis.document.createElement(name), a, c);
  }
  static InputInternal(elemTy, attr_1){
    const el=globalThis.document.createElement(elemTy);
    return Elt_1.New(el, Attr.Concat(attr_1(el)), Doc.Empty);
  }
  static RunBefore(rdelim, doc){
    const ldelim=globalThis.document.createTextNode("");
    rdelim.parentNode.insertBefore(ldelim, rdelim);
    Doc.RunBetween(ldelim, rdelim, doc);
  }
  static RunBetween(ldelim, rdelim, doc){
    LinkPrevElement(rdelim, doc.docNode);
    const st=CreateDelimitedRunState(ldelim, rdelim, doc.docNode);
    Sink(get_UseAnimations()||BatchUpdatesEnabled()?StartProcessor(PerformAnimatedUpdate(false, st, doc.docNode)):() => {
      PerformSyncUpdate(false, st, doc.docNode);
    }, doc.updates);
  }
  static TextView(txt){
    const node=CreateTextNode();
    return Doc.Mk(TextDoc(node), Map_1((t) => {
      UpdateTextNode(node, t);
    }, txt));
  }
  ReplaceInDom(elt){
    const rdelim=globalThis.document.createTextNode("");
    elt.parentNode.replaceChild(rdelim, elt);
    Doc.RunBefore(rdelim, this);
  }
  constructor(docNode, updates){
    super();
    this.docNode=docNode;
    this.updates=updates;
  }
}
function FailWith(msg){
  throw new Error(msg);
}
function toInt(x){
  const u=toUInt(x);
  return u>2147483647?u-4294967296:u;
}
function toUInt(x){
  return(x<0?Math.ceil(x):Math.floor(x))>>>0;
}
function KeyValue(kvp){
  return[kvp.K, kvp.V];
}
function range(min, max_1){
  const count=1+max_1-min;
  return count<=0?[]:init_1(count, (x) => x+min);
}
function length(l){
  let r=l;
  let i=0;
  while(r.$==1)
    {
      r=tail(r);
      i=i+1;
    }
  return i;
}
function map(f, x){
  let r;
  let l;
  let go;
  if(x.$==0)return x;
  else {
    const res=Create_1(FSharpList, {$:1});
    r=res;
    l=x;
    go=true;
    while(go)
      {
        r.$0=f(l.$0);
        l=l.$1;
        if(l.$==0)go=false;
        else {
          const t=Create_1(FSharpList, {$:1});
          r=(r.$1=t,t);
        }
      }
    r.$1=FSharpList.Empty;
    return res;
  }
}
function ofSeq(s){
  if(s instanceof FSharpList)return s;
  else if(s instanceof Array)return ofArray(s);
  else {
    const e=Get(s);
    try {
      let r;
      let go=e.MoveNext();
      if(!go)return FSharpList.Empty;
      else {
        const res=Create_1(FSharpList, {$:1});
        r=res;
        while(go)
          {
            r.$0=e.Current;
            if(e.MoveNext()){
              const t=Create_1(FSharpList, {$:1});
              r=(r.$1=t,t);
            }
            else go=false;
          }
        r.$1=FSharpList.Empty;
        return res;
      }
    }
    finally {
      if(typeof e=="object"&&isIDisposable(e))e.Dispose();
    }
  }
}
function ofArray(arr){
  let r=FSharpList.Empty;
  for(let i=length_1(arr)-1, _1=0;i>=_1;i--)r=FSharpList.Cons(get(arr, i), r);
  return r;
}
function init(s, f){
  return ofArray(init_2(s, f));
}
function tail(l){
  return l.$==1?l.$1:listEmpty();
}
function listEmpty(){
  return FailWith("The input list was empty.");
}
function head(l){
  return l.$==1?l.$0:listEmpty();
}
class attr extends Object_1 { }
function delay(f){
  return{GetEnumerator:() => Get(f())};
}
function append(s1, s2){
  return{GetEnumerator:() => {
    const e1=Get(s1);
    const first=[true];
    return new T(e1, null, (x) => {
      if(x.s.MoveNext()){
        x.c=x.s.Current;
        return true;
      }
      else {
        const x_1=x.s;
        if(!Equals(x_1, null))x_1.Dispose();
        x.s=null;
        return first[0]&&(first[0]=false,x.s=Get(s2),x.s.MoveNext()?(x.c=x.s.Current,true):(x.s.Dispose(),x.s=null,false));
      }
    }, (x) => {
      const x_1=x.s;
      if(!Equals(x_1, null))x_1.Dispose();
    });
  }};
}
function head_1(s){
  const e=Get(s);
  try {
    return e.MoveNext()?e.Current:insufficient();
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
}
function collect(f, s){
  return concat(map_1(f, s));
}
function map_1(f, s){
  return{GetEnumerator:() => {
    const en=Get(s);
    return new T(null, null, (e) => en.MoveNext()&&(e.c=f(en.Current),true), () => {
      en.Dispose();
    });
  }};
}
function nth(index, s){
  if(index<0)FailWith("negative index requested");
  let pos=-1;
  const e=Get(s);
  try {
    while(pos<index)
      {
        !e.MoveNext()?insufficient():void 0;
        pos=pos+1;
      }
    return e.Current;
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
}
function concat(ss){
  return{GetEnumerator:() => {
    const outerE=Get(ss);
    function next(st){
      while(true)
        {
          const m=st.s;
          if(Equals(m, null)){
            if(outerE.MoveNext()){
              st.s=Get(outerE.Current);
              st=st;
            }
            else {
              outerE.Dispose();
              return false;
            }
          }
          else if(m.MoveNext()){
            st.c=m.Current;
            return true;
          }
          else {
            st.Dispose();
            st.s=null;
            st=st;
          }
        }
    }
    return new T(null, null, next, (st) => {
      const x=st.s;
      if(!Equals(x, null))x.Dispose();
      if(!Equals(outerE, null))outerE.Dispose();
    });
  }};
}
function init_1(n, f){
  return take(n, initInfinite(f));
}
function fold(f, x, s){
  let r=x;
  const e=Get(s);
  try {
    while(e.MoveNext())
      r=f(r, e.Current);
    return r;
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
}
function iter(p, s){
  const e=Get(s);
  try {
    while(e.MoveNext())
      p(e.Current);
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
}
function distinctBy(f, s){
  return{GetEnumerator:() => {
    const o=Get(s);
    const seen=new HashSet("New_3");
    return new T(null, null, (e) => {
      let cur;
      let has;
      if(o.MoveNext()){
        cur=o.Current;
        has=seen.SAdd(f(cur));
        while(!has&&o.MoveNext())
          {
            cur=o.Current;
            has=seen.SAdd(f(cur));
          }
        return has&&(e.c=cur,true);
      }
      else return false;
    }, () => {
      o.Dispose();
    });
  }};
}
function take(n, s){
  n<0?nonNegative():void 0;
  return{GetEnumerator:() => {
    const e=[Get(s)];
    return new T(0, null, (o) => {
      o.s=o.s+1;
      if(o.s>n)return false;
      else {
        const en=e[0];
        return Equals(en, null)?insufficient():en.MoveNext()?(o.c=en.Current,o.s===n?(en.Dispose(),e[0]=null):void 0,true):(en.Dispose(),e[0]=null,insufficient());
      }
    }, () => {
      const x=e[0];
      if(!Equals(x, null))x.Dispose();
    });
  }};
}
function initInfinite(f){
  return{GetEnumerator:() => new T(0, null, (e) => {
    e.c=f(e.s);
    e.s=e.s+1;
    return true;
  }, void 0)};
}
function forall(p, s){
  return!exists((x) =>!p(x), s);
}
function exists(p, s){
  const e=Get(s);
  try {
    let r=false;
    while(!r&&e.MoveNext())
      r=p(e.Current);
    return r;
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
}
function max(s){
  const e=Get(s);
  try {
    if(!e.MoveNext())seqEmpty();
    let m=e.Current;
    while(e.MoveNext())
      {
        const x=e.Current;
        if(Compare(x, m)===1)m=x;
      }
    return m;
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
}
function seqEmpty(){
  return FailWith("The input sequence was empty.");
}
class Var extends Object_1 { }
function generateToken(){
  const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const rnd=new Random();
  return init_2(8, () => chars[rnd.Next_1(chars.length)]).join("");
}
function AddPlayerToRoom(roomToken, playerName, playerToken){
  return Bind_1((new AjaxRemotingProvider()).Async("Server/AddPlayerToRoom", [roomToken, playerName, playerToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
function GetAllRooms(){
  return Bind_1((new AjaxRemotingProvider()).Async("Server/GetAllRooms", []), (o) => Return(((DecodeList(DecodeJson_RoomInfo))())(o)));
}
function RegisterRoom(hostName, hostToken, roomName, roomToken){
  return Bind_1((new AjaxRemotingProvider()).Async("Server/RegisterRoom", [hostName, hostToken, roomName, roomToken]), (o) => Return((DecodeJson_FSharpResult_2())(o)));
}
function GetFieldValues(o){
  let r=[];
  let k;
  for(var k_1 in o)r.push(o[k_1]);
  return r;
}
function Equals(a, b){
  if(a===b)return true;
  else {
    const m=typeof a;
    if(m=="object"){
      if(a===null||a===void 0||b===null||b===void 0||!Equals(typeof b, "object"))return false;
      else if("Equals"in a)return a.Equals(b);
      else if("Equals"in b)return false;
      else if(a instanceof Array&&b instanceof Array)return arrayEquals(a, b);
      else if(a instanceof Date&&b instanceof Date)return dateEquals(a, b);
      else {
        const eqR=[true];
        let k;
        for(var k_2 in a)if(((k_3) => {
          eqR[0]=!a.hasOwnProperty(k_3)||b.hasOwnProperty(k_3)&&Equals(a[k_3], b[k_3]);
          return!eqR[0];
        })(k_2))break;
        if(eqR[0]){
          let k_1;
          for(var k_3 in b)if(((k_4) => {
            eqR[0]=!b.hasOwnProperty(k_4)||a.hasOwnProperty(k_4);
            return!eqR[0];
          })(k_3))break;
        }
        return eqR[0];
      }
    }
    else return m=="function"&&("$Func"in a?a.$Func===b.$Func&&a.$Target===b.$Target:"$Invokes"in a&&"$Invokes"in b&&arrayEquals(a.$Invokes, b.$Invokes));
  }
}
function arrayEquals(a, b){
  let eq;
  let i;
  if(length_1(a)===length_1(b)){
    eq=true;
    i=0;
    while(eq&&i<length_1(a))
      {
        !Equals(get(a, i), get(b, i))?eq=false:void 0;
        i=i+1;
      }
    return eq;
  }
  else return false;
}
function dateEquals(a, b){
  return a.getTime()===b.getTime();
}
function Hash(o){
  const m=typeof o;
  return m=="function"?0:m=="boolean"?o?1:0:m=="number"?o:m=="string"?hashString(o):m=="object"?o==null?0:o instanceof Array?hashArray(o):hashObject(o):0;
}
function hashString(s){
  let hash;
  if(s===null)return 0;
  else {
    hash=5381;
    for(let i=0, _1=s.length-1;i<=_1;i++)hash=hashMix(hash, s[i].charCodeAt());
    return hash;
  }
}
function hashArray(o){
  let h=-34948909;
  for(let i=0, _1=length_1(o)-1;i<=_1;i++)h=hashMix(h, Hash(get(o, i)));
  return h;
}
function hashObject(o){
  if("GetHashCode"in o)return o.GetHashCode();
  else {
    const h=[0];
    let k;
    for(var k_1 in o)if(((key) => {
      h[0]=hashMix(hashMix(h[0], hashString(key)), Hash(o[key]));
      return false;
    })(k_1))break;
    return h[0];
  }
}
function hashMix(x, y){
  return(x<<5)+x+y;
}
function Compare(a, b){
  if(a===b)return 0;
  else {
    const m=typeof a;
    switch(m=="function"?1:m=="boolean"?2:m=="number"?2:m=="string"?2:m=="object"?3:0){
      case 0:
        return typeof b=="undefined"?0:-1;
      case 1:
        return FailWith("Cannot compare function values.");
      case 2:
        return a<b?-1:1;
      case 3:
        if(a===null)return -1;
        else if(b===null)return 1;
        else if("CompareTo"in a)return a.CompareTo(b);
        else if("CompareTo0"in a)return a.CompareTo0(b);
        else if(a instanceof Array&&b instanceof Array)return compareArrays(a, b);
        else if(a instanceof Date&&b instanceof Date)return compareDates(a, b);
        else {
          const cmp=[0];
          let k;
          for(var k_2 in a)if(((k_3) =>!a.hasOwnProperty(k_3)?false:!b.hasOwnProperty(k_3)?(cmp[0]=1,true):(cmp[0]=Compare(a[k_3], b[k_3]),cmp[0]!==0))(k_2))break;
          if(cmp[0]===0){
            let k_1;
            for(var k_3 in b)if(((k_4) =>!b.hasOwnProperty(k_4)?false:!a.hasOwnProperty(k_4)&&(cmp[0]=-1,true))(k_3))break;
          }
          return cmp[0];
        }
        break;
    }
  }
}
function compareArrays(a, b){
  let cmp;
  let i;
  if(length_1(a)<length_1(b))return -1;
  else if(length_1(a)>length_1(b))return 1;
  else {
    cmp=0;
    i=0;
    while(cmp===0&&i<length_1(a))
      {
        cmp=Compare(get(a, i), get(b, i));
        i=i+1;
      }
    return cmp;
  }
}
function compareDates(a, b){
  return Compare(a.getTime(), b.getTime());
}
class TemplateInstance extends Object_1 {
  doc;
  allVars;
  anchorRoot;
  get Doc(){
    return this.doc;
  }
  constructor(c, doc){
    super();
    this.doc=doc;
    this.allVars=c.$==0?c.$0:FailWith("Should not happen");
    this.anchorRoot=null;
  }
}
function get(arr, n){
  checkBounds(arr, n);
  return arr[n];
}
function length_1(arr){
  return arr.dims===2?arr.length*arr.length:arr.length;
}
function checkBounds(arr, n){
  if(n<0||n>=arr.length)FailWith("Index was outside the bounds of the array.");
}
function set(arr, n, x){
  checkBounds(arr, n);
  arr[n]=x;
}
class ProviderBuilder extends Object_1 {
  i;
  k;
  h;
  s;
  static New_1(){
    return new this("New_1");
  }
  constructor(i){
    if(i=="New_1"){
      let c;
      super();
      this.i=null;
      this.k=(c=NewGuid(),String(c));
      this.h=MarkResizable([]);
      SetOptional(this, "s", null);
    }
  }
}
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
function mainform(h){
  LoadLocalTemplates("main");
  return h?NamedTemplate("main", Some("mainform"), h):void 0;
}
function DecodeJson_FSharpResult_2(){
  return Decoder_FSharpResult_2?Decoder_FSharpResult_2:Decoder_FSharpResult_2=(DecodeUnion(void 0, "$", [[0, [["$0", "ResultValue", Id(), 0]]], [1, [["$0", "ErrorValue", Id(), 0]]]]))();
}
function DecodeJson_RoomInfo(){
  return Decoder_RoomInfo?Decoder_RoomInfo:Decoder_RoomInfo=(DecodeRecord(void 0, [["RoomToken", Id(), 0], ["HostToken", Id(), 0], ["HostName", Id(), 0], ["RoomName", Id(), 0], ["Players", DecodeList(Id()), 0], ["CreatedDT", DecodeDateTime(), 0], ["IsOpen", Id(), 0], ["CurrentGame", Id(), 1]]))();
}
class ConcreteVar extends Var {
  isConst;
  current;
  snap;
  view;
  id;
  get View(){
    return this.view;
  }
  Get(){
    return this.current;
  }
  Set(v){
    if(this.isConst)(((_1) => _1("WebSharper.UI: invalid attempt to change value of a Var after calling SetFinal"))((s) => {
      console.log(s);
    }));
    else {
      Obsolete(this.snap);
      this.current=v;
      this.snap={s:Ready(v, [])};
    }
  }
  SetFinal(v){
    if(this.isConst)(((_1) => _1("WebSharper.UI: invalid attempt to change value of a Var after calling SetFinal"))((s) => {
      console.log(s);
    }));
    else {
      Obsolete(this.snap);
      this.isConst=true;
      this.current=v;
      this.snap={s:Forever(v)};
    }
  }
  UpdateMaybe(f){
    const m=f(this.Get());
    if(m!=null&&m.$==1)this.Set(m.$0);
  }
  constructor(isConst, initSnap, initValue){
    super();
    this.isConst=isConst;
    this.current=initValue;
    this.snap=initSnap;
    this.view=() => this.snap;
    this.id=Int();
  }
}
function Map2Unit(sn1, sn2){
  const _1=sn1.s;
  const _2=sn2.s;
  if(_1!=null&&_1.$==0)return _2!=null&&_2.$==0?{s:Forever(null)}:sn2;
  else if(_2!=null&&_2.$==0)return sn1;
  else {
    const res={s:Waiting([], [])};
    const cont=() => {
      const m=res.s;
      if(!(m!=null&&m.$==0||m!=null&&m.$==2)){
        const _3=ValueAndForever(sn1);
        const _4=ValueAndForever(sn2);
        if(_3!=null&&_3.$==1)if(_4!=null&&_4.$==1)if(_3.$0[1]&&_4.$0[1])MarkForever(res, null);
        else MarkReady(res, null);
      }
    };
    When(sn1, cont, res);
    When(sn2, cont, res);
    return res;
  }
}
function Map(fn, sn){
  const m=sn.s;
  if(m!=null&&m.$==0)return{s:Forever(fn(m.$0))};
  else {
    const res={s:Waiting([], [])};
    When(sn, (a) => {
      MarkDone(res, sn, fn(a));
    }, res);
    return res;
  }
}
function WhenObsoleteRun(snap, obs){
  const m=snap.s;
  if(m==null)obs();
  else m!=null&&m.$==2?m.$1.push(obs):m!=null&&m.$==3?m.$1.push(obs):void 0;
}
function ValueAndForever(snap){
  const m=snap.s;
  return m!=null&&m.$==0?Some([m.$0, true]):m!=null&&m.$==2?Some([m.$0, false]):null;
}
function MarkForever(sn, v){
  const m=sn.s;
  if(m!=null&&m.$==3){
    sn.s=Forever(v);
    const qa=m.$0;
    for(let i=0, _1=length_1(qa)-1;i<=_1;i++)(get(qa, i))(v);
  }
  else void 0;
}
function MarkReady(sn, v){
  const m=sn.s;
  if(m!=null&&m.$==3){
    sn.s=Ready(v, m.$1);
    const qa=m.$0;
    for(let i=0, _1=length_1(qa)-1;i<=_1;i++)(get(qa, i))(v);
  }
  else void 0;
}
function When(snap, avail, obs){
  const m=snap.s;
  if(m==null)Obsolete(obs);
  else m!=null&&m.$==2?(EnqueueSafe(m.$1, obs),avail(m.$0)):m!=null&&m.$==3?(m.$0.push(avail),EnqueueSafe(m.$1, obs)):avail(m.$0);
}
function Join(snap){
  const res={s:Waiting([], [])};
  When(snap, (x) => {
    const y=x();
    When(y, (v) => {
      let _1;
      const _2=y.s;
      if(_2!=null&&_2.$==0){
        const _3=snap.s;
        _1=_3!=null&&_3.$==0;
      }
      else _1=false;
      if(_1)MarkForever(res, v);
      else MarkReady(res, v);
    }, res);
  }, res);
  return res;
}
function MarkDone(res, sn, v){
  const _1=sn.s;
  if(_1!=null&&_1.$==0)MarkForever(res, v);
  else MarkReady(res, v);
}
function EnqueueSafe(q, x){
  q.push(x);
  if(q.length%20===0){
    const qcopy=q.slice(0);
    Clear(q);
    for(let i=0, _1=length_1(qcopy)-1;i<=_1;i++){
      const o=get(qcopy, i);
      if(typeof o=="object")(((sn) => {
        if(sn.s)q.push(sn);
      })(o));
      else(((f) => {
        q.push(f);
      })(o));
    }
  }
  else void 0;
}
function WhenRun(snap, avail, obs){
  const m=snap.s;
  if(m==null)obs();
  else m!=null&&m.$==2?(m.$1.push(obs),avail(m.$0)):m!=null&&m.$==3?(m.$0.push(avail),m.$1.push(obs)):avail(m.$0);
}
function Copy(sn){
  const m=sn.s;
  if(m==null)return sn;
  else if(m!=null&&m.$==2){
    const res={s:Ready(m.$0, [])};
    WhenObsolete(sn, res);
    return res;
  }
  else if(m!=null&&m.$==3){
    const res_1={s:Waiting([], [])};
    When(sn, (v) => {
      MarkDone(res_1, sn, v);
    }, res_1);
    return res_1;
  }
  else return sn;
}
function Map3(fn, sn1, sn2, sn3){
  const _1=sn1.s;
  const _2=sn2.s;
  const _3=sn3.s;
  if(_1!=null&&_1.$==0)return _2!=null&&_2.$==0?_3!=null&&_3.$==0?{s:Forever(fn(_1.$0, _2.$0, _3.$0))}:Map3Opt1(fn, _1.$0, _2.$0, sn3):_3!=null&&_3.$==0?Map3Opt2(fn, _1.$0, _3.$0, sn2):Map3Opt3(fn, _1.$0, sn2, sn3);
  else if(_2!=null&&_2.$==0)return _3!=null&&_3.$==0?Map3Opt4(fn, _2.$0, _3.$0, sn1):Map3Opt5(fn, _2.$0, sn1, sn3);
  else if(_3!=null&&_3.$==0)return Map3Opt6(fn, _3.$0, sn1, sn2);
  else {
    const res={s:Waiting([], [])};
    const cont=() => {
      const m=res.s;
      if(!(m!=null&&m.$==0||m!=null&&m.$==2)){
        const _4=ValueAndForever(sn1);
        const _5=ValueAndForever(sn2);
        const _6=ValueAndForever(sn3);
        if(_4!=null&&_4.$==1)if(_5!=null&&_5.$==1)if(_6!=null&&_6.$==1)if(_4.$0[1]&&_5.$0[1]&&_6.$0[1])MarkForever(res, fn(_4.$0[0], _5.$0[0], _6.$0[0]));
        else MarkReady(res, fn(_4.$0[0], _5.$0[0], _6.$0[0]));
      }
    };
    When(sn1, cont, res);
    When(sn2, cont, res);
    When(sn3, cont, res);
    return res;
  }
}
function Sequence(snaps){
  const snaps_1=ofSeq_1(snaps);
  if(snaps_1.length==0)return{s:Forever([])};
  else {
    const res={s:Waiting([], [])};
    const w=[length_1(snaps_1)-1];
    const cont=() => {
      if(w[0]===0){
        const vs=map_2((s) => {
          const m=s.s;
          return m!=null&&m.$==0?m.$0:m!=null&&m.$==2?m.$0:FailWith("value not found by View.Sequence");
        }, snaps_1);
        if(forall_2((s) => {
          const _1=s.s;
          return _1!=null&&_1.$==0;
        }, snaps_1))MarkForever(res, vs);
        else MarkReady(res, vs);
      }
      else w[0]=w[0]-1;
    };
    iter_1((s) => {
      When(s, cont, res);
    }, snaps_1);
    return res;
  }
}
function Map2(fn, sn1, sn2){
  const _1=sn1.s;
  const _2=sn2.s;
  if(_1!=null&&_1.$==0)return _2!=null&&_2.$==0?{s:Forever(fn(_1.$0, _2.$0))}:Map2Opt1(fn, _1.$0, sn2);
  else if(_2!=null&&_2.$==0)return Map2Opt2(fn, _2.$0, sn1);
  else {
    const res={s:Waiting([], [])};
    const cont=() => {
      const m=res.s;
      if(!(m!=null&&m.$==0||m!=null&&m.$==2)){
        const _3=ValueAndForever(sn1);
        const _4=ValueAndForever(sn2);
        if(_3!=null&&_3.$==1)if(_4!=null&&_4.$==1)if(_3.$0[1]&&_4.$0[1])MarkForever(res, fn(_3.$0[0], _4.$0[0]));
        else MarkReady(res, fn(_3.$0[0], _4.$0[0]));
      }
    };
    When(sn1, cont, res);
    When(sn2, cont, res);
    return res;
  }
}
function WhenObsolete(snap, obs){
  const m=snap.s;
  if(m==null)Obsolete(obs);
  else m!=null&&m.$==2?EnqueueSafe(m.$1, obs):m!=null&&m.$==3?EnqueueSafe(m.$1, obs):void 0;
}
function Map3Opt1(fn, x, y, sn3){
  return Map((z) => fn(x, y, z), sn3);
}
function Map3Opt2(fn, x, z, sn2){
  return Map((y) => fn(x, y, z), sn2);
}
function Map3Opt3(fn, x, sn2, sn3){
  return Map2((_1, _2) => fn(x, _1, _2), sn2, sn3);
}
function Map3Opt4(fn, y, z, sn1){
  return Map((x) => fn(x, y, z), sn1);
}
function Map3Opt5(fn, y, sn1, sn3){
  return Map2((_1, _2) => fn(_1, y, _2), sn1, sn3);
}
function Map3Opt6(fn, z, sn1, sn2){
  return Map2((_1, _2) => fn(_1, _2, z), sn1, sn2);
}
function Map2Opt1(fn, x, sn2){
  return Map((y) => fn(x, y), sn2);
}
function Map2Opt2(fn, y, sn1){
  return Map((x) => fn(x, y), sn1);
}
function Const(x){
  const o={s:Forever(x)};
  return() => o;
}
function Map2Unit_1(a, a_1){
  return CreateLazy(() => Map2Unit(a(), a_1()));
}
function Bind(fn, view){
  return Join_1(Map_1(fn, view));
}
function Map_1(fn, a){
  return CreateLazy(() => Map(fn, a()));
}
function CreateLazy(observe){
  const lv={c:null, o:observe};
  return() => {
    let c=lv.c;
    if(c===null){
      c=lv.o();
      lv.c=c;
      const _1=c.s;
      if(_1!=null&&_1.$==0)lv.o=null;
      else WhenObsoleteRun(c, () => {
        lv.c=null;
      });
      return c;
    }
    else return c;
  };
}
function Join_1(a){
  return CreateLazy(() => Join(a()));
}
function Sink(act, a){
  function loop(){
    WhenRun(a(), act, () => {
      scheduler().Fork(loop);
    });
  }
  scheduler().Fork(loop);
}
function Map3_1(fn, a, a_1, a_2){
  return CreateLazy(() => Map3(fn, a(), a_1(), a_2()));
}
function Sequence_1(views){
  return CreateLazy(() => Sequence(map_1((a) => a(), views)));
}
function Map2_1(fn, a, a_1){
  return CreateLazy(() => Map2(fn, a(), a_1()));
}
class FSharpList {
  static Empty=Create_1(FSharpList, {$:0});
  get_Item(x){
    return nth(x, this);
  }
  static Cons(Head, Tail){
    return Create_1(FSharpList, {
      $:1, 
      $0:Head, 
      $1:Tail
    });
  }
  GetEnumerator(){
    return new T(this, null, (e) => {
      const m=e.s;
      return m.$==0?false:(e.c=m.$0,e.s=m.$1,true);
    }, void 0);
  }
}
class Attr {
  static Create(name, value){
    return Static((el) => {
      el.setAttribute(name, value);
    });
  }
  static Concat(xs){
    const x=ofSeqNonCopying(xs);
    return TreeReduce(EmptyAttr(), Attr.Append, x);
  }
  static A3(init_3){
    return Create_1(Attr, {$:3, $0:init_3});
  }
  static Append(a, b){
    return AppendTree(a, b);
  }
  static Handler(event, q){
    return Attr.HandlerImpl(event, q);
  }
  static A2(Item1, Item2){
    return Create_1(Attr, {
      $:2, 
      $0:Item1, 
      $1:Item2
    });
  }
  static A1(Item){
    return Create_1(Attr, {$:1, $0:Item});
  }
  static HandlerImpl(event, q){
    return Static((el) => {
      el.addEventListener(event, (d) =>(q(el))(d), false);
    });
  }
  static A4(onAfterRender){
    return Create_1(Attr, {$:4, $0:onAfterRender});
  }
}
function Get(x){
  return x instanceof Array?ArrayEnumerator(x):Equals(typeof x, "string")?StringEnumerator(x):x.GetEnumerator();
}
function ArrayEnumerator(s){
  return new T(0, null, (e) => {
    const i=e.s;
    return i<length_1(s)&&(e.c=get(s, i),e.s=i+1,true);
  }, void 0);
}
function StringEnumerator(s){
  return new T(0, null, (e) => {
    const i=e.s;
    return i<s.length&&(e.c=s[i],e.s=i+1,true);
  }, void 0);
}
function Get0(x){
  return x instanceof Array?ArrayEnumerator(x):Equals(typeof x, "string")?StringEnumerator(x):"GetEnumerator0"in x?x.GetEnumerator0():x.GetEnumerator();
}
class T extends Object_1 {
  s;
  c;
  n;
  d;
  e;
  MoveNext(){
    const m=this.n(this);
    this.e=m?1:2;
    return m;
  }
  get Current(){
    return this.e===1?this.c:this.e===0?FailWith("Enumeration has not started. Call MoveNext."):FailWith("Enumeration already finished.");
  }
  Dispose(){
    if(this.d)this.d(this);
  }
  constructor(s, c, n, d){
    super();
    this.s=s;
    this.c=c;
    this.n=n;
    this.d=d;
    this.e=0;
  }
}
function NewFromSeq(fields){
  const r={};
  const e=Get(fields);
  try {
    while(e.MoveNext())
      {
        const f=e.Current;
        r[f[0]]=f[1];
      }
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
  return r;
}
function Handler(name, callback){
  return Static((el) => {
    el.addEventListener(name, (d) =>(callback(el))(d), false);
  });
}
function Value(var_1){
  return ValueWith(StringApply(), var_1);
}
function ValueWith(bind, var_1){
  const p=bind(var_1);
  return Attr.Append(Static(p[0]), DynamicCustom(p[1], p[2]));
}
function DynamicCustom(set_1, view){
  return Dynamic_1(view, set_1);
}
function OnAfterRender(callback){
  return Attr.A4(callback);
}
function Dynamic(name, view){
  return Dynamic_1(view, (el) =>(v) => el.setAttribute(name, v));
}
function FloatValueUnchecked(var_1){
  return ValueWith(FloatApplyUnchecked(), var_1);
}
function Checked(var_1){
  return ValueWith(BoolCheckedApply(), var_1);
}
function DateTimeValue(var_1){
  return ValueWith(DateTimeApplyUnchecked(), var_1);
}
function FileValue(var_1){
  return ValueWith(FileApplyUnchecked(), var_1);
}
function StringListValue(var_1){
  return ValueWith(StringListApply(), var_1);
}
function Delay(mk){
  return(c) => {
    try {
      (mk())(c);
    }
    catch(e){
      c.k(No(e));
    }
  };
}
function Bind_1(r, f){
  return checkCancel((c) => {
    r(New((a) => {
      if(a.$==0){
        const x=a.$0;
        scheduler().Fork(() => {
          try {
            (f(x))(c);
          }
          catch(e){
            c.k(No(e));
          }
        });
      }
      else scheduler().Fork(() => {
        c.k(a);
      });
    }, c.ct));
  });
}
function Zero(){
  return _c_1.Zero;
}
function StartImmediate(c, ctOpt){
  const d=(defCTS())[0];
  const ct=ctOpt==null?d:ctOpt.$0;
  if(!ct.c)c(New((a) => {
    if(a.$==1)UncaughtAsyncError(a.$0);
  }, ct));
}
function Combine(a, b){
  return Bind_1(a, () => b);
}
function Sleep(ms){
  return(c) => {
    let pending;
    let creg;
    pending=void 0;
    creg=void 0;
    pending=setTimeout(() => {
      creg.Dispose();
      scheduler().Fork(() => {
        c.k(Ok(null));
      });
    }, ms);
    creg=Register(c.ct, () => {
      clearTimeout(pending);
      scheduler().Fork(() => {
        cancel(c);
      });
    });
  };
}
function checkCancel(r){
  return(c) => {
    if(c.ct.c)cancel(c);
    else r(c);
  };
}
function defCTS(){
  return _c_1.defCTS;
}
function UncaughtAsyncError(e){
  console.log("WebSharper: Uncaught asynchronous exception", e);
}
function Register(ct, callback){
  if(ct===noneCT())return{Dispose(){
    return null;
  }};
  else {
    const i=ct.r.push(callback)-1;
    return{Dispose(){
      return set(ct.r, i, () => { });
    }};
  }
}
function cancel(c){
  c.k(Cc(new OperationCanceledException("New", c.ct)));
}
function scheduler(){
  return _c_1.scheduler;
}
function Return(x){
  return(c) => {
    c.k(Ok(x));
  };
}
function noneCT(){
  return _c_1.noneCT;
}
function GetCT(){
  return _c_1.GetCT;
}
function FromContinuations(subscribe){
  return(c) => {
    const continued=[false];
    const once=(cont) => {
      if(continued[0])FailWith("A continuation provided by Async.FromContinuations was invoked multiple times");
      else {
        continued[0]=true;
        scheduler().Fork(cont);
      }
    };
    subscribe((a) => {
      once(() => {
        c.k(Ok(a));
      });
    }, (e) => {
      once(() => {
        c.k(No(e));
      });
    }, (e) => {
      once(() => {
        c.k(Cc(e));
      });
    });
  };
}
function Start(c, ctOpt){
  const d=(defCTS())[0];
  const ct=ctOpt==null?d:ctOpt.$0;
  scheduler().Fork(() => {
    if(!ct.c)c(New((a) => {
      if(a.$==1)UncaughtAsyncError(a.$0);
    }, ct));
  });
}
function Trim(s){
  return s.replace(new RegExp("^\\s+"), "").replace(new RegExp("\\s+$"), "");
}
function replicate(count, s){
  return create(count, s).join("");
}
function Substring(s, ix, ct){
  return s.substr(ix, ct);
}
function StartsWith(t, s){
  return t.substring(0, s.length)==s;
}
function concat_1(separator, strings){
  return ofSeq_1(strings).join(separator);
}
function forall_1(f, s){
  return forall(f, protect(s));
}
function SplitChars(s, sep, opts){
  return Split(s, new RegExp("["+RegexEscape(sep.join(""))+"]"), opts);
}
function protect(s){
  return s==null?"":s;
}
function Split(s, pat, opts){
  return opts===1?filter((x) => x!=="", SplitWith(s, pat)):SplitWith(s, pat);
}
function RegexEscape(s){
  return s.replace(new RegExp("[-\\/\\\\^$*+?.()|[\\]{}]", "g"), "\\$&");
}
function SplitWith(str, pat){
  return str.split(pat);
}
function init_2(size, f){
  if(size<0)FailWith("Negative size given.");
  else null;
  const r=new Array(size);
  for(let i=0, _1=size-1;i<=_1;i++)r[i]=f(i);
  return r;
}
function ofList(xs){
  const q=[];
  let l=xs;
  while(!(l.$==0))
    {
      q.push(head(l));
      l=tail(l);
    }
  return q;
}
function choose(f, arr){
  const q=[];
  for(let i=0, _1=arr.length-1;i<=_1;i++){
    const m=f(arr[i]);
    if(m==null){ }
    else q.push(m.$0);
  }
  return q;
}
function findIndex(f, arr){
  const m=tryFindIndex(f, arr);
  return m==null?FailWith("KeyNotFoundException"):m.$0;
}
function iter_1(f, arr){
  for(let i=0, _1=arr.length-1;i<=_1;i++)f(arr[i]);
}
function tryFindIndex(f, arr){
  let res=null;
  let i=0;
  while(i<arr.length&&res==null)
    {
      f(arr[i])?res=Some(i):void 0;
      i=i+1;
    }
  return res;
}
function create(size, value){
  const r=new Array(size);
  for(let i=0, _1=size-1;i<=_1;i++)r[i]=value;
  return r;
}
function tryPick(f, arr){
  let res=null;
  let i=0;
  while(i<arr.length&&res==null)
    {
      const m=f(arr[i]);
      if(m!=null&&m.$==1)res=m;
      i=i+1;
    }
  return res;
}
function concat_2(xs){
  return Array.prototype.concat.apply([], ofSeq_1(xs));
}
function exists_1(f, x){
  let e=false;
  let i=0;
  while(!e&&i<length_1(x))
    if(f(x[i]))e=true;
    else i=i+1;
  return e;
}
function foldBack(f, arr, zero){
  let acc=zero;
  const len=arr.length;
  for(let i=1, _1=len;i<=_1;i++)acc=f(arr[len-i], acc);
  return acc;
}
function map_2(f, arr){
  const r=new Array(arr.length);
  for(let i=0, _1=arr.length-1;i<=_1;i++)r[i]=f(arr[i]);
  return r;
}
function distinctBy_1(f, a){
  return ofSeq_1(distinctBy(f, a));
}
function ofSeq_1(xs){
  if(xs instanceof Array)return xs.slice();
  else if(xs instanceof FSharpList)return ofList(xs);
  else {
    const q=[];
    const o=Get(xs);
    try {
      while(o.MoveNext())
        q.push(o.Current);
      return q;
    }
    finally {
      if(typeof o=="object"&&isIDisposable(o))o.Dispose();
    }
  }
}
function filter(f, arr){
  const r=[];
  for(let i=0, _1=arr.length-1;i<=_1;i++)if(f(arr[i]))r.push(arr[i]);
  return r;
}
function pick(f, arr){
  const m=tryPick(f, arr);
  return m==null?FailWith("KeyNotFoundException"):m.$0;
}
function forall_2(f, x){
  let a=true;
  let i=0;
  while(a&&i<length_1(x))
    if(f(x[i]))i=i+1;
    else a=false;
  return a;
}
class Random extends Object_1 {
  Next_1(maxValue){
    return maxValue<0?FailWith("'maxValue' must be greater than zero."):Math.floor(Math.random()*maxValue);
  }
}
class AjaxRemotingProvider extends Object_1 {
  AsyncBase(m, data){
    const _1=null;
    return Delay(() => {
      const headers=makeHeaders(this.Headers);
      const payload=makePayload(data);
      return Bind_1(GetCT(), (a) => Bind_1(FromContinuations((ok, err, cc) => {
        const waiting=[true];
        const reg=Register(a, () => {
          if(waiting[0]){
            waiting[0]=false;
            cc(new OperationCanceledException("New", a));
          }
        });
        return AjaxProvider().Async(this.EndPoint+"/"+m, headers, payload, (x) => {
          if(waiting[0]){
            waiting[0]=false;
            reg.Dispose();
            ok(x);
          }
        }, (e) => {
          if(waiting[0]){
            waiting[0]=false;
            reg.Dispose();
            err(e);
          }
        });
      }), (a_1) => Return(JSON.parse(a_1))));
    });
  }
  get EndPoint(){
    return EndPoint();
  }
  get Headers(){
    return[];
  }
  Async(m, data){
    return this.AsyncBase(m, data);
  }
}
function DecodeList(decEl){
  return() =>(a) => {
    const e=decEl();
    return init(length_1(a), (i) => e(get(a, i)));
  };
}
function DecodeUnion(t, discr, cases){
  return() =>(x) => {
    let tag;
    if(typeof x==="object"&&x!=null){
      const o={};
      if(typeof discr==="string"){
        const tagName=x[discr];
        tag=findIndex((case_1) =>!Equals(case_1, null)&&case_1[0]==tagName, cases);
      }
      else {
        const r=[void 0];
        let k;
        for(var k_1 in discr)if(((k_2) => x.hasOwnProperty(k_2)&&(r[0]=discr[k_2],true))(k_1))break;
        tag=r[0];
      }
      o.$=tag;
      iter_1((_1) => {
        const from=_1[0];
        const __to__=_1[1];
        const dec=_1[2];
        const kind=_1[3];
        if(from==null){
          const r_1=(dec())(x);
          if(__to__)delete r_1[discr];
          o.$0=r_1;
          return;
        }
        else return kind===0?void(o[from]=(dec())(x[__to__])):kind===1?void(o[from]=x.hasOwnProperty(__to__)?Some((dec())(x[__to__])):null):FailWith("Invalid field option kind");
      }, (get(cases, tag))[1]);
      return t===void 0?o:Create_1(t, o);
    }
    else return x;
  };
}
function Id(){
  return() =>(x) => x;
}
function DecodeRecord(t, fields){
  return() =>(x) => {
    const o={};
    iter_1((_1) => {
      const name=_1[0];
      const dec=_1[1];
      const kind=_1[2];
      return kind===0?x.hasOwnProperty(name)?void(o[name]=(dec())(x[name])):FailWith("Missing mandatory field: "+name):kind===1?void(o[name]=x.hasOwnProperty(name)?Some((dec())(x[name])):null):kind===2?x.hasOwnProperty(name)?void(o[name]=(dec())(x[name])):null:kind===3?x[name]===void 0?void(o[name]=(dec())(x[name])):null:FailWith("Invalid field option kind");
    }, fields);
    return t===void 0?o:Create_1(t, o);
  };
}
function DecodeDateTime(){
  return() =>(x) => x.hasOwnProperty("d")?(new Date(x.d)).getTime():(new Date(x)).getTime();
}
function ofSeqNonCopying(xs){
  if(xs instanceof Array)return xs;
  else if(xs instanceof FSharpList)return ofList(xs);
  else if(xs===null)return[];
  else {
    const q=[];
    const o=Get(xs);
    try {
      while(o.MoveNext())
        q.push(o.Current);
      return q;
    }
    finally {
      if(typeof o=="object"&&isIDisposable(o))o.Dispose();
    }
  }
}
function TreeReduce(defaultValue, reduction, array){
  const l=length_1(array);
  function loop(off){
    return(len) => {
      let _1;
      switch(len<=0?0:len===1?off>=0&&off<l?1:(_1=len,2):(_1=len,2)){
        case 0:
          return defaultValue;
        case 1:
          return get(array, off);
        case 2:
          const l2=len/2>>0;
          return reduction((loop(off))(l2), (loop(off+l2))(len-l2));
      }
    };
  }
  return(loop(0))(l);
}
function MapTreeReduce(mapping, defaultValue, reduction, array){
  const l=length_1(array);
  function loop(off){
    return(len) => {
      let _1;
      switch(len<=0?0:len===1?off>=0&&off<l?1:(_1=len,2):(_1=len,2)){
        case 0:
          return defaultValue;
        case 1:
          return mapping(get(array, off));
        case 2:
          const l2=len/2>>0;
          return reduction((loop(off))(l2), (loop(off+l2))(len-l2));
      }
    };
  }
  return(loop(0))(l);
}
function DateFormatter(date, format){
  const d=new Date(date);
  switch(format){
    case"D":
      return String(longDays().get_Item(d.getDay()))+", "+padLeft(2, String(d.getDate()))+" "+String(longMonths().get_Item(d.getMonth()))+" "+String(d.getFullYear());
    case"d":
      return padLeft(2, String(d.getMonth()+1))+"/"+padLeft(2, String(d.getDate()))+"/"+String(d.getFullYear());
    case"T":
      return padLeft(2, String(d.getHours()))+":"+padLeft(2, String(d.getMinutes()))+":"+padLeft(2, String(d.getSeconds()));
    case"t":
      return padLeft(2, String(d.getHours()))+":"+padLeft(2, String(d.getMinutes()));
    case"o":
    case"O":
      return String(d.getFullYear())+"-"+padLeft(2, String(d.getMonth()+1))+"-"+padLeft(2, String(d.getDate()))+"T"+padLeft(2, String(d.getHours()))+":"+padLeft(2, String(d.getMinutes()))+":"+padLeft(2, String(d.getSeconds()))+"."+padLeft(3, String(d.getMilliseconds()))+dateOffsetString(d);
    default:
      return dateToStringWithCustomFormat(d, format);
  }
}
function longDays(){
  return _c_3.longDays;
}
function padLeft(minLength, x){
  return x.length<minLength?replicate(minLength-x.length, "0")+x:x;
}
function longMonths(){
  return _c_3.longMonths;
}
function dateOffsetString(d){
  const offset=d.getTimezoneOffset()*-60000;
  const offset_1=Math.abs(offset);
  return(offset<0?"-":"+")+padLeft(2, String(toInt(offset_1/3600000)))+":"+padLeft(2, String(toInt(offset_1%3600000/60000)));
}
function dateToStringWithCustomFormat(d, format){
  let cursorPos=0;
  let tokenLength=0;
  let result="";
  const appendToResult=(s) => {
    result=result+s;
  };
  while(cursorPos<format.length)
    ((() => {
      const token=format[cursorPos];
      switch(token){
        case"d":
          tokenLength=parseRepeatToken(format, cursorPos, "d");
          cursorPos=cursorPos+tokenLength;
          switch(tokenLength){
            case 1:
              return appendToResult(String(d.getDate()));
            case 2:
              return appendToResult(padLeft(2, String(d.getDate())));
            case 3:
              return appendToResult(String(shortDays().get_Item(d.getDay())));
            default:
            case 4:
              return appendToResult(String(longDays().get_Item(d.getDay())));
          }
          break;
        case"f":
          tokenLength=parseRepeatToken(format, cursorPos, "f");
          cursorPos=cursorPos+tokenLength;
          switch(tokenLength){
            case 3:
            case 2:
            case 1:
              const precision=toInt(10**(3-tokenLength));
              return appendToResult(padLeft(tokenLength, String(d.getMilliseconds()/precision>>0)));
            case 7:
            case 6:
            case 5:
            case 4:
              return appendToResult(padRight(tokenLength, String(d.getMilliseconds())));
            default:
              return FailWith("Input string was not in a correct format.");
          }
          break;
        case"F":
          tokenLength=parseRepeatToken(format, cursorPos, "F");
          cursorPos=cursorPos+tokenLength;
          switch(tokenLength){
            case 3:
            case 2:
            case 1:
              const precision_1=toInt(10**(3-tokenLength));
              const value=d.getMilliseconds()/precision_1>>0;
              return value!==0?appendToResult(padLeft(tokenLength, String(value))):null;
            case 7:
            case 6:
            case 5:
            case 4:
              const value_1=d.getMilliseconds();
              return value_1!==0?appendToResult(padLeft(3, String(value_1))):null;
            default:
              return FailWith("Input string was not in a correct format.");
          }
          break;
        case"g":
          tokenLength=parseRepeatToken(format, cursorPos, "g");
          cursorPos=cursorPos+tokenLength;
          return appendToResult("A.D.");
        case"h":
          tokenLength=parseRepeatToken(format, cursorPos, "h");
          cursorPos=cursorPos+tokenLength;
          const hours=d.getHours()%12;
          return appendToResult(tokenLength===1||tokenLength===2&&false?hours===0?"12":String(hours):hours===0?"12":padLeft(2, String(hours)));
        case"H":
          tokenLength=parseRepeatToken(format, cursorPos, "H");
          cursorPos=cursorPos+tokenLength;
          return appendToResult(tokenLength===1||tokenLength===2&&false?String(d.getHours()):padLeft(2, String(d.getHours())));
        case"K":
          tokenLength=parseRepeatToken(format, cursorPos, "K");
          cursorPos=cursorPos+tokenLength;
          return appendToResult(replicate(tokenLength, dateOffsetString(d)));
        case"m":
          tokenLength=parseRepeatToken(format, cursorPos, "m");
          cursorPos=cursorPos+tokenLength;
          return appendToResult(tokenLength===1||tokenLength===2&&false?String(d.getMinutes()):padLeft(2, String(d.getMinutes())));
        case"M":
          let _1;
          tokenLength=parseRepeatToken(format, cursorPos, "M");
          cursorPos=cursorPos+tokenLength;
          switch(tokenLength){
            case 1:
              _1=String(d.getMonth()+1);
              break;
            case 2:
              _1=padLeft(2, String(d.getMonth()+1));
              break;
            case 3:
              _1=String(shortMonths().get_Item(d.getMonth()));
              break;
            default:
            case 4:
              _1=String(longMonths().get_Item(d.getMonth()));
              break;
          }
          return appendToResult(_1);
        case"s":
          tokenLength=parseRepeatToken(format, cursorPos, "s");
          cursorPos=cursorPos+tokenLength;
          return appendToResult(tokenLength===1||tokenLength===2&&false?String(d.getSeconds()):padLeft(2, String(d.getSeconds())));
        case"t":
          tokenLength=parseRepeatToken(format, cursorPos, "t");
          cursorPos=cursorPos+tokenLength;
          return appendToResult(tokenLength===1||tokenLength===2&&false?d.getHours()<12?"A":"P":d.getHours()<12?"AM":"PM");
        case"y":
          tokenLength=parseRepeatToken(format, cursorPos, "y");
          cursorPos=cursorPos+tokenLength;
          return appendToResult(tokenLength===1?String(d.getFullYear()%100):tokenLength===2?padLeft(2, String(d.getFullYear()%100)):padLeft(tokenLength, String(d.getFullYear())));
        case"z":
          tokenLength=parseRepeatToken(format, cursorPos, "z");
          cursorPos=cursorPos+tokenLength;
          const utcOffsetText=dateOffsetString(d);
          const sign=Substring(utcOffsetText, 0, 1);
          const hours_1=Substring(utcOffsetText, 1, 2);
          const minutes=Substring(utcOffsetText, 4, 2);
          return appendToResult(tokenLength===1?sign+(StartsWith(hours_1, "0")?hours_1.substring(1):hours_1):tokenLength===2?sign+hours_1:sign+hours_1+":"+minutes);
        case":":
          cursorPos=cursorPos+1;
          return appendToResult(":");
        case"/":
          cursorPos=cursorPos+1;
          return appendToResult("/");
        case"'":
        case"\"":
          const p=parseQuotedString(format, cursorPos);
          cursorPos=cursorPos+p[1];
          return appendToResult(p[0]);
        case"%":
          const nextChar=parseNextChar(format, cursorPos);
          return nextChar!=null&&nextChar.$0!=="%"?(cursorPos=cursorPos+2,appendToResult(dateToStringWithCustomFormat(d, nextChar.$0))):FailWith("Invalid format string");
        case"\\":
          const m=parseNextChar(format, cursorPos);
          return m==null?FailWith("Invalid format string"):(cursorPos=cursorPos+2,appendToResult(m.$0));
        default:
          appendToResult(token);
          {
            cursorPos=cursorPos+1;
            return;
          }
          break;
      }
    })());
  return result;
}
function parseRepeatToken(format, pos, patternChar){
  let tokenLength=0;
  let internalPos=pos;
  while(internalPos<format.length&&format[internalPos]===patternChar)
    {
      internalPos=internalPos+1;
      tokenLength=tokenLength+1;
    }
  return tokenLength;
}
function shortDays(){
  return _c_3.shortDays;
}
function padRight(minLength, x){
  return x.length<minLength?x+replicate(minLength-x.length, "0"):x;
}
function shortMonths(){
  return _c_3.shortMonths;
}
function parseQuotedString(format, pos){
  const quoteChar=format[pos];
  let result="";
  let foundQuote=false;
  let pos_1=pos;
  let earlyBreak=false;
  while(pos_1<format.length&&!earlyBreak)
    {
      pos_1=pos_1+1;
      const currentChar=format[pos_1];
      if(currentChar===quoteChar){
        foundQuote=true;
        earlyBreak=true;
      }
      else currentChar==="\\"?pos_1<format.length?(pos_1=pos_1+1,result=result+format[pos_1]):FailWith("Invalid string format"):result=result+currentChar;
    }
  if(!foundQuote)FailWith("Invalid string format could not find matching quote for "+String(quoteChar));
  return[result, pos_1-pos+1];
}
function parseNextChar(format, pos){
  return pos>=format.length-1?null:Some(format[pos+1]);
}
class TemplateHole extends Object_1 {
  ForTextView(){
    console.warn("Content hole filled with attribute data", this.Name);
    return null;
  }
  AddAttribute(a, a_1){
    console.warn("Var hole filled with non-Var data", this.Name);
  }
  get AsChoiceView(){
    console.warn("Attribute value hole filled with non-text data", this.Name);
    return Choice1Of2("");
  }
}
class Elt extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  get Value(){
    return this.fillWith;
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
function NewGuid(){
  return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(new RegExp("[xy]", "g"), (c) => {
    const r=Math.random()*16|0;
    const v=c=="x"?r:r&3|8;
    return v.toString(16);
  });
}
function CompleteHoles(key, filledHoles, vars){
  const allVars=new Dictionary("New_5");
  const filledVars=new HashSet("New_3");
  const e=Get(filledHoles);
  try {
    while(e.MoveNext())
      {
        const h=e.Current;
        const n=h.Name;
        filledVars.SAdd(n);
        allVars.set_Item(n, h);
      }
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
  return[append(filledHoles, choose((_1) => {
    const name=_1[0];
    const ty=_1[1];
    const d=_1[2];
    if(filledVars.Contains(name))return null;
    else {
      const r=ty===0?_c_2.GetOrAddHoleFor(key, name, () => {
        const o=d==null?null:Some(d.$0);
        let _2=_c.Create_1(o==null?"":o.$0);
        return new VarStr(name, _2);
      }):ty===1?_c_2.GetOrAddHoleFor(key, name, () => {
        const o=d==null?null:Some(d.$0);
        let _2=_c.Create_1(o==null?0:o.$0);
        return new VarFloatUnchecked(name, _2);
      }):ty===2?_c_2.GetOrAddHoleFor(key, name, () => {
        const o=d==null?null:Some(d.$0);
        let _2=_c.Create_1(o==null?false:o.$0);
        return new VarBool(name, _2);
      }):ty===3?_c_2.GetOrAddHoleFor(key, name, () => {
        const o=d==null?null:Some(d.$0);
        let _2=_c.Create_1(o==null?-8640000000000000:o.$0);
        return new VarDateTime(name, _2);
      }):ty===4?_c_2.GetOrAddHoleFor(key, name, () => new VarFile(name, _c.Create_1([]))):ty===5?_c_2.GetOrAddHoleFor(key, name, () => new VarDomElement(name, _c.Create_1(Some(globalThis.document.querySelector("[ws-dom="+name+"]"))))):ty===6?_c_2.GetOrAddHoleFor(key, name, () => {
        const o=d==null?null:Some(d.$0);
        let _2=_c.Create_1(o==null?[]:o.$0);
        return new VarStrList(name, _2);
      }):FailWith("Invalid value type");
      allVars.set_Item(name, r);
      return Some(r);
    }
  }, vars)), {$:0, $0:allVars}];
}
function Some(Value_1){
  return{$:1, $0:Value_1};
}
function Int(){
  set_counter(counter()+1);
  return counter();
}
function set_counter(_1){
  _c_4.counter=_1;
}
function counter(){
  return _c_4.counter;
}
function Ready(Item1, Item2){
  return{
    $:2, 
    $0:Item1, 
    $1:Item2
  };
}
function Forever(Item){
  return{$:0, $0:Item};
}
function Waiting(Item1, Item2){
  return{
    $:3, 
    $0:Item1, 
    $1:Item2
  };
}
function TextNodeDoc(Item){
  return{$:5, $0:Item};
}
function AppendDoc(Item1, Item2){
  return{
    $:0, 
    $0:Item1, 
    $1:Item2
  };
}
function EmbedDoc(Item){
  return{$:2, $0:Item};
}
function TreeDoc(Item){
  return{$:6, $0:Item};
}
function ElemDoc(Item){
  return{$:1, $0:Item};
}
function TextDoc(Item){
  return{$:4, $0:Item};
}
class View { }
function Static(attr_1){
  return Attr.A3(attr_1);
}
function Updates(dyn){
  return MapTreeReduce((x) => x.NChanged, Const(), Map2Unit_1, dyn.DynNodes);
}
function AppendTree(a, b){
  if(a===null)return b;
  else if(b===null)return a;
  else {
    const x=Attr.A2(a, b);
    SetFlags(x, Flags(a)|Flags(b));
    return x;
  }
}
function EmptyAttr(){
  return _c_5.EmptyAttr;
}
function Dynamic_1(view, set_1){
  return Attr.A1(new DynamicAttrNode(view, set_1));
}
function Insert(elem, tree){
  const nodes=[];
  const oar=[];
  function loop(node){
    while(true)
      {
        if(!(node===null)){
          if(node!=null&&node.$==1)return nodes.push(node.$0);
          else if(node!=null&&node.$==2){
            const b=node.$1;
            const a=node.$0;
            loop(a);
            node=b;
          }
          else return node!=null&&node.$==3?node.$0(elem):node!=null&&node.$==4?oar.push(node.$0):null;
        }
        else return null;
      }
  }
  loop(tree);
  const arr=nodes.slice(0);
  let _1=New_2(elem, Flags(tree), arr, oar.length===0?null:Some((el) => {
    iter((f) => {
      f(el);
    }, oar);
  }));
  return _1;
}
function Empty(e){
  return New_2(e, 0, [], null);
}
function SetFlags(a, f){
  a.flags=f;
}
function Flags(a){
  return a!==null&&a.hasOwnProperty("flags")?a.flags:0;
}
function HasExitAnim(attr_1){
  const flag=2;
  return(attr_1.DynFlags&flag)===flag;
}
function GetExitAnim(dyn){
  return GetAnim(dyn, (_1, _2) => _1.NGetExitAnim(_2));
}
function HasEnterAnim(attr_1){
  const flag=1;
  return(attr_1.DynFlags&flag)===flag;
}
function GetEnterAnim(dyn){
  return GetAnim(dyn, (_1, _2) => _1.NGetEnterAnim(_2));
}
function HasChangeAnim(attr_1){
  const flag=4;
  return(attr_1.DynFlags&flag)===flag;
}
function GetChangeAnim(dyn){
  return GetAnim(dyn, (_1, _2) => _1.NGetChangeAnim(_2));
}
function GetAnim(dyn, f){
  return Concat(map_2((n) => f(n, dyn.DynElem), dyn.DynNodes));
}
function Sync(elem, dyn){
  iter_1((d) => {
    d.NSync(elem);
  }, dyn.DynNodes);
}
function ParseHTMLIntoFakeRoot(elem){
  const root=globalThis.document.createElement("div");
  if(!rhtml().test(elem)){
    root.appendChild(globalThis.document.createTextNode(elem));
    return root;
  }
  else {
    const m=rtagName().exec(elem);
    const tag=Equals(m, null)?"":get(m, 1).toLowerCase();
    const w=(wrapMap())[tag];
    const p=w?w:defaultWrap();
    root.innerHTML=p[1]+elem.replace(rxhtmlTag(), "<$1></$2>")+p[2];
    function unwrap(elt, a){
      while(true)
        {
          if(a===0)return elt;
          else {
            const i=a;
            elt=elt.lastChild;
            a=i-1;
          }
        }
    }
    return unwrap(root, p[0]);
  }
}
function ChildrenArray(element){
  const a=[];
  for(let i=0, _1=element.childNodes.length-1;i<=_1;i++)a.push(element.childNodes[i]);
  return a;
}
function rhtml(){
  return _c_10.rhtml;
}
function wrapMap(){
  return _c_10.wrapMap;
}
function defaultWrap(){
  return _c_10.defaultWrap;
}
function rxhtmlTag(){
  return _c_10.rxhtmlTag;
}
function rtagName(){
  return _c_10.rtagName;
}
function IterSelector(el, selector, f){
  const l=el.querySelectorAll(selector);
  for(let i=0, _1=l.length-1;i<=_1;i++)f(l[i]);
}
function IterSelectorDoc(selector, f){
  const l=globalThis.document.querySelectorAll(selector);
  for(let i=0, _1=l.length-1;i<=_1;i++)f(l[i]);
}
function InsertAt(parent, pos, node){
  let _1;
  if(node.parentNode===parent){
    const m=node.nextSibling;
    let _2=Equals(m, null)?null:m;
    _1=pos===_2;
  }
  else _1=false;
  if(!_1)parent.insertBefore(node, pos);
}
function RemoveNode(parent, el){
  if(el.parentNode===parent)parent.removeChild(el);
}
function New(k, ct){
  return{k:k, ct:ct};
}
function No(Item){
  return{$:1, $0:Item};
}
function Ok(Item){
  return{$:0, $0:Item};
}
function Cc(Item){
  return{$:2, $0:Item};
}
let _c_1=Lazy((_i) => class $StartupCode_Concurrency {
  static {
    _c_1=_i(this);
  }
  static GetCT;
  static Zero;
  static defCTS;
  static scheduler;
  static noneCT;
  static {
    this.noneCT=New_1(false, []);
    this.scheduler=new Scheduler();
    this.defCTS=[new CancellationTokenSource()];
    this.Zero=Return();
    this.GetCT=(c) => {
      c.k(Ok(c.ct));
    };
  }
});
function New_1(IsCancellationRequested, Registrations){
  return{c:IsCancellationRequested, r:Registrations};
}
class Dictionary extends Object_1 {
  equals;
  hash;
  count;
  data;
  set_Item(k, v){
    this.set(k, v);
  }
  set(k, v){
    const h=this.hash(k);
    const d=this.data[h];
    if(d==null){
      this.count=this.count+1;
      this.data[h]=new Array({K:k, V:v});
    }
    else {
      const m=tryFindIndex((a) => this.equals.apply(null, [(KeyValue(a))[0], k]), d);
      if(m==null){
        this.count=this.count+1;
        d.push({K:k, V:v});
      }
      else d[m.$0]={K:k, V:v};
    }
  }
  TryGetValue(k, res){
    const d=this.data[this.hash(k)];
    if(d==null)return false;
    else {
      const v=tryPick((a) => {
        const a_1=KeyValue(a);
        return this.equals.apply(null, [a_1[0], k])?Some(a_1[1]):null;
      }, d);
      return v!=null&&v.$==1&&(res.set(v.$0),true);
    }
  }
  GetEnumerator(){
    return Get0(concat_2(GetFieldValues(this.data)));
  }
  ContainsKey(k){
    const d=this.data[this.hash(k)];
    return d==null?false:exists_1((a) => this.equals.apply(null, [(KeyValue(a))[0], k]), d);
  }
  RemoveKey(k){
    return this.remove(k);
  }
  get Keys(){
    return new KeyCollection(this);
  }
  get Values(){
    return new ValueCollection(this);
  }
  remove(k){
    const h=this.hash(k);
    const d=this.data[h];
    if(d==null)return false;
    else {
      const r=filter((a) =>!this.equals.apply(null, [(KeyValue(a))[0], k]), d);
      return length_1(r)<d.length&&(this.count=this.count-1,this.data[h]=r,true);
    }
  }
  Item(k){
    return this.get(k);
  }
  get(k){
    const d=this.data[this.hash(k)];
    return d==null?notPresent():pick((a) => {
      const a_1=KeyValue(a);
      return this.equals.apply(null, [a_1[0], k])?Some(a_1[1]):null;
    }, d);
  }
  static New_5(){
    return new this("New_5");
  }
  static New_6(init_3, equals, hash){
    return new this("New_6", init_3, equals, hash);
  }
  constructor(i, _1, _2, _3){
    if(i=="New_5"){
      i="New_6";
      _1=[];
      _2=Equals;
      _3=Hash;
    }
    if(i=="New_6"){
      const init_3=_1;
      const equals=_2;
      const hash=_3;
      super();
      this.equals=equals;
      this.hash=hash;
      this.count=0;
      this.data=[];
      const e=Get(init_3);
      try {
        while(e.MoveNext())
          {
            const x=e.Current;
            this.set(x.K, x.V);
          }
      }
      finally {
        if(typeof e=="object"&&isIDisposable(e))e.Dispose();
      }
    }
  }
}
function CreateEmbedNode(){
  return{Current:null, Dirty:false};
}
function UpdateEmbedNode(node, upd){
  node.Current=upd;
  node.Dirty=true;
}
function LinkPrevElement(el, children){
  InsertDoc(el.parentNode, children, el);
}
function CreateDelimitedRunState(ldelim, rdelim, doc){
  return New_3(get_Empty_1(), CreateDelimitedElemNode(ldelim, rdelim, EmptyAttr(), doc));
}
function PerformAnimatedUpdate(childrenOnly, st, doc){
  if(get_UseAnimations()){
    const _1=null;
    return Delay(() => {
      const cur=FindAll(doc);
      const change=ComputeChangeAnim(st, cur);
      const enter=ComputeEnterAnim(st, cur);
      return Bind_1(Play(Append(change, ComputeExitAnim(st, cur))), () => Bind_1(SyncElemNodesNextFrame(childrenOnly, st), () => Bind_1(Play(enter), () => {
        st.PreviousNodes=cur;
        return Return(null);
      })));
    });
  }
  else return SyncElemNodesNextFrame(childrenOnly, st);
}
function PerformSyncUpdate(childrenOnly, st, doc){
  const cur=FindAll(doc);
  SyncElemNode(childrenOnly, st.Top);
  st.PreviousNodes=cur;
}
function CreateElemNode(el, attr_1, children){
  LinkElement(el, children);
  const attr_2=Insert(el, attr_1);
  return DocElemNode.New(attr_2, children, null, el, Int(), GetOptional(attr_2.OnAfterRender));
}
function LinkElement(el, children){
  InsertDoc(el, children, null);
}
function InsertBeforeDelim(afterDelim, doc){
  const p=afterDelim.parentNode;
  const before=globalThis.document.createTextNode("");
  p.insertBefore(before, afterDelim);
  LinkPrevElement(afterDelim, doc);
  return before;
}
function InsertDoc(parent, doc, pos){
  while(true)
    {
      if(doc!=null&&doc.$==1)return InsertNode(parent, doc.$0.El, pos);
      else if(doc!=null&&doc.$==2){
        const d=doc.$0;
        d.Dirty=false;
        doc=d.Current;
      }
      else if(doc==null)return pos;
      else if(doc!=null&&doc.$==4)return InsertNode(parent, doc.$0.Text, pos);
      else if(doc!=null&&doc.$==5)return InsertNode(parent, doc.$0, pos);
      else if(doc!=null&&doc.$==6)return foldBack((_1, _2) =>((((parent_1) =>(el) =>(pos_1) => el==null||el.constructor===Object?InsertDoc(parent_1, el, pos_1):InsertNode(parent_1, el, pos_1))(parent))(_1))(_2), doc.$0.Els, pos);
      else {
        const b=doc.$1;
        const a=doc.$0;
        doc=a;
        pos=InsertDoc(parent, b, pos);
      }
    }
}
function CreateDelimitedElemNode(ldelim, rdelim, attr_1, children){
  const el=ldelim.parentNode;
  LinkPrevElement(rdelim, children);
  const attr_2=Insert(el, attr_1);
  return DocElemNode.New(attr_2, children, Some([ldelim, rdelim]), el, Int(), GetOptional(attr_2.OnAfterRender));
}
function SyncElemNodesNextFrame(childrenOnly, st){
  if(BatchUpdatesEnabled()){
    const c=(ok) => {
      requestAnimationFrame(() => {
        SyncElemNode(childrenOnly, st.Top);
        ok();
      });
    };
    return FromContinuations((_1, _2, _3) => c.apply(null, [_1, _2, _3]));
  }
  else {
    SyncElemNode(childrenOnly, st.Top);
    return Return(null);
  }
}
function ComputeExitAnim(st, cur){
  return Concat(map_2((n) => GetExitAnim(n.Attr), ToArray(Except(cur, Filter((n) => HasExitAnim(n.Attr), st.PreviousNodes)))));
}
function ComputeEnterAnim(st, cur){
  return Concat(map_2((n) => GetEnterAnim(n.Attr), ToArray(Except(st.PreviousNodes, Filter((n) => HasEnterAnim(n.Attr), cur)))));
}
function ComputeChangeAnim(st, cur){
  const f=(n) => HasChangeAnim(n.Attr);
  const relevant=(a) => Filter(f, a);
  return Concat(map_2((n) => GetChangeAnim(n.Attr), ToArray(Intersect(relevant(st.PreviousNodes), relevant(cur)))));
}
function SyncElemNode(childrenOnly, el){
  !childrenOnly?SyncElement(el):void 0;
  Sync_1(el.Children);
  AfterRender(el);
}
function CreateTextNode(){
  return{
    Text:globalThis.document.createTextNode(""), 
    Dirty:false, 
    Value:""
  };
}
function UpdateTextNode(n, t){
  n.Value=t;
  n.Dirty=true;
}
function InsertNode(parent, node, pos){
  InsertAt(parent, pos, node);
  return node;
}
function SyncElement(el){
  function hasDirtyChildren(el_1){
    function dirty(doc){
      while(true)
        {
          if(doc!=null&&doc.$==0){
            const b=doc.$1;
            const a=doc.$0;
            if(dirty(a))return true;
            else doc=b;
          }
          else if(doc!=null&&doc.$==2){
            const d=doc.$0;
            if(d.Dirty)return true;
            else doc=d.Current;
          }
          else if(doc!=null&&doc.$==6){
            const t=doc.$0;
            return t.Dirty||exists_1(hasDirtyChildren, t.Holes);
          }
          else return false;
        }
    }
    return dirty(el_1.Children);
  }
  Sync(el.El, el.Attr);
  if(hasDirtyChildren(el))DoSyncElement(el);
}
function Sync_1(doc){
  while(true)
    {
      if(doc!=null&&doc.$==1)return SyncElemNode(false, doc.$0);
      else if(doc!=null&&doc.$==2){
        const n=doc.$0;
        doc=n.Current;
      }
      else if(doc==null)return null;
      else if(doc!=null&&doc.$==5)return null;
      else if(doc!=null&&doc.$==4){
        const d=doc.$0;
        return d.Dirty?(d.Text.nodeValue=d.Value,d.Dirty=false):null;
      }
      else if(doc!=null&&doc.$==6){
        const t=doc.$0;
        iter_1((h) => {
          SyncElemNode(false, h);
        }, t.Holes);
        iter_1((t_1) => {
          Sync(t_1[0], t_1[1]);
        }, t.Attrs);
        return AfterRender(t);
      }
      else {
        const b=doc.$1;
        const a=doc.$0;
        Sync_1(a);
        doc=b;
      }
    }
}
function AfterRender(el){
  const m=GetOptional(el.Render);
  if(m!=null&&m.$==1){
    m.$0(el.El);
    SetOptional(el, "Render", null);
  }
}
function DoSyncElement(el){
  const parent=el.El;
  function ins(doc, pos){
    while(true)
      {
        if(doc!=null&&doc.$==1)return doc.$0.El;
        else if(doc!=null&&doc.$==2){
          const d=doc.$0;
          if(d.Dirty){
            d.Dirty=false;
            return InsertDoc(parent, d.Current, pos);
          }
          else doc=d.Current;
        }
        else if(doc==null)return pos;
        else if(doc!=null&&doc.$==4)return doc.$0.Text;
        else if(doc!=null&&doc.$==5)return doc.$0;
        else if(doc!=null&&doc.$==6){
          const t=doc.$0;
          if(t.Dirty)t.Dirty=false;
          return foldBack((_2, _3) => _2==null||_2.constructor===Object?ins(_2, _3):_2, t.Els, pos);
        }
        else {
          const b=doc.$1;
          const a=doc.$0;
          doc=a;
          pos=ins(b, pos);
        }
      }
  }
  const p=el.El;
  Iter((e) => {
    RemoveNode(p, e);
  }, Except_2(DocChildren(el), Children(el.El, GetOptional(el.Delimiters))));
  let _1=el.Children;
  const m=GetOptional(el.Delimiters);
  ins(_1, m!=null&&m.$==1?m.$0[1]:null);
}
class HashSet extends Object_1 {
  equals;
  hash;
  data;
  count;
  SAdd(item){
    return this.add(item);
  }
  Contains(item){
    const arr=this.data[this.hash(item)];
    return arr==null?false:this.arrContains(item, arr);
  }
  add(item){
    const h=this.hash(item);
    const arr=this.data[h];
    return arr==null?(this.data[h]=[item],this.count=this.count+1,true):this.arrContains(item, arr)?false:(arr.push(item),this.count=this.count+1,true);
  }
  arrContains(item, arr){
    let c=true;
    let i=0;
    const l=arr.length;
    while(c&&i<l)
      if(this.equals.apply(null, [arr[i], item]))c=false;
      else i=i+1;
    return!c;
  }
  GetEnumerator(){
    return Get(concat_3(this.data));
  }
  ExceptWith(xs){
    const e=Get(xs);
    try {
      while(e.MoveNext())
        this.Remove(e.Current);
    }
    finally {
      if(typeof e=="object"&&isIDisposable(e))e.Dispose();
    }
  }
  get Count(){
    return this.count;
  }
  IntersectWith(xs){
    const other=new HashSet("New_4", xs, this.equals, this.hash);
    const all=concat_3(this.data);
    for(let i=0, _1=all.length-1;i<=_1;i++){
      const item=all[i];
      if(!other.Contains(item))this.Remove(item);
    }
  }
  Remove(item){
    const arr=this.data[this.hash(item)];
    return arr==null?false:this.arrRemove(item, arr)&&(this.count=this.count-1,true);
  }
  CopyTo(arr, index){
    const all=concat_3(this.data);
    for(let i=0, _1=all.length-1;i<=_1;i++)set(arr, i+index, all[i]);
  }
  arrRemove(item, arr){
    let c=true;
    let i=0;
    const l=arr.length;
    while(c&&i<l)
      if(this.equals.apply(null, [arr[i], item])){
        arr.splice(i, 1);
        c=false;
      }
      else i=i+1;
    return!c;
  }
  static New_3(){
    return new this("New_3");
  }
  static New_4(init_3, equals, hash){
    return new this("New_4", init_3, equals, hash);
  }
  static New_2(init_3){
    return new this("New_2", init_3);
  }
  constructor(i, _1, _2, _3){
    if(i=="New_3"){
      i="New_4";
      _1=[];
      _2=Equals;
      _3=Hash;
    }
    let init_3;
    if(i=="New_2"){
      init_3=_1;
      i="New_4";
      _1=init_3;
      _2=Equals;
      _3=Hash;
    }
    if(i=="New_4"){
      const init_4=_1;
      const equals=_2;
      const hash=_3;
      super();
      this.equals=equals;
      this.hash=hash;
      this.data=[];
      this.count=0;
      const e=Get(init_4);
      try {
        while(e.MoveNext())
          this.add(e.Current);
      }
      finally {
        if(typeof e=="object"&&isIDisposable(e))e.Dispose();
      }
    }
  }
}
let _c_2=Lazy((_i) => class TemplateInitializer extends Object_1 {
  static {
    _c_2=_i(this);
  }
  static init;
  id;
  vars;
  static initialized;
  static instances;
  static GetOrAddHoleFor(id, holeName, initHole){
    let o;
    const d=_c_2.GetHolesFor(id);
    const m=(o=null,[d.TryGetValue(holeName, {get:() => o, set:(v) => {
      o=v;
    }}), o]);
    if(m[0])return m[1];
    else {
      const h=initHole();
      d.set_Item(holeName, h);
      return h;
    }
  }
  static GetHolesFor(id){
    let o;
    const m=(o=null,[_c_2.initialized.TryGetValue(id, {get:() => o, set:(v) => {
      o=v;
    }}), o]);
    if(m[0])return m[1];
    else {
      const d=new Dictionary("New_5");
      _c_2.initialized.set_Item(id, d);
      return d;
    }
  }
  static {
    _c_2.initialized=new Dictionary("New_5");
    _c_2.instances=new Dictionary("New_5");
  }
});
class VarStr extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  ForTextView(){
    return Some(this.fillWith.View);
  }
  AddAttribute(addAttr, el){
    (addAttr(el))(Value(this.fillWith));
  }
  get AsChoiceView(){
    return Choice2Of2(Map_1(String, this.fillWith.View));
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class VarFloatUnchecked extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  ForTextView(){
    return Some(Map_1(String, this.fillWith.View));
  }
  AddAttribute(addAttr, el){
    (addAttr(el))(FloatValueUnchecked(this.fillWith));
  }
  get AsChoiceView(){
    return Choice2Of2(Map_1(String, this.fillWith.View));
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class VarBool extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  ForTextView(){
    return Some(Map_1(String, this.fillWith.View));
  }
  AddAttribute(addAttr, el){
    (addAttr(el))(Checked(this.fillWith));
  }
  get AsChoiceView(){
    return Choice2Of2(Map_1(String, this.fillWith.View));
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class VarDateTime extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  ForTextView(){
    return Some(Map_1((v) =>(new Date(v)).toLocaleString(), this.fillWith.View));
  }
  AddAttribute(addAttr, el){
    (addAttr(el))(DateTimeValue(this.fillWith));
  }
  get AsChoiceView(){
    return Choice2Of2(Map_1((v) =>(new Date(v)).toLocaleString(), this.fillWith.View));
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class VarFile extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  ForTextView(){
    return Some(Map_1(String, this.fillWith.View));
  }
  AddAttribute(addAttr, el){
    (addAttr(el))(FileValue(this.fillWith));
  }
  get AsChoiceView(){
    return Choice2Of2(Map_1(String, this.fillWith.View));
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class VarDomElement extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  get Value(){
    return this.fillWith;
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class VarStrList extends TemplateHole {
  name;
  fillWith;
  get Name(){
    return this.name;
  }
  ForTextView(){
    return Some(Map_1((l) => concat_1(",", l), this.fillWith.View));
  }
  AddAttribute(addAttr, el){
    (addAttr(el))(StringListValue(this.fillWith));
  }
  get AsChoiceView(){
    return Choice2Of2(Map_1(String, this.fillWith.View));
  }
  constructor(name, fillWith){
    super();
    this.name=name;
    this.fillWith=fillWith;
  }
}
class Exception extends Object_1 { }
function LoadLocalTemplates(baseName){
  !LocalTemplatesLoaded()?(set_LocalTemplatesLoaded(true),LoadNestedTemplates(globalThis.document.body, "")):void 0;
  LoadedTemplates().set_Item(baseName, LoadedTemplateFile(""));
}
function NamedTemplate(baseName, name, fillWith){
  let o;
  const m=(o=null,[LoadedTemplateFile(baseName).TryGetValue(name==null?"":name.$0, {get:() => o, set:(v) => {
    o=v;
  }}), o]);
  return m[0]?ChildrenTemplate(m[1].cloneNode(true), fillWith):(console.warn("Local template doesn't exist", name),Doc.Empty);
}
function LocalTemplatesLoaded(){
  return _c_6.LocalTemplatesLoaded;
}
function set_LocalTemplatesLoaded(_1){
  _c_6.LocalTemplatesLoaded=_1;
}
function LoadNestedTemplates(root, baseName){
  const loadedTpls=LoadedTemplateFile(baseName);
  const rawTpls=new Dictionary("New_5");
  const wsTemplates=root.querySelectorAll("[ws-template]");
  for(let i=0, _1=wsTemplates.length-1;i<=_1;i++){
    const node=wsTemplates[i];
    const name=node.getAttribute("ws-template").toLowerCase();
    node.removeAttribute("ws-template");
    rawTpls.set_Item(name, FakeRootSingle(node));
  }
  const wsChildrenTemplates=root.querySelectorAll("[ws-children-template]");
  for(let i_1=0, _2=wsChildrenTemplates.length-1;i_1<=_2;i_1++){
    const node_1=wsChildrenTemplates[i_1];
    const name_1=node_1.getAttribute("ws-children-template").toLowerCase();
    node_1.removeAttribute("ws-children-template");
    rawTpls.set_Item(name_1, FakeRoot(node_1));
  }
  const html5TemplateBasedTemplates=root.querySelectorAll("template[id]");
  for(let i_2=0, _3=html5TemplateBasedTemplates.length-1;i_2<=_3;i_2++){
    const node_2=html5TemplateBasedTemplates[i_2];
    rawTpls.set_Item(node_2.getAttribute("id").toLowerCase(), FakeRootFromHTMLTemplate(node_2));
  }
  const html5TemplateBasedTemplates_1=root.querySelectorAll("template[name]");
  for(let i_3=0, _4=html5TemplateBasedTemplates_1.length-1;i_3<=_4;i_3++){
    const node_3=html5TemplateBasedTemplates_1[i_3];
    rawTpls.set_Item(node_3.getAttribute("name").toLowerCase(), FakeRootFromHTMLTemplate(node_3));
  }
  const instantiated=new HashSet("New_3");
  function prepareTemplate(name_2){
    if(!loadedTpls.ContainsKey(name_2)){
      let o;
      const m=(o=null,[rawTpls.TryGetValue(name_2, {get:() => o, set:(v) => {
        o=v;
      }}), o]);
      if(m[0]){
        instantiated.SAdd(name_2);
        rawTpls.RemoveKey(name_2);
        PrepareTemplateStrict(baseName, Some(name_2), m[1], Some(prepareTemplate));
      }
      else console.warn(instantiated.Contains(name_2)?"Encountered loop when instantiating "+name_2:"Local template does not exist: "+name_2);
    }
  }
  while(rawTpls.count>0)
    prepareTemplate(head_1(rawTpls.Keys));
}
function LoadedTemplates(){
  return _c_6.LoadedTemplates;
}
function LoadedTemplateFile(name){
  let o;
  const m=(o=null,[LoadedTemplates().TryGetValue(name, {get:() => o, set:(v) => {
    o=v;
  }}), o]);
  if(m[0])return m[1];
  else {
    const d=new Dictionary("New_5");
    LoadedTemplates().set_Item(name, d);
    return d;
  }
}
function ChildrenTemplate(el, fillWith){
  let _1;
  const p=InlineTemplate(el, append(fillWith, GlobalHoles().Values));
  const updates=p[1];
  const docTreeNode=p[0];
  const m=docTreeNode.Els;
  return!Equals(m, null)&&m.length===1&&(get(m, 0)instanceof Node&&(Equals(get(m, 0).nodeType, Node.ELEMENT_NODE)&&(_1=get(m, 0),true)))?Elt_1.TreeNode(docTreeNode, updates):Doc.Mk(TreeDoc(docTreeNode), updates);
}
function FakeRootSingle(el){
  el.removeAttribute("ws-template");
  const m=el.getAttribute("ws-replace");
  if(m==null){ }
  else {
    el.removeAttribute("ws-replace");
    const m_1=el.parentNode;
    if(Equals(m_1, null)){ }
    else {
      const n=globalThis.document.createElement(el.tagName);
      n.setAttribute("ws-replace", m);
      m_1.replaceChild(n, el);
    }
  }
  const fakeroot=globalThis.document.createElement("div");
  fakeroot.appendChild(el);
  return fakeroot;
}
function FakeRoot(parent){
  const fakeroot=globalThis.document.createElement("div");
  while(parent.hasChildNodes())
    fakeroot.appendChild(parent.firstChild);
  return fakeroot;
}
function FakeRootFromHTMLTemplate(parent){
  const fakeroot=globalThis.document.createElement("div");
  const content=parent.content;
  for(let i=0, _1=content.childNodes.length-1;i<=_1;i++)fakeroot.appendChild(content.childNodes[i].cloneNode(true));
  return fakeroot;
}
function PrepareTemplateStrict(baseName, name, fakeroot, prepareLocalTemplate){
  const processedHTML5Templates=new HashSet("New_3");
  function recF(recI, _1){
    while(true)
      switch(recI){
        case 0:
          if(_1!==null){
            const next=_1.nextSibling;
            if(Equals(_1.nodeType, Node.TEXT_NODE))convertTextNode(_1);
            else if(Equals(_1.nodeType, Node.ELEMENT_NODE))convertElement(_1);
            _1=next;
          }
          else return null;
          break;
        case 1:
          const name_2=string(_1.nodeName, Some(3), null).toLowerCase();
          const m=name_2.indexOf(".");
          const p=m===-1?[baseName, name_2]:[string(name_2, null, Some(m-1)), string(name_2, Some(m+1), null)];
          const instName=p[1];
          const instBaseName=p[0];
          if(instBaseName!=""&&!LoadedTemplates().ContainsKey(instBaseName))return failNotLoaded(instName);
          else {
            if(instBaseName==""&&prepareLocalTemplate!=null)prepareLocalTemplate.$0(instName);
            const d=LoadedTemplates().Item(instBaseName);
            if(!d.ContainsKey(instName))return failNotLoaded(instName);
            else {
              const t=d.Item(instName);
              const instance=t.cloneNode(true);
              const usedHoles=new HashSet("New_3");
              const mappings=new Dictionary("New_5");
              const attrs=_1.attributes;
              for(let i=0, _4=attrs.length-1;i<=_4;i++){
                const name_3=attrs.item(i).name.toLowerCase();
                const m_1=attrs.item(i).nodeValue;
                let _2=m_1==""?name_3:m_1.toLowerCase();
                mappings.set_Item(name_3, _2);
                if(!usedHoles.SAdd(name_3))console.warn("Hole mapped twice", name_3);
              }
              for(let i_1=0, _5=_1.childNodes.length-1;i_1<=_5;i_1++){
                const n=_1.childNodes[i_1];
                if(Equals(n.nodeType, Node.ELEMENT_NODE))if(!usedHoles.SAdd(n.nodeName.toLowerCase()))console.warn("Hole filled twice", instName);
              }
              const singleTextFill=_1.childNodes.length===1&&Equals(_1.firstChild.nodeType, Node.TEXT_NODE);
              if(singleTextFill){
                const x=fillTextHole(instance, _1.firstChild.textContent, instName);
                const f=((usedHoles_1) =>(i_2) => usedHoles_1.SAdd(i_2))(usedHoles);
                let _3=((a) =>(o) => {
                  if(o!=null)a(o.$0);
                })((x_1) => {
                  f(x_1);
                });
                _3(x);
              }
              removeHolesExcept(instance, usedHoles);
              if(!singleTextFill){
                for(let i_2=0, _6=_1.childNodes.length-1;i_2<=_6;i_2++){
                  const n_1=_1.childNodes[i_2];
                  if(Equals(n_1.nodeType, Node.ELEMENT_NODE))if(n_1.hasAttributes())fillInstanceAttrs(instance, n_1);
                  else fillDocHole(instance, n_1);
                }
              }
              mapHoles(instance, mappings);
              fill(instance, _1.parentNode, _1);
              _1.parentNode.removeChild(_1);
              return;
            }
          }
          break;
      }
  }
  function fillDocHole(instance, fillWith){
    const name_2=fillWith.nodeName.toLowerCase();
    const fillHole=(p, n) => {
      if(name_2=="title"&&fillWith.hasChildNodes()){
        const parsed=ParseHTMLIntoFakeRoot(fillWith.textContent);
        fillWith.removeChild(fillWith.firstChild);
        while(parsed.hasChildNodes())
          fillWith.appendChild(parsed.firstChild);
      }
      convertElement(fillWith);
      return fill(fillWith, p, n);
    };
    foreachNotPreserved(instance, "[ws-attr-holes]", (e) => {
      const holeAttrs=SplitChars(e.getAttribute("ws-attr-holes"), [" "], 1);
      for(let i=0, _2=holeAttrs.length-1;i<=_2;i++){
        const attrName=get(holeAttrs, i);
        let this_1=new RegExp("\\${"+name_2+"}", "ig");
        let _1=e.getAttribute(attrName).replace(this_1, fillWith.textContent);
        e.setAttribute(attrName, _1);
      }
    });
    const m=instance.querySelector("[ws-hole="+name_2+"]");
    if(Equals(m, null)){
      const m_1=instance.querySelector("[ws-replace="+name_2+"]");
      if(Equals(m_1, null)){
        const m_2=instance.querySelector("slot[name="+name_2+"]");
        return instance.tagName.toLowerCase()=="template"?(fillHole(m_2.parentNode, m_2),void m_2.parentNode.removeChild(m_2)):null;
      }
      else {
        fillHole(m_1.parentNode, m_1);
        m_1.parentNode.removeChild(m_1);
        return;
      }
    }
    else {
      while(m.hasChildNodes())
        m.removeChild(m.lastChild);
      m.removeAttribute("ws-hole");
      return fillHole(m, null);
    }
  }
  function convertElement(el){
    if(!el.hasAttribute("ws-preserve"))if(StartsWith(el.nodeName.toLowerCase(), "ws-"))convertInstantiation(el);
    else {
      convertAttrs(el);
      convertNodeAndSiblings(el.firstChild);
    }
  }
  function convertNodeAndSiblings(n){
    return recF(0, n);
  }
  function convertInstantiation(el){
    return recF(1, el);
  }
  function convertNestedTemplates(el){
    while(true)
      {
        const m=el.querySelector("[ws-template]");
        if(Equals(m, null)){
          const m_1=el.querySelector("[ws-children-template]");
          if(Equals(m_1, null)){
            const idTemplates=el.querySelectorAll("template[id]");
            for(let i=1, _1=idTemplates.length-1;i<=_1;i++){
              const n=idTemplates[i];
              if(processedHTML5Templates.Contains(n)){ }
              else {
                PrepareTemplateStrict(baseName, Some(n.getAttribute("id")), n, null);
                processedHTML5Templates.SAdd(n);
              }
            }
            const nameTemplates=el.querySelectorAll("template[name]");
            for(let i_1=1, _2=nameTemplates.length-1;i_1<=_2;i_1++){
              const n_1=nameTemplates[i_1];
              if(processedHTML5Templates.Contains(n_1)){ }
              else {
                PrepareTemplateStrict(baseName, Some(n_1.getAttribute("name")), n_1, null);
                processedHTML5Templates.SAdd(n_1);
              }
            }
            return null;
          }
          else {
            const name_2=m_1.getAttribute("ws-children-template");
            m_1.removeAttribute("ws-children-template");
            PrepareTemplateStrict(baseName, Some(name_2), m_1, null);
            el=el;
          }
        }
        else {
          const name_3=m.getAttribute("ws-template");
          (PrepareSingleTemplate(baseName, Some(name_3), m))(null);
          el=el;
        }
      }
  }
  const name_1=(name==null?"":name.$0).toLowerCase();
  LoadedTemplateFile(baseName).set_Item(name_1, fakeroot);
  if(fakeroot.hasChildNodes()){
    convertNestedTemplates(fakeroot);
    convertNodeAndSiblings(fakeroot.firstChild);
  }
}
function InlineTemplate(el, fillWith){
  let _1;
  const holes=[];
  const updates=[];
  const attrs=[];
  const afterRender=[];
  const fw=new Dictionary("New_5");
  const e=Get(fillWith);
  try {
    while(e.MoveNext())
      {
        const x=e.Current;
        fw.set_Item(x.Name, x);
      }
  }
  finally {
    if(typeof e=="object"&&isIDisposable(e))e.Dispose();
  }
  let els=ChildrenArray(el);
  const addAttr=(el_1, attr_1) => {
    const attr_2=Insert(el_1, attr_1);
    updates.push(Updates(attr_2));
    attrs.push([el_1, attr_2]);
    const m=GetOptional(attr_2.OnAfterRender);
    if(m==null)return null;
    else {
      const f=m.$0;
      afterRender.push(() => {
        f(el_1);
      });
      return;
    }
  };
  const tryGetAsDoc=(name) => {
    let o;
    const m=(o=null,[fw.TryGetValue(name, {get:() => o, set:(v) => {
      o=v;
    }}), o]);
    if(m[0]){
      const th=m[1];
      if(th instanceof Elt)return Some(th.Value);
      else if(th instanceof Text)return Some(Doc.TextNode(th.Value));
      else {
        const o_1=th.ForTextView();
        return o_1==null?null:Some(Doc.TextView(o_1.$0));
      }
    }
    else return null;
  };
  foreachNotPreserved(el, "[ws-hole]", (p) => {
    const name=p.getAttribute("ws-hole");
    p.removeAttribute("ws-hole");
    while(p.hasChildNodes())
      p.removeChild(p.lastChild);
    const m=tryGetAsDoc(name);
    if(m!=null&&m.$==1){
      const doc=m.$0;
      LinkElement(p, doc.docNode);
      holes.push(DocElemNode.New(Empty(p), doc.docNode, null, p, Int(), null));
      updates.push(doc.updates);
    }
  });
  foreachNotPreserved(el, "[ws-replace]", (e_1) => {
    const m=tryGetAsDoc(e_1.getAttribute("ws-replace"));
    if(m!=null&&m.$==1){
      const doc=m.$0;
      const p=e_1.parentNode;
      const after=globalThis.document.createTextNode("");
      p.replaceChild(after, e_1);
      const before=InsertBeforeDelim(after, doc.docNode);
      els=ChildrenArray(el);
      const o=tryFindIndex((y) => e_1===y, els);
      if(o==null){ }
      else set(els, o.$0, doc.docNode);
      holes.push(DocElemNode.New(Empty(p), doc.docNode, Some([before, after]), p, Int(), null));
      updates.push(doc.updates);
    }
  });
  let isDefaultSlotProcessed=false;
  foreachNotPreserved(el, "slot", (p) => {
    const name=p.getAttribute("name");
    const name_1=name==""||name==null?"default":name.toLowerCase();
    if(isDefaultSlotProcessed&&name_1=="default"||!Equals(el.parentElement, null)){ }
    else {
      while(p.hasChildNodes())
        p.removeChild(p.lastChild);
      if(name_1=="default")isDefaultSlotProcessed=true;
      const m=tryGetAsDoc(name_1);
      if(m!=null&&m.$==1){
        const doc=m.$0;
        LinkElement(p, doc.docNode);
        holes.push(DocElemNode.New(Empty(p), doc.docNode, null, p, Int(), null));
        updates.push(doc.updates);
      }
    }
  });
  foreachNotPreserved(el, "[ws-attr]", (e_1) => {
    let o;
    const name=e_1.getAttribute("ws-attr");
    e_1.removeAttribute("ws-attr");
    const m=(o=null,[fw.TryGetValue(name, {get:() => o, set:(v) => {
      o=v;
    }}), o]);
    if(m[0]){
      const th=m[1];
      if(th instanceof Attribute)addAttr(e_1, th.Value);
      else console.warn("Attribute hole filled with non-attribute data", name);
    }
  });
  foreachNotPreserved(el, "[ws-on]", (e_1) => {
    addAttr(e_1, Attr.Concat(choose((x_1) => {
      let o;
      const a=SplitChars(x_1, [":"], 1);
      const m=(o=null,[fw.TryGetValue(get(a, 1), {get:() => o, set:(v) => {
        o=v;
      }}), o]);
      if(m[0]){
        const th=m[1];
        return th instanceof Event?Some(Handler(get(a, 0), th.Value)):th instanceof EventQ?Some(Attr.Handler(get(a, 0), th.Value)):(console.warn("Event hole on"+get(a, 0)+" filled with non-event data", get(a, 1)),null);
      }
      else return null;
    }, SplitChars(e_1.getAttribute("ws-on"), [" "], 1))));
    e_1.removeAttribute("ws-on");
  });
  foreachNotPreserved(el, "[ws-onafterrender]", (e_1) => {
    let o;
    const name=e_1.getAttribute("ws-onafterrender");
    const m=(o=null,[fw.TryGetValue(name, {get:() => o, set:(v) => {
      o=v;
    }}), o]);
    if(m[0]){
      const th=m[1];
      if(th instanceof AfterRender_1){
        e_1.removeAttribute("ws-onafterrender");
        addAttr(e_1, OnAfterRender(th.Value));
      }
      else if(th instanceof AfterRenderQ){
        e_1.removeAttribute("ws-onafterrender");
        addAttr(e_1, OnAfterRender(th.Value));
      }
      else console.warn("onafterrender hole filled with non-onafterrender data", name);
    }
  });
  foreachNotPreserved(el, "[ws-var]", (e_1) => {
    let o;
    const name=e_1.getAttribute("ws-var");
    e_1.removeAttribute("ws-var");
    const m=(o=null,[fw.TryGetValue(name, {get:() => o, set:(v) => {
      o=v;
    }}), o]);
    if(m[0])m[1].AddAttribute((_7) =>(_8) => addAttr(_7, _8), e_1);
  });
  const wsdomHandling=() => {
    foreachNotPreservedwsDOM("[ws-dom]", (e_1) => {
      let o;
      let toWatch;
      let r;
      const m=(o=null,[fw.TryGetValue(e_1.getAttribute("ws-dom").toLowerCase(), {get:() => o, set:(v) => {
        o=v;
      }}), o]);
      if(m[0]){
        const th=m[1];
        if(th instanceof VarDomElement){
          const var_1=th.Value;
          e_1.removeAttribute("ws-dom");
          toWatch=e_1;
          const mo=new MutationObserver((_7, mo_1) => {
            iter_1((mr) => {
              mr.removedNodes.forEach(CreateFuncWithArgs((_8) => _8[0]===toWatch&&mr.addedNodes.length!==1?(var_1.SetFinal(null),mo_1.disconnect()):null), null);
            }, _7);
          });
          if(e_1.parentElement!==null)mo.observe(e_1.parentElement, (r={},r.childList=true,r));
          var_1.Set(Some(e_1));
          Sink((nel) => {
            if(nel!=null&&nel.$==1){
              const nel_1=nel.$0;
              if(toWatch===nel_1){ }
              else {
                toWatch.replaceWith(nel_1);
                toWatch=nel_1;
              }
            }
            else {
              toWatch.remove();
              mo.disconnect();
            }
          }, var_1.View);
        }
      }
    });
  };
  foreachNotPreserved(el, "[ws-attr-holes]", (e_1) => {
    const re=new RegExp(TextHoleRE(), "g");
    const holeAttrs=SplitChars(e_1.getAttribute("ws-attr-holes"), [" "], 1);
    e_1.removeAttribute("ws-attr-holes");
    for(let i=0, _7=holeAttrs.length-1;i<=_7;i++)((() => {
      let _8;
      const attrName=get(holeAttrs, i);
      const s=e_1.getAttribute(attrName);
      let m=null;
      let lastIndex=0;
      const res=[];
      while(m=re.exec(s),m!==null)
        {
          const textBefore=string(s, Some(lastIndex), Some(re.lastIndex-get(m, 0).length-1));
          lastIndex=re.lastIndex;
          res.push([textBefore, get(m, 1)]);
        }
      const finalText=string(s, Some(lastIndex), null);
      re.lastIndex=0;
      const value=foldBack((_9, _10) =>(((t) => {
        const textBefore_1=t[0];
        const holeName=t[1];
        return(t_1) => {
          let o;
          const textAfter=t_1[0];
          const views=t_1[1];
          const m_1=(o=null,[fw.TryGetValue(holeName, {get:() => o, set:(v) => {
            o=v;
          }}), o]);
          const holeContent=m_1[0]?m_1[1].AsChoiceView:Choice1Of2("");
          return holeContent.$==1?[textBefore_1, FSharpList.Cons(textAfter==""?holeContent.$0:Map_1((s_5) => s_5+textAfter, holeContent.$0), views)]:[textBefore_1+holeContent.$0+textAfter, views];
        };
      })(_9))(_10), res, [finalText, FSharpList.Empty]);
      if(value[1].$==1){
        if(value[1].$1.$==1){
          if(value[1].$1.$1.$==1){
            if(value[1].$1.$1.$1.$==0){
              const s_1=value[0];
              _8=Dynamic(attrName, Map3_1((_9, _10, _11) => s_1+_9+_10+_11, value[1].$0, value[1].$1.$0, value[1].$1.$1.$0));
            }
            else {
              const s_2=value[0];
              _8=Dynamic(attrName, Map_1((vs) => s_2+concat_1("", vs), Sequence_1(value[1])));
            }
          }
          else {
            const s_3=value[0];
            _8=Dynamic(attrName, Map2_1((_9, _10) => s_3+_9+_10, value[1].$0, value[1].$1.$0));
          }
        }
        else if(value[0]=="")_8=Dynamic(attrName, value[1].$0);
        else {
          const s_4=value[0];
          _8=Dynamic(attrName, Map_1((v) => s_4+v, value[1].$0));
        }
      }
      else _8=Attr.Create(attrName, value[0]);
      return addAttr(e_1, _8);
    })());
  });
  let _2=els;
  const _3=afterRender.length==0?Some(() => {
    wsdomHandling();
  }):Some((el_1) => {
    wsdomHandling();
    iter_1((f) => {
      f(el_1);
    }, afterRender);
  });
  const _4=!Equals(els, null)&&els.length===1&&(get(els, 0)instanceof Node&&(get(els, 0)instanceof Element&&(_1=get(els, 0),true)))?Some(_1):null;
  let _5={
    Els:_2, 
    Dirty:true, 
    Holes:holes, 
    Attrs:attrs, 
    Render:_3?_3.$0:void 0, 
    El:_4?_4.$0:void 0
  };
  let _6=DeleteEmptyFields(_5, ["Render", "El"]);
  return[_6, TreeReduce(Const(), Map2Unit_1, updates)];
}
function GlobalHoles(){
  return _c_6.GlobalHoles;
}
function foreachNotPreserved(root, selector, f){
  IterSelector(root, selector, (p) => {
    if(p.closest("[ws-preserve]")==null)f(p);
  });
}
function PrepareSingleTemplate(baseName, name, el){
  const root=FakeRootSingle(el);
  return(p) => {
    PrepareTemplateStrict(baseName, name, root, p);
  };
}
function foreachNotPreservedwsDOM(selector, f){
  IterSelectorDoc(selector, (p) => {
    if(p.closest("[ws-preserve]")==null)f(p);
  });
}
function TextHoleRE(){
  return _c_6.TextHoleRE;
}
function Obsolete(sn){
  let _1;
  const m=sn.s;
  if(m==null||(m!=null&&m.$==2?(_1=m.$1,false):m!=null&&m.$==3?(_1=m.$1,false):true))void 0;
  else {
    sn.s=null;
    for(let i=0, _2=length_1(_1)-1;i<=_2;i++){
      const o=get(_1, i);
      if(typeof o=="object")(((sn_1) => {
        Obsolete(sn_1);
      })(o));
      else o();
    }
  }
}
function TryParse(s, r){
  return TryParse_2(s, -2147483648, 2147483647, r);
}
class DocElemNode {
  Attr;
  Children;
  Delimiters;
  El;
  ElKey;
  Render;
  Equals(o){
    return this.ElKey===o.ElKey;
  }
  GetHashCode(){
    return this.ElKey;
  }
  static New(Attr_1, Children_1, Delimiters, El, ElKey, Render){
    const _1={
      Attr:Attr_1, 
      Children:Children_1, 
      El:El, 
      ElKey:ElKey
    };
    let _2=(SetOptional(_1, "Delimiters", Delimiters),SetOptional(_1, "Render", Render),_1);
    return Create_1(DocElemNode, _2);
  }
}
class Scheduler extends Object_1 {
  idle;
  robin;
  Fork(action){
    this.robin.push(action);
    this.idle?(this.idle=false,setTimeout(() => {
      this.tick();
    }, 0)):void 0;
  }
  tick(){
    const t=Date.now();
    let loop=true;
    while(loop)
      if(this.robin.length===0){
        this.idle=true;
        loop=false;
      }
      else {
        (this.robin.shift())();
        Date.now()-t>40?(setTimeout(() => {
          this.tick();
        }, 0),loop=false):void 0;
      }
  }
  constructor(){
    super();
    this.idle=true;
    this.robin=[];
  }
}
class CancellationTokenSource extends Object_1 {
  init;
  c;
  pending;
  r;
  constructor(){
    super();
    this.c=false;
    this.pending=null;
    this.r=[];
    this.init=1;
  }
}
function StringApply(){
  return _c_5.StringApply;
}
function ApplyValue(get_1, set_1, var_1){
  let expectedValue;
  expectedValue=null;
  return[(el) => {
    const onChange=() => {
      var_1.UpdateMaybe((v) => {
        let _1;
        expectedValue=get_1(el);
        return expectedValue!=null&&expectedValue.$==1&&(!Equals(expectedValue.$0, v)&&(_1=[expectedValue, expectedValue.$0],true))?_1[0]:null;
      });
    };
    el.addEventListener("change", onChange);
    el.addEventListener("input", onChange);
    el.addEventListener("keypress", onChange);
  }, (x) => {
    const _1=set_1(x);
    return(_2) => _2==null?null:_1(_2.$0);
  }, Map_1((v) => {
    let _1;
    return expectedValue!=null&&expectedValue.$==1&&(Equals(expectedValue.$0, v)&&(_1=expectedValue.$0,true))?null:Some(v);
  }, var_1.View)];
}
function StringSet(){
  return _c_5.StringSet;
}
function StringGet(){
  return _c_5.StringGet;
}
function StringListSet(){
  return _c_5.StringListSet;
}
function StringListGet(){
  return _c_5.StringListGet;
}
function DateTimeSetUnchecked(){
  return _c_5.DateTimeSetUnchecked;
}
function DateTimeGetUnchecked(){
  return _c_5.DateTimeGetUnchecked;
}
function FileApplyValue(get_1, set_1, var_1){
  let expectedValue;
  expectedValue=null;
  return[(el) => {
    el.addEventListener("change", () => {
      var_1.UpdateMaybe((v) => {
        let _1;
        expectedValue=get_1(el);
        return expectedValue!=null&&expectedValue.$==1&&(expectedValue.$0!==v&&(_1=[expectedValue, expectedValue.$0],true))?_1[0]:null;
      });
    });
  }, (x) => {
    const _1=set_1(x);
    return(_2) => _2==null?null:_1(_2.$0);
  }, Map_1((v) => {
    let _1;
    return expectedValue!=null&&expectedValue.$==1&&(Equals(expectedValue.$0, v)&&(_1=expectedValue.$0,true))?null:Some(v);
  }, var_1.View)];
}
function FileSetUnchecked(){
  return _c_5.FileSetUnchecked;
}
function FileGetUnchecked(){
  return _c_5.FileGetUnchecked;
}
function IntSetUnchecked(){
  return _c_5.IntSetUnchecked;
}
function IntGetUnchecked(){
  return _c_5.IntGetUnchecked;
}
function IntSetChecked(){
  return _c_5.IntSetChecked;
}
function IntGetChecked(){
  return _c_5.IntGetChecked;
}
function FloatSetUnchecked(){
  return _c_5.FloatSetUnchecked;
}
function FloatGetUnchecked(){
  return _c_5.FloatGetUnchecked;
}
function FloatSetChecked(){
  return _c_5.FloatSetChecked;
}
function FloatGetChecked(){
  return _c_5.FloatGetChecked;
}
function FloatApplyUnchecked(){
  return _c_5.FloatApplyUnchecked;
}
function BoolCheckedApply(){
  return _c_5.BoolCheckedApply;
}
function DateTimeApplyUnchecked(){
  return _c_5.DateTimeApplyUnchecked;
}
function FileApplyUnchecked(){
  return _c_5.FileApplyUnchecked;
}
function StringListApply(){
  return _c_5.StringListApply;
}
let _c_3=Lazy((_i) => class Pervasives {
  static {
    _c_3=_i(this);
  }
  static longMonths;
  static shortMonths;
  static longDays;
  static shortDays;
  static {
    this.shortDays=ofArray(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    this.longDays=ofArray(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
    this.shortMonths=ofArray(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    this.longMonths=ofArray(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
  }
});
class OperationCanceledException extends Error {
  ct;
  static New(ct){
    return new this("New", ct);
  }
  static New_1(message, inner, ct){
    return new this("New_1", message, inner, ct);
  }
  constructor(i, _1, _2, _3){
    let ct;
    if(i=="New"){
      ct=_1;
      i="New_1";
      _1="The operation was canceled.";
      _2=null;
      _3=ct;
    }
    if(i=="New_1"){
      const message=_1;
      const inner=_2;
      const ct_1=_3;
      super(message);
      this.inner=inner;
      this.ct=ct_1;
    }
  }
}
function notPresent(){
  throw new KeyNotFoundException("New");
}
let _c_4=Lazy((_i) => class $StartupCode_Abbrev {
  static {
    _c_4=_i(this);
  }
  static counter;
  static {
    this.counter=0;
  }
});
function New_2(DynElem, DynFlags, DynNodes, OnAfterRender_1){
  const _1={
    DynElem:DynElem, 
    DynFlags:DynFlags, 
    DynNodes:DynNodes
  };
  SetOptional(_1, "OnAfterRender", OnAfterRender_1);
  return _1;
}
class Elt_1 extends Doc {
  docNode_1;
  updates_1;
  elt;
  rvUpdates;
  static New(el, attr_1, children){
    const node=CreateElemNode(el, attr_1, children.docNode);
    const rvUpdates=Updates_1.Create(children.updates);
    return new Elt_1(ElemDoc(node), Map2Unit_1(Updates(node.Attr), rvUpdates.v), el, rvUpdates);
  }
  static TreeNode(tree, updates){
    const rvUpdates=Updates_1.Create(updates);
    const x=map_2((_3) => Updates(_3[1]), tree.Attrs);
    let _1=TreeReduce(Const(), Map2Unit_1, x);
    let _2=Map2Unit_1(_1, rvUpdates.v);
    return new Elt_1(TreeDoc(tree), _2, get(tree.Els, 0), rvUpdates);
  }
  constructor(docNode, updates, elt, rvUpdates){
    super(docNode, updates);
    this.docNode_1=docNode;
    this.updates_1=updates;
    this.elt=elt;
    this.rvUpdates=rvUpdates;
  }
}
let _c_5=Lazy((_i) => class Client {
  static {
    _c_5=_i(this);
  }
  static FloatApplyChecked;
  static FloatGetChecked;
  static FloatSetChecked;
  static FloatApplyUnchecked;
  static FloatGetUnchecked;
  static FloatSetUnchecked;
  static IntApplyChecked;
  static IntGetChecked;
  static IntSetChecked;
  static IntApplyUnchecked;
  static IntGetUnchecked;
  static IntSetUnchecked;
  static FileApplyUnchecked;
  static FileGetUnchecked;
  static FileSetUnchecked;
  static DateTimeApplyUnchecked;
  static DateTimeGetUnchecked;
  static DateTimeSetUnchecked;
  static StringListApply;
  static StringListGet;
  static StringListSet;
  static StringApply;
  static StringGet;
  static StringSet;
  static BoolCheckedApply;
  static EmptyAttr;
  static {
    this.EmptyAttr=null;
    this.BoolCheckedApply=(var_1) =>[(el) => {
      el.addEventListener("change", () => var_1.Get()!=el.checked?var_1.Set(el.checked):null);
    }, (_1) =>(_2) => _2!=null&&_2.$==1?void(_1.checked=_2.$0):null, Map_1(Some, var_1.View)];
    this.StringSet=(el) =>(s_8) => {
      el.value=s_8;
    };
    this.StringGet=(el) => Some(el.value);
    const g=StringGet();
    const s=StringSet();
    this.StringApply=(v) => ApplyValue(g, s, v);
    this.StringListSet=(el) =>(s_8) => {
      const options_=el.options;
      for(let i=0, _1=options_.length-1;i<=_1;i++)((() => {
        const option=options_.item(i);
        option.selected=arrContains(option.value, s_8);
      })());
    };
    this.StringListGet=(el) => {
      const selectedOptions=el.selectedOptions;
      return Some(ofSeq_1(delay(() => collect((i) =>[selectedOptions.item(i).value], range(0, selectedOptions.length-1)))));
    };
    const g_1=StringListGet();
    const s_1=StringListSet();
    this.StringListApply=(v) => ApplyValue(g_1, s_1, v);
    this.DateTimeSetUnchecked=(el) =>(i) => {
      el.value=(new Date(i)).toLocaleString();
    };
    this.DateTimeGetUnchecked=(el) => {
      let o;
      let m;
      const s_8=el.value;
      if(isBlank(s_8))return Some(-8640000000000000);
      else {
        o=0;
        const m_1=TryParse_1(s_8);
        let _1=m_1!=null&&m_1.$==1&&(o=m_1.$0,true);
        m=[_1, o];
        return m[0]?Some(m[1]):null;
      }
    };
    const g_2=DateTimeGetUnchecked();
    const s_2=DateTimeSetUnchecked();
    this.DateTimeApplyUnchecked=(v) => ApplyValue(g_2, s_2, v);
    this.FileSetUnchecked=() =>() => null;
    this.FileGetUnchecked=(el) => {
      const files=el.files;
      return Some(ofSeq_1(delay(() => map_1((i) => files.item(i), range(0, files.length-1)))));
    };
    const g_3=FileGetUnchecked();
    const s_3=FileSetUnchecked();
    this.FileApplyUnchecked=(v) => FileApplyValue(g_3, s_3, v);
    this.IntSetUnchecked=(el) =>(i) => {
      el.value=String(i);
    };
    this.IntGetUnchecked=(el) => {
      const s_8=el.value;
      if(isBlank(s_8))return Some(0);
      else {
        const pd=+s_8;
        return pd!==pd>>0?null:Some(pd);
      }
    };
    const g_4=IntGetUnchecked();
    const s_4=IntSetUnchecked();
    this.IntApplyUnchecked=(v) => ApplyValue(g_4, s_4, v);
    this.IntSetChecked=(el) =>(i) => {
      const i_1=i.Input;
      return el.value!=i_1?void(el.value=i_1):null;
    };
    this.IntGetChecked=(el) => {
      let _1;
      let o;
      const s_8=el.value;
      if(isBlank(s_8))_1=(el.checkValidity?el.checkValidity():true)?CheckedInput.Blank(s_8):CheckedInput.Invalid(s_8);
      else {
        const m=(o=0,[TryParse(s_8, {get:() => o, set:(v) => {
          o=v;
        }}), o]);
        _1=m[0]?CheckedInput.Valid(m[1], s_8):CheckedInput.Invalid(s_8);
      }
      return Some(_1);
    };
    const g_5=IntGetChecked();
    const s_5=IntSetChecked();
    this.IntApplyChecked=(v) => ApplyValue(g_5, s_5, v);
    this.FloatSetUnchecked=(el) =>(i) => {
      el.value=String(i);
    };
    this.FloatGetUnchecked=(el) => {
      const s_8=el.value;
      if(isBlank(s_8))return Some(0);
      else {
        const pd=+s_8;
        return isNaN(pd)?null:Some(pd);
      }
    };
    const g_6=FloatGetUnchecked();
    const s_6=FloatSetUnchecked();
    this.FloatApplyUnchecked=(v) => ApplyValue(g_6, s_6, v);
    this.FloatSetChecked=(el) =>(i) => {
      const i_1=i.Input;
      return el.value!=i_1?void(el.value=i_1):null;
    };
    this.FloatGetChecked=(el) => {
      let _1;
      const s_8=el.value;
      if(isBlank(s_8))_1=(el.checkValidity?el.checkValidity():true)?CheckedInput.Blank(s_8):CheckedInput.Invalid(s_8);
      else {
        const i=+s_8;
        _1=isNaN(i)?CheckedInput.Invalid(s_8):CheckedInput.Valid(i, s_8);
      }
      return Some(_1);
    };
    const g_7=FloatGetChecked();
    const s_7=FloatSetChecked();
    this.FloatApplyChecked=(v) => ApplyValue(g_7, s_7, v);
  }
});
let _c_6=Lazy((_i) => class $StartupCode_Templates {
  static {
    _c_6=_i(this);
  }
  static RenderedFullDocTemplate;
  static TextHoleRE;
  static GlobalHoles;
  static LocalTemplatesLoaded;
  static LoadedTemplates;
  static {
    this.LoadedTemplates=new Dictionary("New_5");
    this.LocalTemplatesLoaded=false;
    this.GlobalHoles=new Dictionary("New_5");
    this.TextHoleRE="\\${([^}]+)}";
    this.RenderedFullDocTemplate=null;
  }
});
function get_UseAnimations(){
  return UseAnimations();
}
function Play(anim){
  const _1=null;
  return Delay(() => Bind_1(Run(() => { }, Actions(anim)), () => {
    Finalize(anim);
    return Return(null);
  }));
}
function Append(a, a_1){
  return Anim(Append_1(a.$0, a_1.$0));
}
function Run(k, anim){
  const dur=anim.Duration;
  if(dur===0)return Zero();
  else {
    const c=(ok) => {
      function loop(start){
        return(now) => {
          const t=now-start;
          anim.Compute(t);
          k();
          return t<=dur?void requestAnimationFrame((t_1) => {
            (loop(start))(t_1);
          }):ok();
        };
      }
      requestAnimationFrame((t) => {
        (loop(t))(t);
      });
    };
    return FromContinuations((_1, _2, _3) => c.apply(null, [_1, _2, _3]));
  }
}
function Anim(Item){
  return{$:0, $0:Item};
}
function Concat(xs){
  return Anim(Concat_1(map_1(List, xs)));
}
function get_Empty(){
  return Anim(Empty_1());
}
function BatchUpdatesEnabled(){
  return _c_7.BatchUpdatesEnabled;
}
function StartProcessor(procAsync){
  const st=[0];
  function work(){
    const _1=null;
    return Delay(() => Bind_1(procAsync, () => {
      const m=st[0];
      return Equals(m, 1)?(st[0]=0,Zero()):Equals(m, 2)?(st[0]=1,work()):Zero();
    }));
  }
  return() => {
    const m=st[0];
    if(Equals(m, 0)){
      st[0]=1;
      Start(work(), null);
    }
    else Equals(m, 1)?st[0]=2:void 0;
  };
}
function AjaxProvider(){
  return _c_8.AjaxProvider;
}
function makePayload(data){
  return JSON.stringify(data);
}
function makeHeaders(headers){
  return NewFromSeq(map_2((_1) =>[_1[0], _1[1]], distinctBy_1((t) => t[0], headers.concat([["content-type", "application/json"]]))));
}
function EndPoint(){
  return _c_8.EndPoint;
}
function ajax(async, url, headers, data, ok, err, csrf){
  let xhr=new XMLHttpRequest();
  let csrf_1=document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*csrftoken\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
  xhr.open("POST", url, async);
  if(async==true)xhr.withCredentials=true;
  let h;
  for(var h_1 in headers)xhr.setRequestHeader(h_1, headers[h_1]);
  if(csrf_1)xhr.setRequestHeader("x-csrftoken", csrf_1);
  function k(){
    if(xhr.status==200)ok(xhr.responseText);
    else if(csrf&&xhr.status==403&&xhr.responseText=="CSRF")csrf();
    else {
      let msg="Response status is not 200: ";
      err(new Error(msg+xhr.status));
    }
  }
  if("onload"in xhr)xhr.onload=xhr.onerror=xhr.onabort=k;
  else xhr.onreadystatechange=() => {
    if(xhr.readyState==4)k();
  };
  xhr.send(data);
}
class Updates_1 {
  c;
  s;
  v;
  static Create(v){
    let var_1;
    var_1=null;
    var_1=Updates_1.New(v, null, () => {
      let c;
      c=var_1.s;
      return c===null?(c=Copy(var_1.c()),var_1.s=c,WhenObsoleteRun(c, () => {
        var_1.s=null;
      }),c):c;
    });
    return var_1;
  }
  static New(Current, Snap, VarView){
    return Create_1(Updates_1, {
      c:Current, 
      s:Snap, 
      v:VarView
    });
  }
}
function isBlank(s){
  return forall_1(IsWhiteSpace, s);
}
class CheckedInput {
  get Input(){
    return this.$==1?this.$0:this.$==2?this.$0:this.$1;
  }
  static Blank(inputText){
    return Create_1(CheckedInput, {$:2, $0:inputText});
  }
  static Invalid(inputText){
    return Create_1(CheckedInput, {$:1, $0:inputText});
  }
  static Valid(value, inputText){
    return Create_1(CheckedInput, {
      $:0, 
      $0:value, 
      $1:inputText
    });
  }
}
function convertTextNode(n){
  let m=null;
  let li=0;
  const s=n.textContent;
  const strRE=new RegExp(TextHoleRE(), "g");
  while(m=strRE.exec(s),m!==null)
    {
      n.parentNode.insertBefore(globalThis.document.createTextNode(string(s, Some(li), Some(strRE.lastIndex-get(m, 0).length-1))), n);
      li=strRE.lastIndex;
      const hole=globalThis.document.createElement("span");
      hole.setAttribute("ws-replace", get(m, 1).toLowerCase());
      n.parentNode.insertBefore(hole, n);
    }
  strRE.lastIndex=0;
  n.textContent=string(s, Some(li), null);
}
function failNotLoaded(name){
  console.warn("Instantiating non-loaded template", name);
}
function fillTextHole(instance, fillWith, templateName){
  const m=instance.querySelector("[ws-replace]");
  return Equals(m, null)?(console.warn("Filling non-existent text hole", templateName),null):(m.parentNode.replaceChild(globalThis.document.createTextNode(fillWith), m),Some(m.getAttribute("ws-replace")));
}
function removeHolesExcept(instance, dontRemove){
  const run=(attrName) => {
    foreachNotPreserved(instance, "["+attrName+"]", (e) => {
      if(!dontRemove.Contains(e.getAttribute(attrName)))e.removeAttribute(attrName);
    });
  };
  run("ws-attr");
  run("ws-onafterrender");
  run("ws-var");
  foreachNotPreserved(instance, "[ws-hole]", (e) => {
    if(!dontRemove.Contains(e.getAttribute("ws-hole"))){
      e.removeAttribute("ws-hole");
      while(e.hasChildNodes())
        e.removeChild(e.lastChild);
    }
  });
  foreachNotPreserved(instance, "[ws-replace]", (e) => {
    if(!dontRemove.Contains(e.getAttribute("ws-replace")))e.parentNode.removeChild(e);
  });
  foreachNotPreserved(instance, "[ws-on]", (e) => {
    e.setAttribute("ws-on", concat_1(" ", filter((x) => dontRemove.Contains(get(SplitChars(x, [":"], 1), 1)), SplitChars(e.getAttribute("ws-on"), [" "], 1))));
  });
  foreachNotPreserved(instance, "[ws-attr-holes]", (e) => {
    const holeAttrs=SplitChars(e.getAttribute("ws-attr-holes"), [" "], 1);
    for(let i=0, _2=holeAttrs.length-1;i<=_2;i++){
      const attrName=get(holeAttrs, i);
      let this_1=new RegExp(TextHoleRE(), "g");
      let _1=e.getAttribute(attrName).replace(this_1, (_3, _4) => dontRemove.Contains(_4)?_3:"");
      e.setAttribute(attrName, _1);
    }
  });
}
function fillInstanceAttrs(instance, fillWith){
  convertAttrs(fillWith);
  const name=fillWith.nodeName.toLowerCase();
  const m=instance.querySelector("[ws-attr="+name+"]");
  if(Equals(m, null))console.warn("Filling non-existent attr hole", name);
  else {
    m.removeAttribute("ws-attr");
    for(let i=0, _1=fillWith.attributes.length-1;i<=_1;i++){
      const a=fillWith.attributes.item(i);
      if(a.name=="class"&&m.hasAttribute("class"))m.setAttribute("class", m.getAttribute("class")+" "+a.nodeValue);
      else m.setAttribute(a.name, a.nodeValue);
    }
  }
}
function mapHoles(t, mappings){
  const run=(attrName) => {
    foreachNotPreserved(t, "["+attrName+"]", (e) => {
      let o;
      const m=(o=null,[mappings.TryGetValue(e.getAttribute(attrName).toLowerCase(), {get:() => o, set:(v) => {
        o=v;
      }}), o]);
      if(m[0])e.setAttribute(attrName, m[1]);
    });
  };
  run("ws-hole");
  run("ws-replace");
  run("ws-attr");
  run("ws-onafterrender");
  run("ws-var");
  foreachNotPreserved(t, "[ws-on]", (e) => {
    e.setAttribute("ws-on", concat_1(" ", map_2((x) => {
      let o;
      const a=SplitChars(x, [":"], 1);
      const m=(o=null,[mappings.TryGetValue(get(a, 1), {get:() => o, set:(v) => {
        o=v;
      }}), o]);
      return m[0]?get(a, 0)+":"+m[1]:x;
    }, SplitChars(e.getAttribute("ws-on"), [" "], 1))));
  });
  foreachNotPreserved(t, "[ws-attr-holes]", (e) => {
    const holeAttrs=SplitChars(e.getAttribute("ws-attr-holes"), [" "], 1);
    for(let i=0, _1=holeAttrs.length-1;i<=_1;i++)((() => {
      const attrName=get(holeAttrs, i);
      return e.setAttribute(attrName, fold((_2, _3) => {
        const a=KeyValue(_3);
        return _2.replace(new RegExp("\\${"+a[0]+"}", "ig"), "${"+a[1]+"}");
      }, e.getAttribute(attrName), mappings));
    })());
  });
}
function fill(fillWith, p, n){
  while(true)
    {
      if(fillWith.hasChildNodes())n=p.insertBefore(fillWith.lastChild, n);
      else return null;
    }
}
function convertAttrs(el){
  const attrs=el.attributes;
  const toRemove=[];
  const events=[];
  const holedAttrs=[];
  for(let i=0, _2=attrs.length-1;i<=_2;i++){
    const a=attrs.item(i);
    if(StartsWith(a.nodeName, "ws-on")&&a.nodeName!="ws-onafterrender"&&a.nodeName!="ws-on"){
      toRemove.push(a.nodeName);
      events.push(string(a.nodeName, Some("ws-on".length), null)+":"+a.nodeValue.toLowerCase());
    }
    else if(!StartsWith(a.nodeName, "ws-")&&(new RegExp(TextHoleRE())).test(a.nodeValue)){
      let this_1=new RegExp(TextHoleRE(), "g");
      let _1=a.nodeValue.replace(this_1, (_3, _4) =>"${"+_4.toLowerCase()+"}");
      a.nodeValue=_1;
      holedAttrs.push(a.nodeName);
    }
    else void 0;
  }
  if(!(events.length==0))el.setAttribute("ws-on", concat_1(" ", events));
  if(!(holedAttrs.length==0))el.setAttribute("ws-attr-holes", concat_1(" ", holedAttrs));
  const lowercaseAttr=(name) => {
    const m=el.getAttribute(name);
    if(m==null){ }
    else el.setAttribute(name, m.toLowerCase());
  };
  lowercaseAttr("ws-hole");
  lowercaseAttr("ws-replace");
  lowercaseAttr("ws-attr");
  lowercaseAttr("ws-onafterrender");
  lowercaseAttr("ws-var");
  iter_1((a_1) => {
    el.removeAttribute(a_1);
  }, toRemove);
}
function string(source, start, finish){
  if(start==null){
    if(finish!=null&&finish.$==1){
      const f=finish.$0;
      return f<0?"":source.slice(0, f+1);
    }
    else return"";
  }
  else if(finish==null)return source.slice(start.$0);
  else {
    const f_1=finish.$0;
    return f_1<0?"":source.slice(start.$0, f_1+1);
  }
}
function insufficient(){
  return FailWith("The input sequence has an insufficient number of elements.");
}
function arrContains(item, arr){
  let c=true;
  let i=0;
  while(c&&i<length_1(arr))
    if(Equals(arr[i], item))c=false;
    else i=i+1;
  return!c;
}
function nonNegative(){
  return FailWith("The input must be non-negative.");
}
class KeyCollection extends Object_1 {
  d;
  GetEnumerator(){
    return Get(map_1((kvp) => kvp.K, this.d));
  }
  constructor(d){
    super();
    this.d=d;
  }
}
class Text extends TemplateHole {
  name;
  fillWith;
  get Value(){
    return this.fillWith;
  }
  get Name(){
    return this.name;
  }
  get AsChoiceView(){
    return Choice1Of2(this.fillWith);
  }
}
class Attribute extends TemplateHole {
  name;
  fillWith;
  get Value(){
    return this.fillWith;
  }
  get Name(){
    return this.name;
  }
}
class Event extends TemplateHole {
  name;
  fillWith;
  get Value(){
    return this.fillWith;
  }
  get Name(){
    return this.name;
  }
}
class EventQ extends TemplateHole {
  name;
  fillWith;
  get Value(){
    return this.fillWith;
  }
  get Name(){
    return this.name;
  }
}
class AfterRender_1 extends TemplateHole {
  name;
  fillWith;
  get Value(){
    return this.fillWith;
  }
  get Name(){
    return this.name;
  }
}
class AfterRenderQ extends TemplateHole {
  name;
  fillWith;
  get Value(){
    return this.fillWith;
  }
  get Name(){
    return this.name;
  }
}
function Choice1Of2(Item){
  return{$:0, $0:Item};
}
function Choice2Of2(Item){
  return{$:1, $0:Item};
}
class ValueCollection extends Object_1 {
  d;
  GetEnumerator(){
    return Get(map_1((kvp) => kvp.V, this.d));
  }
  constructor(d){
    super();
    this.d=d;
  }
}
function New_3(PreviousNodes, Top){
  return{PreviousNodes:PreviousNodes, Top:Top};
}
function get_Empty_1(){
  return NodeSet(new HashSet("New_3"));
}
function FindAll(doc){
  const q=[];
  function recF(recI, _1){
    while(true)
      switch(recI){
        case 0:
          if(_1!=null&&_1.$==0){
            const b=_1.$1;
            const a=_1.$0;
            recF(0, a);
            _1=b;
          }
          else if(_1!=null&&_1.$==1){
            const el=_1.$0;
            _1=el;
            recI=1;
          }
          else if(_1!=null&&_1.$==2){
            const em=_1.$0;
            _1=em.Current;
          }
          else if(_1!=null&&_1.$==6){
            const x=_1.$0.Holes;
            return(((a_1) =>(a_2) => {
              iter_1(a_1, a_2);
            })(loopEN))(x);
          }
          else return null;
          break;
        case 1:
          q.push(_1);
          _1=_1.Children;
          recI=0;
          break;
      }
  }
  function loop(node){
    return recF(0, node);
  }
  function loopEN(el){
    return recF(1, el);
  }
  loop(doc);
  return NodeSet(new HashSet("New_2", q));
}
function NodeSet(Item){
  return{$:0, $0:Item};
}
function Filter(f, a){
  return NodeSet(Filter_1(f, a.$0));
}
function Except(a, a_1){
  return NodeSet(Except_1(a.$0, a_1.$0));
}
function ToArray(a){
  return ToArray_2(a.$0);
}
function Intersect(a, a_1){
  return NodeSet(Intersect_1(a.$0, a_1.$0));
}
function UseAnimations(){
  return _c_9.UseAnimations;
}
function Actions(a){
  return ConcatActions(choose((a_1) => a_1.$==1?Some(a_1.$0):null, ToArray_1(a.$0)));
}
function Finalize(a){
  iter_1((a_1) => {
    if(a_1.$==0)a_1.$0();
  }, ToArray_1(a.$0));
}
function ConcatActions(xs){
  const xs_1=ofSeqNonCopying(xs);
  const m=length_1(xs_1);
  if(m===0)return Const_1();
  else if(m===1)return get(xs_1, 0);
  else {
    const dur=max(map_1((anim) => anim.Duration, xs_1));
    const xs_2=map_2((x) => Prolong(dur, x), xs_1);
    return Def(dur, (t) => {
      iter_1((anim) => {
        anim.Compute(t);
      }, xs_2);
    });
  }
}
function List(a){
  return a.$0;
}
function Const_1(v){
  return Def(0, () => v);
}
function Def(d, f){
  return{Compute:f, Duration:d};
}
function Prolong(nextDuration, anim){
  const comp=anim.Compute;
  const dur=anim.Duration;
  const last=Create(() => anim.Compute(anim.Duration));
  return{Compute:(t) => t>=dur?last.f():comp(t), Duration:nextDuration};
}
let _c_7=Lazy((_i) => class Proxy {
  static {
    _c_7=_i(this);
  }
  static BatchUpdatesEnabled;
  static {
    this.BatchUpdatesEnabled=true;
  }
});
let _c_8=Lazy((_i) => class $StartupCode_Remoting {
  static {
    _c_8=_i(this);
  }
  static AjaxProvider;
  static EndPoint;
  static {
    this.EndPoint=globalThis.location.origin;
    this.AjaxProvider=new XhrProvider();
  }
});
function concat_3(o){
  let r=[];
  let k;
  for(var k_1 in o)r.push.apply(r, o[k_1]);
  return r;
}
class DynamicAttrNode extends Object_1 {
  push;
  value;
  dirty;
  updates;
  get NChanged(){
    return this.updates;
  }
  NGetExitAnim(parent){
    return get_Empty();
  }
  NGetEnterAnim(parent){
    return get_Empty();
  }
  NGetChangeAnim(parent){
    return get_Empty();
  }
  NSync(parent){
    if(this.dirty){
      (this.push(parent))(this.value);
      this.dirty=false;
    }
  }
  constructor(view, push){
    super();
    this.push=push;
    this.value=void 0;
    this.dirty=false;
    this.updates=Map_1((x) => {
      this.value=x;
      this.dirty=true;
    }, view);
  }
}
function IsWhiteSpace(c){
  return c.match(new RegExp("\\s"))!==null;
}
function TryParse_1(s){
  const d=Date.parse(s);
  return isNaN(d)?null:Some(d);
}
function TryParse_2(s, min, max_1, r){
  const x=+s;
  const ok=x===x-x%1&&x>=min&&x<=max_1;
  if(ok)r.set(x);
  return ok;
}
let _c_9=Lazy((_i) => class $StartupCode_Animation {
  static {
    _c_9=_i(this);
  }
  static UseAnimations;
  static CubicInOut;
  static {
    this.CubicInOut=Easing.Custom((t) => {
      const t2=t*t;
      return 3*t2-2*(t2*t);
    });
    this.UseAnimations=true;
  }
});
function Append_1(x, y){
  return x.$==0?y:y.$==0?x:{
    $:2, 
    $0:x, 
    $1:y
  };
}
function ToArray_1(xs){
  const out=[];
  function loop(xs_1){
    while(true)
      {
        if(xs_1.$==1)return out.push(xs_1.$0);
        else if(xs_1.$==2){
          const y=xs_1.$1;
          const x=xs_1.$0;
          loop(x);
          xs_1=y;
        }
        else return xs_1.$==3?iter_1((v) => {
          out.push(v);
        }, xs_1.$0):null;
      }
  }
  loop(xs);
  return out.slice(0);
}
function Concat_1(xs){
  const x=ofSeqNonCopying(xs);
  return TreeReduce(Empty_1(), Append_1, x);
}
function Empty_1(){
  return _c_11.Empty;
}
class XhrProvider extends Object_1 {
  Async(url, headers, data, ok, err){
    ajax(true, url, headers, data, ok, err, () => {
      ajax(true, url, headers, data, ok, err, void 0);
    });
  }
}
function Clear(a){
  a.splice(0, length_1(a));
}
let _c_10=Lazy((_i) => class $StartupCode_DomUtility {
  static {
    _c_10=_i(this);
  }
  static defaultWrap;
  static wrapMap;
  static rhtml;
  static rtagName;
  static rxhtmlTag;
  static {
    this.rxhtmlTag=new RegExp("<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>", "gi");
    this.rtagName=new RegExp("<([\\w:]+)");
    this.rhtml=new RegExp("<|&#?\\w+;");
    const table=[1, "<table>", "</table>"];
    let _1=Object.fromEntries([["option", [1, "<select multiple='multiple'>", "</select>"]], ["legend", [1, "<fieldset>", "</fieldset>"]], ["area", [1, "<map>", "</map>"]], ["param", [1, "<object>", "</object>"]], ["thead", table], ["tbody", table], ["tfoot", table], ["tr", [2, "<table><tbody>", "</tbody></table>"]], ["col", [2, "<table><colgroup>", "</colgoup></table>"]], ["td", [3, "<table><tbody><tr>", "</tr></tbody></table>"]]]);
    this.wrapMap=_1;
    this.defaultWrap=[0, "", ""];
  }
});
class Easing extends Object_1 {
  transformTime;
  static Custom(f){
    return new Easing(f);
  }
  constructor(transformTime){
    super();
    this.transformTime=transformTime;
  }
}
function Filter_1(ok, set_1){
  return new HashSet("New_2", filter(ok, ToArray_2(set_1)));
}
function Except_1(excluded, included){
  const set_1=new HashSet("New_2", ToArray_2(included));
  set_1.ExceptWith(ToArray_2(excluded));
  return set_1;
}
function ToArray_2(set_1){
  const arr=create(set_1.Count, void 0);
  set_1.CopyTo(arr, 0);
  return arr;
}
function Intersect_1(a, b){
  const set_1=new HashSet("New_2", ToArray_2(a));
  set_1.IntersectWith(ToArray_2(b));
  return set_1;
}
class KeyNotFoundException extends Error {
  static New(){
    return new this("New");
  }
  static New_1(message){
    return new this("New_1", message);
  }
  constructor(i, _1){
    if(i=="New"){
      i="New_1";
      _1="The given key was not present in the dictionary.";
    }
    if(i=="New_1"){
      const message=_1;
      super(message);
    }
  }
}
function Children(elem, delims){
  let n;
  if(delims!=null&&delims.$==1){
    const a=[];
    n=delims.$0[0].nextSibling;
    while(n!==delims.$0[1])
      {
        a.push(n);
        n=n.nextSibling;
      }
    return DomNodes(a);
  }
  else {
    let _1=elem.childNodes.length;
    const o=elem.childNodes;
    let _2=init_2(_1, (i) => o[i]);
    return DomNodes(_2);
  }
}
function Except_2(a, a_1){
  const excluded=a.$0;
  return DomNodes(filter((n) => forall_2((k) =>!(n===k), excluded), a_1.$0));
}
function Iter(f, a){
  iter_1(f, a.$0);
}
function DocChildren(node){
  const q=[];
  function loop(doc){
    while(true)
      {
        if(doc!=null&&doc.$==2){
          const d=doc.$0;
          doc=d.Current;
        }
        else if(doc!=null&&doc.$==1)return q.push(doc.$0.El);
        else if(doc==null)return null;
        else if(doc!=null&&doc.$==5)return q.push(doc.$0);
        else if(doc!=null&&doc.$==4)return q.push(doc.$0.Text);
        else if(doc!=null&&doc.$==6){
          const x=doc.$0.Els;
          return(((a_1) =>(a_2) => {
            iter_1(a_1, a_2);
          })((a_1) => {
            if(a_1==null||a_1.constructor===Object)loop(a_1);
            else q.push(a_1);
          }))(x);
        }
        else {
          const b=doc.$1;
          const a=doc.$0;
          loop(a);
          doc=b;
        }
      }
  }
  loop(node.Children);
  return DomNodes(ofSeqNonCopying(q));
}
function DomNodes(Item){
  return{$:0, $0:Item};
}
function Create(f){
  return New_4(false, f, forceLazy);
}
function forceLazy(){
  const v=this.v();
  this.c=true;
  this.v=v;
  this.f=cachedLazy;
  return v;
}
function cachedLazy(){
  return this.v;
}
let _c_11=Lazy((_i) => class $StartupCode_AppendList {
  static {
    _c_11=_i(this);
  }
  static Empty;
  static {
    this.Empty={$:0};
  }
});
function New_4(created, evalOrVal, force){
  return{
    c:created, 
    v:evalOrVal, 
    f:force
  };
}
