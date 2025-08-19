// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendEmail } = require("../utils/email");

const router = express.Router();

// Helper: create JWT (1h default)
const createToken = (userId, expiresIn = "1h") => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Register: create user (hashed password), generate verification token, send email.
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashed,
      isVerified: false,
    });

    // create verification token (short-lived)
    const token = createToken(user._id, "1d");
    const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<p>Hello ${name || ""},</p>
             <p>Click <a href="${url}">here</a> to verify your email.</p>
             <p>If you didn't request this, ignore.</p>`,
    });

    return res.json({
      msg: "Registered. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Verify Email: user clicks link -> frontend hits this route, token -> set isVerified
 */
router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { isVerified: true });
    return res.json({ msg: "Email verified" });
  } catch (err) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }
});

/**
 * Login: validate password, ensure verified, sign JWT, set httpOnly cookie
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ msg: "Please verify your email first" });

    const token = createToken(user._id, "1h");

    // Set secure flags in production (secure: true)
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // enable for HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ msg: "Logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Logout: clear cookie
 */
router.post("/logout", (req, res) => {
  console.log("logging out")
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ msg: "Logged out" });
});

/**
 * Forgot Password: create reset token, send email
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ msg: "If that email exists, a reset email has been sent." });

    // Create a token and store hashed token in DB for extra safety
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    await sendEmail({
      to: user.email,
      subject: "Password reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    return res.json({
      msg: "If that email exists, a reset email has been sent.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Reset Password: frontend posts new password with token and user id
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
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Protected test route
 */
const authMiddleware = require("../middleware/authMiddleware");
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -resetToken -resetTokenExpire"
  );
  res.json({ user });
});

module.exports = router;
