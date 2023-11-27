const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
const db = require("../db"); // Adjust the path to your db.js



exports.signup = (req, res) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };

  // Hash the password using bcrypt
  bcrypt.hash(req.body.password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      res.status(500).json({ error: "Error while hashing the password." });
      return;
    }
    data.password = hashedPassword;

    // Check if the email already exists in the database
    var checkEmailSQL = "SELECT id FROM user WHERE email = ?";
    db.get(checkEmailSQL, [data.email], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (row) {
        // Email already exists
        res.status(400).json({ error: "Email is already registered." });
        return;
      }

      // Email is not found, proceed with registration
      var insertSQL =
        "INSERT INTO user (firstname, lastname, email, password) VALUES (?,?,?,?)";
      var params = [data.firstname, data.lastname, data.email, data.password];
      db.run(insertSQL, params, function (err, result) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          ...data,

          id: this.lastID,
        });
      });
    });
  });
};



exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if the email exists in the database
  const checkEmailSQL =
    "SELECT id, firstname, lastname, email, password FROM user WHERE email = ?";
  db.get(checkEmailSQL, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Email or Password not found." });
    }

    // Compare the provided password with the hashed password from the database
    bcrypt.compare(password, row.password, (compareError, passwordMatch) => {
      if (compareError) {
        return res.status(500).json({ error: compareError.message });
      }

      if (!passwordMatch) {
        return res.status(401).json({ error: "Email or Password not found." });
      }

      // Authentication successful, create a JWT
      const token = jwt.sign({ userId: row.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Include user data in the response
      res.json({
        message: "Authentication successful",
        user: {
          userId: row.id,
          firstname: row.firstname,
          lastname: row.lastname,
          email: row.email,
        },
        token: token,
      });
    });
  });
};

//Get All Users
exports.getAllUsers = (req, res, next) => {
  var sql = "select * from user";
  var params = [];
  db.all(sql, params, (err, rows) => {
    console.log(params);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
};

//Get User by ID
exports.getUserById = (req, res, next) => {
  var sql = "select * from user where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
};

//Delete User by ID
exports.deleteUser = (req, res) => {
  db.run(
    "DELETE FROM user WHERE id = ?",
    [req.params.id], // Use an array to pass parameters
    function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message }); // Use 'err.message' instead of 'res.message'
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
};
