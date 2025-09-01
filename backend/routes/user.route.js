const express = require("express");
const User = require("../models/User");
const CartItem = require("../models/CartItem");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Get Logged-in User Info + Cart Items (Protected)
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -resetToken -resetTokenExpire");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const cartItems = await CartItem.find({ userId: req.user.id });

    return res.json({
      user,
      cartItems,
    });
  } catch (err) {
    console.error("Get User Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
