var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "./db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            firstname text, 
            lastname text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          console.log("Table already created");
        } else {
          console.log("Table just created, creating some rows");
        }
      }
    );
  }
});

module.exports = db;
