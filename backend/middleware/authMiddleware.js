const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      const [scheme, credentials] = req.headers.authorization.split(" ");
      if (scheme === "Bearer" && credentials) {
        token = credentials;
      }
    }

    if (!token) {
      return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach only essential user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role || "user",
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token expired. Please log in again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ msg: "Invalid token. Authentication failed." });
    }
    return res.status(500).json({ msg: "Server error during authentication." });
  }
};

module.exports = authMiddleware;
