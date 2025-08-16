// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String }, // hashed password for local auth
  isVerified: { type: Boolean, default: false },

  // OAuth ids
  googleId: { type: String, index: true, sparse: true },

  profilePic: { type: String },

  // reset token for password resets
  resetToken: String,
  resetTokenExpire: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
