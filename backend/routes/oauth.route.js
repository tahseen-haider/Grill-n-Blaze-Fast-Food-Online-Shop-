const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=OAuthFailed`
        );
      }

      // Create JWT with user ID and role
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role || "user" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirect user to client
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      console.error("OAuth Callback Error:", err);
      return res.redirect(`${process.env.CLIENT_URL}/login?error=ServerError`);
    }
  }
);

module.exports = router;
