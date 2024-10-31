const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  model: { type: String },
  description: { type: String },
  location: { type: String, required: true },
  year: { type: Date, required: true },
  size: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
