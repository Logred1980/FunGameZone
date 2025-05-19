import Random from "../WebSharper.StdLib/System.Random.js"
import { init } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ArrayModule.js"
export function generateToken(){
  const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const rnd=new Random();
  return init(8, () => chars[rnd.Next_1(chars.length)]).join("");
}
