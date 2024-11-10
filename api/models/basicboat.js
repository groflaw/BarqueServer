const mongoose = require("mongoose");

const basicboatSchema = new mongoose.Schema({
  types: { type: [{ _id: { type: Number }, name: { type: String } }] },
  brands: { type: [{ _id: { type: Number }, name: { type: String } }] },
  powers: { type: [{ _id: { type: Number }, name: { type: String } }] },
  enginecount: { type: Number },
  bathroomcount: { type: Number },
  capacity: { type: Number },
  cabinscount: { type: Number },
  locationtype: { type: [{ _id: { type: Number }, name: { type: String } }] },
  cancellation: {
    type: [
      {
        _id: { type: Number },
        title: { tyep: String },
        description: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("basicboat", basicboatSchema);
