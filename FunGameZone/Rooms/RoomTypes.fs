module RoomTypes

type PlayerInfo =
    {
        Token: string
        Name: string
        Points: int
    }

type RoomInfo =
    {
        RoomToken: string
        HostToken: string
        HostName: string
        RoomName: string
        Players: list<PlayerInfo>
        CreatedDT: System.DateTime
        IsOpen: bool
        CurrentGame : string option
    }

type GameFolderInfo = 
    {
        FolderName: string
        ZoneFiles: list<string>
    }