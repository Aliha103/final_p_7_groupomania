const socketIO = require("socket.io");

const initSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("login", ({ userToken }) => {
      console.log(`User with token ${userToken} logged in`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });
};

module.exports = initSocket;
