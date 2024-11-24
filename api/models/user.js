const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  address: { type: String },
  country: { type: String },
  city: { type: String },
  email: { type: String, required: true },
  birthDay: { type: Date, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  notification: {
    newoffer: { type: Boolean, default: false },
    allnotifi: { type: Boolean, default: false },
  },
  cohost: { type: mongoose.Schema.ObjectId, ref: "User" },
  idNumber: { type: Number },
  idImage: {
    front: { type: String },
    back: { type: String },
  },
  review : {type : Number, default : 0},
  booking : {type : Number, default : 0},
  resrate : {type : Number, default : 0},
});

module.exports = mongoose.model("User", userSchema);
