import Random from "../WebSharper.StdLib/System.Random.js"
import { sortBy } from "../WebSharper.StdLib/Microsoft.FSharp.Collections.ListModule.js"
export function shufflePlayerOrder(tokens){
  const rand=new Random();
  return sortBy(() => rand.Next_2(), tokens);
}
