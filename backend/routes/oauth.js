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
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Option A: redirect with token in query (frontend to store it)
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);

    // Option B (alternative): set cookie and redirect without token in query:
    // res.cookie("token", token, { httpOnly: true, sameSite: 'lax', maxAge: 3600000 });
    // res.redirect(process.env.CLIENT_URL);
  }
);

// Kick off Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

module.exports = router;
