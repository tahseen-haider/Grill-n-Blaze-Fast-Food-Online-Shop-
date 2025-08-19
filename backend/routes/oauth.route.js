// routes/oauth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

// Kick off Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    // req.user is available
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // set cookie and redirect without token in query:
    res.cookie("token", token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect(process.env.CLIENT_URL);
  }
);

module.exports = router;
