const multer = require("multer");
const path = require("path");

const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename(req, file, cb) {
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
