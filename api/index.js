const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Import your db connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define your routes here (example)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
