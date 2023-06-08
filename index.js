const morgan = require("morgan");
const express = require("express");
const multer = require("multer");
const path = require("path");

// Create express object
const app = express();

// Create multer object
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
});

// Set middlewares
app.use(express.json());
app.use(morgan("dev"));

// @TODO Add routes
// Image Upload Routes
app.post("/image", imageUpload.single("image"), (req, res) => {
  console.log(req.file);
  res.json("/image api");
});

// Image Get Routes
app.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, "images/" + filename);
  return res.sendFile(fullfilepath);
});

// Run express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
