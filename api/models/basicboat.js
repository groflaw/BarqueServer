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
        name: { type: String },
        description: { type: String },
      },
    ],
  },
  accessories: {
    type: [
      {
        _id: { type: Number },
        icon: { type: String },
        title: { type: String },
      },
    ],
  },
  allowes: {
    type: [
      {
        _id: { type: Number },
        icon: { type: String },
        title: { type: String },
      },
    ],
  },
  servicefee: {
    type: Number,
    default: 10,
  },
  payment: {
    Zelle: {
      status : {type : Boolean, default : false},
      name: { type: String },
      email: { type: String },
    },
    Binance: {
      status : {type : Boolean, default : false},
      name: { type: String },
      email: { type: String },
      ID: { type: String },
    },
    PayPal: {
      status : {type : Boolean, default : false},
      name: { type: String },
      email: { type: String },
    },
    Bank: {
      status : {type : Boolean, default : false},
      bank: { type: String },
      name: { type: String },
      email: { type: String },
      accoountN: { type: String },
      aba: { type: String },
      address: {
        type: String,
      },
      switf: { type: String },
    },
  },
});

module.exports = mongoose.model("basicboat", basicboatSchema);
