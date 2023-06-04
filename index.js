const morgan = require("morgan");
const express = require("express");

// Create express object
const app = express();

// Set middlewares
app.use(express.json());
app.use(morgan("dev"));

// @TODO Add routes
// Image Upload Routes
app.post("/image", (req, res) => {
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
