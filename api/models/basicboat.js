const mongoose = require("mongoose");

const basicboatSchema = new mongoose.Schema({
  types: { type: [{ _id: { type: Number }, name: { type: String } }] },
  brands: { type: [{ _id: { type: Number }, name: { type: String } }] },
  enginecount: { type: Number },
});

module.exports = mongoose.model("basicboat", basicboatSchema);
