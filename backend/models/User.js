// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: { type: String, default: "user", enum: ["user", "admin"] },
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },

    isVerified: { type: Boolean, default: false },

    // OAuth ids
    googleId: { type: String, index: true, sparse: true },

    profilePic: { type: String, default: "/images/default-avatar.webp" },

    // reset token for password resets
    resetToken: String,
    resetTokenExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
