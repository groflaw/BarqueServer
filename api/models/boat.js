const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" }, // host
  model: { type: String },
  description: { type: String },
  location1: { type: String },
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
  docImage: {
    navigation: { type: String },
    authorization: { type: String },
  },
  location2: {
    boatname: { type: String },
    locationtype: { type: Number },
    marinaname: { type: String },
    address: { type: String },
  },
  boatImage: {
    cover: { type: String },
    photo2: { type: String },
    photo3: { type: String },
    photo4: { type: String },
    photo5: { type: String },
  },
  cancellation: { type: Number },
  accessories: { type: [{ type: Number }] },
  allowes: { type: [{ type: Number }] },
  flag: { type: Boolean, default: false },
  reviews:{type : [
    {
      customer : {type: String },
      review : {type : Number},
      date : {type : Date},
    }
  ]}
});

module.exports = mongoose.model("boat", userSchema);
