const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.sqlite");

const createCommentTable = () => {
  const createCommentTableQuery = `
    CREATE TABLE IF NOT EXISTS comment (
      id INTEGER PRIMARY KEY ASC,
      content TEXT NOT NULL,
      userId INTEGER NOT NULL,
      postId INTEGER NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE,
      FOREIGN KEY(postId) REFERENCES post(id) ON DELETE CASCADE
    );`;

  db.run(createCommentTableQuery, (err) => {
    if (err) {
      console.error("Error creating comment table:", err);
    } else {
      console.log("Comment table created successfully.");
    }
  });
};

createCommentTable();

module.exports = {
  create: (comment, callback) => {
    const insertQuery =
      "INSERT INTO comment (content, userId, postId) VALUES (?, ?, ?)";

    const params = [comment.content, comment.userId, comment.postId];

    db.run(insertQuery, params, function (err) {
      if (err) {
        console.error("Error creating comment:", err);
        callback(err, null);
      } else {
        console.log("Comment created successfully.");
        callback(null, { commentId: this.lastID });
      }
    });
  },
};
