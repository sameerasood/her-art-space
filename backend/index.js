const morgan = require("morgan");
const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("./config");

// Create express object
const app = express();

// Create multer object
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/images/"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// Set middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static("images"));

// @TODO Add routes

// Image Upload Routes
app.post("/image", imageUpload.single("image"), (req, res) => {
  const { filename, path } = req.file;
  const description = req.body.description;

  console.log("body request:", req.body);

  console.log("File path:", path);

  let date = new Date(req.body.date);

  pool.query(
    "INSERT INTO image_details (filename, filepath, description, date) VALUES ($1, $2, $3, $4)",
    [filename, path, description, date],
    (err, result) => {
      if (err) {
        console.error("Error saving image details:", err);
        res.status(500).json({ error: "Failed to save image details" });
      } else {
        console.log("Image details saved successfully");
        res.status(200).json({ message: "Image details saved successfully" });
      }
    }
  );
});

// Image Get Routes
app.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, "images/" + filename);
  return res.sendFile(fullfilepath);
});

// get all images
app.get("/images", (req, res) => {
  pool.query("SELECT * FROM image_details", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
});

// Run express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
