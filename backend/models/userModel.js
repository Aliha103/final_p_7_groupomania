const db = require("../db.js");
const md5 = require("md5");

function User(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = md5(user.password);
}

User.create = (newUser, result) => {
  db.run(
    "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
    [newUser.firstname, newUser.lastname, newUser.email, newUser.password],
    function (err) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: this.lastID, ...newUser });
      result(null, { id: this.lastID, ...newUser });
    }
  );
};

User.findById = (userId, result) => {
  db.get(`SELECT * FROM user WHERE id = ? `, userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (email, result) => {
  db.get(`SELECT * FROM user WHERE email = ? `, email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
