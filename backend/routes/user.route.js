const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ msg: "Not Authorized!" });
    }

    // req.user comes from passport.deserializeUser()
    return res.status(200).json({
      // user: {
      //   id: req.user._id,
      //   username: req.user.username,
      //   email: req.user.email,
      //   profilePic: req.user.profilePic || "/images/default-avatar.webp",
      // },
    });
  } catch (err) {
    console.error("❌ Error in /profile:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
