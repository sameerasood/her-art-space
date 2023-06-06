const morgan = require("morgan");
const express = require("express");
const multer = require("multer");

// Create express object
const app = express();

// Create multer object
const imageUpload = multer({
  dest: "images",
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
  res.json("/image/:filename api");
});

// Run express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
