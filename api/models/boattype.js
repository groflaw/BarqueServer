const mongoose = require("mongoose");

const boattypeSchema = new mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("boattype", boattypeSchema);
