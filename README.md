# FunGameZone

FunGameZone is a minimalistic and user-friendly multiplayer game zone system built with F# and WebSharper.
Its goal is not to implement a specific game, but to provide a shared online platform where players can join hosted game rooms and interact.
The system focuses on usability and clarity, with server-side logic handling all game and user state.

## Features

- Hosts can create new game rooms by entering a room name and their own name.
- Players can join any available room by entering their name and selecting a room.
- Each room and player is uniquely identified via an 8-character token, embedded into the URL.
- Players can join by visiting the room URL directly, and the system automatically restores their identity.
- Rooms can be started and closed by the host.
- A Game Zone interface becomes visible once the room is started, displaying each player and allowing interaction (e.g., buttons like Draw and Pass).
- All game data (e.g., players, rooms, game state) is managed and stored on the server.

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
Players can create rooms and view all existing ones.

![Room creation](docs/screenshots/room-creation.png)

### Host view: waiting for players and starting the game
The host can see joined players and start the game.

![Host view](docs/screenshots/host-waiting.png)

### Game in progress
Each player is presented with game controls like "Draw" and "Pass".

![Game board](docs/screenshots/game-play.png)

### Player view
Each player sees their own token, room info, and can exit at any time.

![Player view](docs/screenshots/player-view.png)

## Goals and Vision

The aim of this project was to create a well-structured multiplayer lobby with a seamless and intuitive interface. The focus was not on building a complex game engine, but on managing rooms, players, and a shared game state in a clean, functional, and scalable way.

The design leverages WebSharper’s reactive UI model and F# server logic to offer a cohesive client-server experience, where each client operates with isolated access based on tokenized URLs.

## Neptun code: FPB5E4
