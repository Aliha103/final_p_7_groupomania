const express = require("express");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = express();
const db = require("./db"); // Import the SQLite database connection
const postRoutes = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoute");

app.use(express.json());
const cors = require("cors");

app.use(cors());

const fs = require("fs");

const userRoutes = require("./routes/userRoute"); // path to userRoutes
app.use("/users", userRoutes);

app.use("/api/comments", commentRoutes);
app.use("/api/posts/", postRoutes);

app.use("/api/images", express.static(path.join(__dirname, "uploads")));

module.exports = app;
