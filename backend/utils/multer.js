const multer = require("multer");
const path = require("path");

// Temporary storage in "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});


const upload = multer({ storage });

module.exports = upload;
