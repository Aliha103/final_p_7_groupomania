const express = require("express");
const http = require("http");
const app = require("./app");
const initSocket = require("./socket");

const server = http.createServer(app);
initSocket(server);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
