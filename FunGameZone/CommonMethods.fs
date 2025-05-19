namespace FunGameZone

open WebSharper

[<JavaScript>]
module CommonMethods =
    let generateToken () =
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let length = 8
        let rnd = System.Random()
        let randomChar () =
            let index = rnd.Next(chars.Length)
            chars.[index]
        System.String(Array.init length (fun _ -> randomChar ()))