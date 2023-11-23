// routes/postRoute.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/feedController");

// Create a new post
router.post("/", postController.createPost);

module.exports = router;
