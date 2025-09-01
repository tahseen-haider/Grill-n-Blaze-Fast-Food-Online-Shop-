const app = require("../server");
const connectDB = require("../config/db");

// Connect to DB (for Vercel environment)
connectDB()
  .then(() => console.log("✅ MongoDB connected on Vercel"))
  .catch((err) => console.log(err));

module.exports = app;
