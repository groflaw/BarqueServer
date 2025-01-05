const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number },
});

module.exports = mongoose.model("Admin", adminSchema);
