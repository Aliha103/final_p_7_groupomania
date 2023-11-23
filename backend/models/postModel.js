// models/Post.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite");

const createPostTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS post (
      id INTEGER PRIMARY KEY ASC,
      content TEXT NOT NULL,
      userId INTEGER NOT NULL,
      userName TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE
    );`;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating post table:", err);
    } else {
      console.log("Post table created successfully.");
    }
  });
};

createPostTable();

module.exports = {
  create: (post, callback) => {
    const insertQuery =
      "INSERT INTO post (content, userId, userName) VALUES (?, ?, ?)";
    const params = [post.content, post.userId, post.userName];

    db.run(insertQuery, params, function (err) {
      if (err) {
        console.error("Error creating post:", err);
        callback(err, null);
      } else {
        console.log("Post created successfully.");
        callback(null, { postId: this.lastID });
      }
    });
  },
};
