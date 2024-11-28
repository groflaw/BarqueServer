const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" }, // user
  hostId: { type: mongoose.Schema.ObjectId, ref: "User" }, // host
  boatId: { type: mongoose.Schema.ObjectId, ref: "boat" }, // boat
  planId: { type: Number }, // plan
  status : {type : Number, default : 0}, // 0 : TobeConfirmed, 1 : Cancelled, 2 : Due, 3 : Confirmed. 
  date: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("reservation", reservationSchema);
