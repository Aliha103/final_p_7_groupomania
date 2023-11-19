const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const DBSOURCE = "db.sqlite";

// Create an SQLite database file if it doesn't exist
if (!fs.existsSync(DBSOURCE)) {
  fs.writeFileSync(DBSOURCE, "");
}

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    // Create the "user" table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY ASC ON CONFLICT ROLLBACK AUTOINCREMENT
        UNIQUE ON CONFLICT ROLLBACK NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`,
      (userTableErr) => {
        if (userTableErr) {
          console.error("Error creating the user table:", userTableErr);
        } else {
          console.log("User table created successfully.");
        }
      }
    );
  }
});

module.exports = db;
