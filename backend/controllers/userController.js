const bcrypt = require("bcrypt");
const db = require("../db"); // Adjust the path to your db.js

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM user";

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ users: rows });
  });
};
exports.signup = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required fields.",
    });
  }

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("Error while hashing the password:", hashErr);
      return res.status(500).json({
        error: "Error while hashing the password.",
      });
    }

    // Save the user in your database
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword, // Store the hashed password in the database
    });

    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        console.error("Error while saving user:", error);
        res.status(500).json({
          error: error,
        });
      });
  });
};

// User login function
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User not found!",
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Incorrect password!",
            });
          }

          // Authentication successful, create a JWT token
          const token = jwt.sign({ userId: user._id }, "your-secret-key", {
            expiresIn: "24h",
          });

          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
