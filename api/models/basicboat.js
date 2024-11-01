const mongoose = require("mongoose");

const basicboatSchema = new mongoose.Schema({
  types: { type: [String] },
  brands: { type: [String] },
  enginecount: { type: Number },
});

module.exports = mongoose.model("basicboat", basicboatSchema);
