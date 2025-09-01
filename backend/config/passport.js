const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/**
 * Handles OAuth user logic:
 * 1. If user exists by Google ID -> return it
 * 2. If user exists by email -> link Google ID + keep existing profilePic if set
 * 3. Otherwise create a new user with Google data
 */
async function handleOAuth(profile) {
  const providerIdField = "googleId";
  const providerId = profile.id;
  const email = profile.emails?.[0]?.value || null;
  const name = profile.displayName || "";
  const photo = profile.photos?.[0]?.value
    ? profile.photos[0].value.replace("s96-c", "s400-c") // higher resolution
    : "";

  // 1) Find by Google ID
  let user = await User.findOne({ [providerIdField]: providerId });
  if (user) return user;

  // 2) Find by email and link Google ID
  if (email) {
    user = await User.findOne({ email });
    if (user) {
      user[providerIdField] = providerId;
      if (!user.profilePic || user.profilePic === "/images/default-avatar.webp") {
        user.profilePic = photo;
      }
      user.isVerified = true; // Email verified via Google
      await user.save();
      return user;
    }
  }

  // 3) Create new user
  user = await User.create({
    name,
    email,
    profilePic: photo || "/images/default-avatar.webp",
    isVerified: true,
    [providerIdField]: providerId,
  });

  return user;
}

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/oauth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleOAuth(profile);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
