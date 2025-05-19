namespace FunGameZone

open System.Collections.Concurrent
open System
open RoomTypes

module RoomsDB =

    let private rooms = ConcurrentDictionary<string, RoomInfo>()

    let addRoom (hostName: string, hostToken: string, roomName: string, roomToken: string ) =
        let info =
            {
                HostName = hostName
                HostToken = hostToken
                RoomName = roomName
                RoomToken = roomToken
                Players = []
                CreatedDT = DateTime.Now
                IsOpen = true
                CurrentGame = None
            }
        rooms.TryAdd(roomToken, info) |> ignore

    let getRoom token =
        match rooms.TryGetValue token with
        | true, info -> Some info
        | _ -> None

    let getAllRooms () : RoomInfo list =
        rooms.Values |> Seq.toList

    let updateRoom token updatedRoom =
        rooms.AddOrUpdate(token, updatedRoom, fun _ _ -> updatedRoom) |> ignore

    let removeRoom (roomToken: string) =
        rooms.TryRemove(roomToken) |> fst
