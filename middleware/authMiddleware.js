// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ userId: decoded.uid });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token userId" });
    }

    req.user = {
      _id: user._id,
      role: user.role,
      name: user.name,
      userId: user.userId,
      email: user.email
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};
