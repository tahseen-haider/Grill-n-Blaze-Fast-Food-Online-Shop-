// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

// serialize/deserialize required for passport session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/**
 * Helper used by both strategies:
 * - If a user with providerId exists -> return it.
 * - Else if a user with same email exists -> link provider to that user.
 * - Else create a new user with provider info.
 */
async function handleOAuth(profile, provider) {
  const providerIdField = provider === "google" ? "googleId" : "facebookId";
  const providerId = profile.id;
  const email = profile.emails?.[0]?.value || null;
  const name = profile.displayName || "";
  const photo = profile.photos?.[0]?.value || "";

  // 1) Try find by provider id
  let user = await User.findOne({ [providerIdField]: providerId });
  if (user) return user;

  // 2) Try find by email -> link provider id
  if (email) {
    user = await User.findOne({ email });
    if (user) {
      user[providerIdField] = providerId;
      user.profilePic = user.profilePic || photo;
      user.isVerified = true; // OAuth email considered verified
      await user.save();
      return user;
    }
  }

  // 3) Create new user
  user = await User.create({
    name,
    email,
    profilePic: photo,
    isVerified: true,
    [providerIdField]: providerId
  });

  return user;
}

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/oauth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await handleOAuth(profile, "google");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/oauth/facebook/callback`,
  profileFields: ["id", "displayName", "emails", "photos"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await handleOAuth(profile, "facebook");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

module.exports = passport;
