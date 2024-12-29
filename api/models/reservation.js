const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" }, // user
  hostId: { type: mongoose.Schema.ObjectId, ref: "User" }, // host
  boatId: { type: mongoose.Schema.ObjectId, ref: "boat" }, // boat
  planId: { type: Number }, // plan
  count : {type : Number}, // Number of Passengers
  start : {type : Date},
  end : {type : Date},
  status: { type: Number, default: 0 }, // 0 : TobeConfirmed, 1 : Cancelled, 2 : Due, 3 : Confirmed.
  paid: { type: Number },
  paymethod: { type: Number, default: 0 }, // 0: cash,1: card,2: Zelle,3 : binance,4 : paypal, 5 : bank
  confrimID: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("reservation", reservationSchema);
