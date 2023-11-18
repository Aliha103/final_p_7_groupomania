const express = require("express");
const app = require("./app");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Listen for a custom event from the client
  socket.on("login", ({ userToken }) => {
    console.log(`User with token ${userToken} logged in`);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
