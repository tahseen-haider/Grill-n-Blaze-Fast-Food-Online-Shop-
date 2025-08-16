// server.js
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

const app = express();

// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS: allow credentials for cookie & passport
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Sessions for passport (store in Mongo so sessions persist)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      // secure: true, // enable with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// passport setup
const passport = require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/oauth", require("./routes/oauth"));

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
// Connect DB
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
