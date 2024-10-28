const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  birthDay: { type: Date, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
