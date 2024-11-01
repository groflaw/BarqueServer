const mongoose = require("mongoose");

const basicboatScahema = new mongoose.Schema({
  types: { type: [String] },
  brands: { type: [String] },
  enginecount: { type: Number },
});

module.exports = mongoose.model("basicboat", basicboatScahema);
