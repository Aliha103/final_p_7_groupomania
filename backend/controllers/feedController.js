// controllers/postController.js
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Create a new post
exports.createPost = (req, res) => {
  const { text } = req.body;

  // Check if the user is logged in by verifying the JWT token
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, "Sp08bce011", (err, decodedToken) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    console.log("Decoded token:", decodedToken);

    const userId = decodedToken.userId;

    // Fetch user information from the database based on userId
    const userQuery = "SELECT firstname, lastname FROM user WHERE id = ?";
    const userParams = [userId];

    db.get(userQuery, userParams, (userErr, user) => {
      if (userErr || !user) {
        return res.status(500).json({ error: "Error fetching user data." });
      }

      // Create a new post
      const post = {
        content: text,
        userId: userId,
        userName: `${user.firstname} ${user.lastname}`,
      };

      // Save the post in the database
      Post.create(post, (postErr, result) => {
        if (postErr) {
          return res.status(500).json({
            error: postErr,
          });
        }

        res.status(201).json({
          message: "Post created successfully!",
          postId: result.postId,
        });
      });
    });
  });
};
