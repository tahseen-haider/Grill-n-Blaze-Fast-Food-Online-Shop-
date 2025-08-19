const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Not Authorized!" });

    // Decode JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id).select(
      "-password -resetToken -resetTokenExpire -__v"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({ user });
  } catch (err) {
    console.error("❌ Error in /profile:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
