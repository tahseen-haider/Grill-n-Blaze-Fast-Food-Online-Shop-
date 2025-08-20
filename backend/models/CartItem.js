// models/User.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true },
  title: { type: String },
  price: { type: Number },
  rating: { type: Number },

}, { timestamps: true });

module.exports = mongoose.model("CartItem", cartItemSchema);
