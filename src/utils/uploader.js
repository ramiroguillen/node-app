const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(`${__dirname}/public/uploads/`));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({
  storage,
  onError: function (err, next) {
    console.log("* ~ file: uploader.js:16 ~ uploader ~ error:", err);
    next();
  },
});

module.exports = { uploader };
