const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


// Define a POST route for user signup
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.delete("/:id", userController.deleteUser);
module.exports = router;
