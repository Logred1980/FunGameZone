import { Some } from "../WebSharper.StdLib/Microsoft.FSharp.Core.FSharpOption`1.js"
import { indexed, ofSeq, ofArray, map } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
import Doc from "../WebSharper.UI/WebSharper.UI.Doc.js"
import Attr from "../WebSharper.UI/WebSharper.UI.Attr.js"
import { delay, collect } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.SeqModule.js"
import { range } from "../WebSharper.StdLib/Microsoft.FSharp.Core.Operators.js"
export function showGameZone(_1, myToken, stateObj, playerStateOptObj){
  const playerStateOpt=playerStateOptObj==null?null:Some(playerStateOptObj.$0);
  const players=indexed(stateObj.PlayerOrder);
  return Doc.Element("div", [Attr.Create("class", "d-flex flex-wrap justify-content-start mt-3")], ofSeq(delay(() => collect((m) => {
    const token=m[1];
    const isMe=token==myToken;
    const cardDocs=isMe?playerStateOpt==null?ofArray([Doc.TextNode("(n/a)")]):map(renderCard, playerStateOpt.$0.Hand):ofSeq(delay(() => collect(() =>[Doc.Element("span", [Attr.Create("class", "me-1")], [Doc.TextNode("\ud83c\udca0")])], range(1, 2))));
    return[Doc.Element("div", [Attr.Create("class", (isMe?"bg-light":"bg-secondary")+" text-dark rounded p-3 me-3 mb-3 position-relative"), Attr.Create("style", "min-width: 300px; flex: 1; max-width: 48%;")], [Doc.Element("div", [Attr.Create("class", "position-absolute top-0 start-0 fw-bold text-white bg-dark px-2"), Attr.Create("style", "border-bottom-right-radius: 0.5rem;")], [Doc.TextNode(String(m[0]+1)+".")]), Doc.Element("h5", [Attr.Create("class", "fw-bold mb-2"), Attr.Create("style", "margin-left: 15px")], [Doc.TextNode(isMe?"You":token)]), Doc.Element("div", [], cardDocs), Doc.Element("div", [Attr.Create("class", "mt-2")], [Doc.Element("button", [Attr.Create("class", "btn btn-sm btn-primary me-2")], [Doc.TextNode("Draw")]), Doc.Element("button", [Attr.Create("class", "btn btn-sm btn-warning")], [Doc.TextNode("Pass")])])])];
  }, players))));
}
export function renderCard(card){
  let _1=[Attr.Create("class", "me-1")];
  const a=card.Rank;
  const a_1=card.Suit;
  let _2=[Doc.TextNode((a.$==1?"3":a.$==2?"4":a.$==3?"5":a.$==4?"6":a.$==5?"7":a.$==6?"8":a.$==7?"9":a.$==8?"10":a.$==9?"J":a.$==10?"Q":a.$==11?"K":a.$==12?"A":"2")+(a_1.$==1?"\u2666":a_1.$==2?"\u2663":a_1.$==3?"\u2660":"\u2665"))];
  return Doc.Element("span", _1, _2);
}
