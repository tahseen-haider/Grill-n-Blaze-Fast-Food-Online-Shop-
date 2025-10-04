require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

const app = express();

// ✅ parse first (do NOT parse raw stripe webhook here)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ✅ Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Passport
const passport = require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes (normal)
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/oauth", require("./routes/oauth.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/cart", require("./routes/cart.route"));
app.use("/api/orders", require("./routes/orders.route"));

// ✅ Stripe webhook route comes LAST
app.use("/api/stripe", require("./routes/stripeWebhook.route"));

// ✅ Export for Vercel
module.exports = app;

// ✅ Local start
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
}
