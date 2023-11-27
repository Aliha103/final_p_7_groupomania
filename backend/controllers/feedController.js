const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const db = require("../db");
const upload = require("../configuration/multerConfig");

exports.createPost = (req, res) => {
  const { text } = req.body;

  // Check if both text and image are empty
  if (!text && !req.file) {
    return res
      .status(400)
      .json({ error: "Share your thoughts or include an image." });
  }

  // Check if the user is logged in by verifying the JWT token
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error("Error verifying token:", err);
      // Handle token verification errors here
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

      // Add image property if req.file exists
      if (req.file) {
        post.image = `/api/posts/api/images/${req.file.filename}`;
      }

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

// Get all posts with associated images
exports.getPosts = (req, res) => {
  const selectSQL =
    "SELECT post.*, image.filename AS image_filename FROM post LEFT JOIN image ON post.id = image.post_id";

  db.all(selectSQL, [], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Success",
      data: rows,
    });
  });
};

// Get a specific post by ID
exports.getPost = (req, res) => {
  const selectSQL = "SELECT * FROM post WHERE id = ?";
  const params = [req.params.id];

  db.get(selectSQL, params, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Success",
      data: row,
    });
  });
};

// Update a post by ID
exports.updatePost = (req, res) => {
  const { title, content, userId } = req.body;
  const updateSQL =
    "UPDATE post SET title = ?, content = ?, userId = ? WHERE id = ?";
  const params = [title, content, userId, req.params.id];

  db.run(updateSQL, params, function (err, result) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Post updated successfully",
      data: {
        id: req.params.id,
        title,
        content,
        userId,
      },
    });
  });
};

// Delete a post by ID
exports.deletePost = (req, res) => {
  const deleteSQL = "DELETE FROM post WHERE id = ?";
  const params = [req.params.id];

  db.run(deleteSQL, params, function (err, result) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Post deleted successfully",
      changes: this.changes,
    });
  });
};
