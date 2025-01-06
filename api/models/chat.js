const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean, // e.g., 'false' :  unread, 'true' : read
    default: false,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
