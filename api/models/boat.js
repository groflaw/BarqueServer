const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  model: { type: String },
  description: { type: String },
  location: { type: String },
  year: { type: Number },
  size: { type: Number },
  boattype: { type: Number },
  boatbrand: { type: Number },
  enginecount: { type: Number },
  bathroomcount: { type: Number },
  power: { type: Number },
  capacity: { type: Number },
  cabinscount: { type: Number },
  plans: {
    type: [
      {
        _id: { type: Number },
        price: { type: Number },
        description: { type: String },
        start: { type: Date },
        end: { type: Date },
        captain: { type: Number },
      },
    ],
  },
});

module.exports = mongoose.model("boat", userSchema);
