const Comment = require("../models/commentModel");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Create a new comment
exports.createComment = (req, res) => {
  const { text, postId } = req.body;

  // Check if the text is empty
  if (!text) {
    return res
      .status(400)
      .json({ error: "Please include some text in your comment." });
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

      // Create a new comment
      const comment = {
        content: text,
        userId: userId,
        postId: postId,
        userName: `${user.firstname} ${user.lastname}`,
      };

      // Save the comment in the database
      Comment.create(comment, (commentErr, result) => {
        if (commentErr) {
          return res.status(500).json({
            error: commentErr,
          });
        }

        res.status(201).json({
          message: "Comment created successfully!",
          commentId: result.commentId,
        });
      });
    });
  });
};

// Get all comments for a specific post with user and post owner information
exports.getComments = (req, res) => {
  const selectSQL = `
    SELECT c.*, u.id AS userId, u.firstname, u.lastname, p.userId AS postOwnerId
    FROM comment c
    JOIN user u ON c.userId = u.id
    JOIN post p ON c.postId = p.id
    WHERE c.postId = ?;
  `;
  const params = [req.params.postId];

  db.all(selectSQL, params, (err, rows) => {
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


// Update a comment by ID
exports.updateComment = (req, res) => {
  const { text } = req.body;
  const updateSQL = "UPDATE comment SET content = ? WHERE id = ?";
  const params = [text, req.params.id];

  db.run(updateSQL, params, function (err, result) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({
      message: "Comment updated successfully",
      data: {
        id: req.params.id,
        content: text,
      },
    });
  });
};

// Delete a comment by ID
exports.deleteComment = (req, res) => {
  const deleteSQL = "DELETE FROM comment WHERE id = ?";
  const params = [req.params.id];

  db.run(deleteSQL, params, function (err, result) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({
      message: "Comment deleted successfully",
      changes: this.changes,
    });
  });
};
