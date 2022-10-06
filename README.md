# Grid Game:

Exploring the Phaser 3 game engine and Socket.io real-time messaging by implementing a version of the game Genius Square.

## About:

I programmed Grid Game as part of a four-day-long hackathon project. This project allowed me to explore two of my interests as a software engineer: game design and real-time messaging/websocket technology.

I used Socket.io to develop a multiplayer proof-of-concept for Grid Game that allows for multiple clients to play at the same time with the same game board, viewing their opponent's tile moves, flips, and rotations in real-time.

## Starting:

To start the multiplayer proof-of-concept:

```bash
npm i
node server.js
```

Files also include separate game and HTML files to explore the single-player version!

## Multiplayer Images:

### Multiplayer functionality proof-of-concept (using Socket.io!)

Pending...

### Game starting state:

![Multiplayer-start-state](/public/readmeimg/multiplayerstart.png "Multiplayer start state")

### Game in-progress:

![Multiplayer-in-progress](/public/readmeimg/multiplayerinprogress.png "Multiplayer in-progress")

## Single-Player Images:

### Game starting state:

![Single-player-start-state](/public/readmeimg/singleplayerstart.png "Single-player start state")

### Game completed example:

![Single-player-completed](/public/readmeimg/singleplayercomplete.png "Single-player completed")

## Next Steps:

To continue my exploration of Socket.io, I would like to implement a game lobby/room system in preparation for deployment of the game's multiplayer version. I would also like ot implement a timer to establish a win condition for the fastest player. There are also a few refinements to the tile-flipping functionality I would like to work on.
