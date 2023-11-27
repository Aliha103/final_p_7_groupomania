const router = require("express").Router();
const commentController = require("../controllers/commentController");

// Create comment
router.post("/createComment", commentController.createComment);

// Get all comments for a specific post
router.get("/post/:postId", commentController.getComments);

// Update comment
router.patch("/:id", commentController.updateComment);

// Delete comment
router.delete("/:id", commentController.deleteComment);

module.exports = router;
