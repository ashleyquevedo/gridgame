require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
// const server = require("http").Server(app);
let port = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

const io = require("socket.io");
const ioServer = new io.Server(server);

// console.log("Listening on port " + process.env.PORT);
console.log("Listening on port " + port);

ioServer.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("spriteMovement", function (movementData) {
    socket.broadcast.emit("spriteMoved", movementData);
  });
  socket.on("startGame", function (rollData) {
    socket.broadcast.emit("startedGame", rollData);
  });
  socket.on("resetGame", function () {
    socket.broadcast.emit("resetGame");
  });
});

// server.listen(process.env.PORT);
server.listen(port);
