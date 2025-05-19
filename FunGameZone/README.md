# FunGameZone

FunGameZone is a very simple and user-friendly multiplayer game zone system, written in F# and WebSharper. Its goal was not to implement a game, but to provide a shared online platform that is very easy to use and does not require a lot of resources.
Users open the web interface and can create game rooms, join them. Each room has a Host who monitors the players and can start a game.
The data is stored on the server side, so the clients only keep the information necessary for display on their platform.
I wanted to avoid the problem of login and registration interfaces, so the user interfaces are blocked from each other by simple URL generation.
The project is objectionable from a security perspective, but I designed it more for easy afternoon entertainment, which anyone with a little IT knowledge can run at home.

## Features

- Any user can create new game rooms by entering a room name and their own name.
- Players can join any free room by entering their name and selecting a room.
- Each room and player is uniquely identified by an 8-character token embedded in the URL.
- No login or registration, just visit the generated URL directly and you are already connected to the game.
- The Host can close and open the room for joiners, as well as terminate it.
- The game zone interface becomes visible after starting the room, which displays all players.
- The Host can start the game, which is visible to everyone.
- All game data (e.g. players, rooms, game state) is managed and stored on the server.

## Authentication Model

Authentication and identification are handled entirely through random, unique 8-character tokens that are assigned on room and player creation. For example:
``` https://localhost:59449/room/Qohq0RVN/host/xj4ZiBzr ```

In this structure:
- `Qohq0RVN` is the token of the room,
- `xj4ZiBzr` is the token identifying the host (or player).

Each participant only sees their own data and not that of others. Identity is maintained by keeping the URL with the token – copying someone else's URL would allow impersonation, but no sensitive data is visible, and role switching is still sandboxed.

## Why there is no "Try it live" link

This application relies on server-side logic implemented in F# (`Startup.fs`, `Site.fs`, `Remoting.fs`), which is not compatible with static hosting platforms like GitHub Pages. As a result, the project cannot be deployed using a simple `gh-pages` workflow. A functioning deployment would require a .NET-capable environment (e.g., Azure, Render, Railway). Due to project scope and constraints, online auto-deployment is not provided.

## Running the Project Locally
To run the project on your own machine:
1. Make sure you have [.NET SDK 6.0 or later](https://dotnet.microsoft.com/download) installed.
2. Clone this repository or download it as a ZIP:
   ``` git clone https://github.com/Logred1980/FunGameZone.git ```
3. Open a terminal in the project root folder (where `FunGameZone.fsproj` is located), and build a self-contained executable by running:
   ``` dotnet publish -c Release -r win-x64 --self-contained true -o ./publish ```
4. After publishing completes, navigate to the `publish` folder:
   ``` cd publish ```
5. Start the server with the following command:
   ``` FunGameZone.exe --urls http://0.0.0.0:5000 ```
6. On the same machine, open a browser and navigate to:
   ``` http://localhost:5000 ```
7. To connect from other devices on the same network (e.g., another PC or smartphone), replace `localhost` with the IP address of the machine running the server. For example:
   ``` http://192.168.1.123:5000 ```
You can simulate multiple users by opening different browser tabs or using private/incognito mode.

## Application Screenshots

Below are screenshots of the application in use:

### Room creation and listing
Users can create rooms and view all existing ones.

![Room creation](FunGameZone/ZonePage.png)

### Host view: waiting for players and starting the game
The host can see joined players and start the game.

![Host view](FunGameZone/HostInRoomPage.png)

### Waiting for the game start
One player is waiting for the Host to start the game.

![Game board](FunGameZone/PlayerWaiting.png)

### Host view
In-game host view..

![Player view](FunGameZone/HostInGame.png)

### Player view
In-game Player view.

![Player view](FunGameZone/PlayerInGame.png)

## Goals and Vision

The goal of the project was to create a well-structured multiplayer zone. The main direction was to make it cheap, easy and fast to use. The focus was not on building a complex game engine, but on managing rooms, players and shared game state in a clean, functional and scalable way. I used the possibilities of WebSharper as much as I could. It would have been a bit of a dive to develop fully functional games for this.
Storing data on the server and client side was the biggest challenge. I tried to hide other users' data from the users. This project was not the most secure way to create, but a world opened up for me when I could log in to the server running on my laptop with my mobile phone, and with my old desktop PC.
I managed to create a game zone that did not require a lot of resources, which anyone can run without a big investment.

## Neptun code: RNQV0H
