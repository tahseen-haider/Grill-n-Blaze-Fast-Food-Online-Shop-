const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendEmail } = require("../utils/email");

const router = express.Router();

// Helper: Create JWT
const createToken = (userId, role, expiresIn = "7d") => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Register: Create user, hash password, send verification email
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    // Create short-lived token for email verification
    const token = createToken(user._id, user.role, "1h");
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
        <p>Hello ${name},</p>
        <p>Please click <a href="${verifyUrl}">here</a> to verify your email. This link expires in 1 hour.</p>
      `,
    });

    return res.status(201).json({
      msg: "Registration successful. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Verify Email: Activate account
 */
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await User.findByIdAndUpdate(decoded.id, { isVerified: true });

    return res.json({ msg: "Email verified successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "Invalid or expired verification token" });
  }
});

/**
 * Login: Authenticate user
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ msg: "Please verify your email first" });

    const token = createToken(user._id, user.role, "7d");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ msg: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Logout: Clear token
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", // ✅ Required to match original cookie
  });
  return res.status(200).json({ msg: "Logged out successfully" });
});

/**
 * Forgot Password: Send reset link
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ msg: "If that email exists, we sent a reset link" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    await sendEmail({
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    return res.json({ msg: "Password reset link sent if email exists" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Reset Password
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { token, id, newPassword } = req.body;
    if (!token || !id || !newPassword)
      return res.status(400).json({ msg: "Invalid request" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      resetToken: hashedToken,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    return res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
