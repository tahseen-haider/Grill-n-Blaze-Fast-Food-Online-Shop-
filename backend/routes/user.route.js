const express = require("express");
const User = require("../models/User");
const CartItem = require("../models/CartItem");
const authMiddleware = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/checkRoles");

const router = express.Router();

/**
 * Get Logged-in User Info + Cart Items (Protected)
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -resetToken -resetTokenExpire"
    );
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

// ✅ Admin-only dashboard route
router.get(
  "/admin/dashboard",
  authMiddleware,
  checkRole(["admin"]),
  async (req, res) => {
    try {
      // ✅ Get admin's full info from DB
      const admin = await User.findById(req.user.id).select(
        "-password -resetToken -resetTokenExpire"
      );

      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }

      // ✅ Get all users list
      const users = await User.find().select(
        "-password -resetToken -resetTokenExpire"
      );

      return res.json({
        admin, // ✅ Full admin details
        users, // ✅ All users list
      });
    } catch (err) {
      console.error("Admin Dashboard Error:", err);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
