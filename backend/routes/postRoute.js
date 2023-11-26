// routes/postRoutes.js

const router = require("express").Router();
const postController = require("../controllers/feedController");
const upload = require('../configuration/multerConfig');


// routes/post.js

router.post('/posts', upload.single('image'), postController.createPost);


// Create post
router.post("/createPost", upload.single("image"), postController.createPost);
// Get all posts
router.get("/", postController.getPosts);

// Get single post
router.get("/:id", postController.getPost);

// Update post
router.patch("/:id", postController.updatePost);

// Delete post
router.delete("/:id", postController.deletePost);

module.exports = router;
