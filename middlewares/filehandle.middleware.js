const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadFiles = (destinationDirectory) => {
  const destPath = path.join(__dirname, "../uploads", destinationDirectory);
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({ storage });
};

module.exports = uploadFiles;
