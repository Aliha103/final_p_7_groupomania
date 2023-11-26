const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite");

const createPostTable = () => {
  const createPostTableQuery = `
    CREATE TABLE IF NOT EXISTS post (
      id INTEGER PRIMARY KEY ASC,
      content TEXT NOT NULL,
      image TEXT,
      userId INTEGER NOT NULL,
      userName TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE
    );`;

  const createImageTableQuery = `
    CREATE TABLE IF NOT EXISTS image (
      id INTEGER PRIMARY KEY ASC,
      post_id INTEGER,
      filename TEXT,
      FOREIGN KEY (post_id) REFERENCES post(id)
    );`;

  db.run(createPostTableQuery, (err) => {
    if (err) {
      console.error("Error creating post table:", err);
    } else {
      console.log("Post table created successfully.");
    }
  });

  db.run(createImageTableQuery, (err) => {
    if (err) {
      console.error("Error creating image table:", err);
    } else {
      console.log("Image table created successfully.");
    }
  });
};

createPostTable();

module.exports = {
  create: (post, callback) => {
    const insertQuery =
      "INSERT INTO post (content, image, userId, userName) VALUES (?, ?, ?, ?)";

    // Check if post.image is defined before splitting
    const imagePath = post.image
      ? `http://localhost:8000/api/images/${post.image.split("/").pop()}`
      : null;

    const params = [post.content, imagePath, post.userId, post.userName];

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
