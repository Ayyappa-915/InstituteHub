const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, userId, email, password, role } = req.body;

  if (!name || !userId || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ error: "User ID already exists" });
    }

    const user = await User.create({ name, userId, email, password, role });
    res.status(201).json({ message: " User registered successfully", userId: user.userId });
  } catch (err) {
    res.status(400).json({ error: " Registration failed", details: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: " Invalid email or password" });
    }

    const token = jwt.sign(
  {
    uid: user.userId, 
    role: user.role,
    name: user.name
  },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);


    res.json({
      token,
      name: user.name,
      role: user.role,
      userId: user.userId
    });
  } catch (err) {
    res.status(500).json({ error: " Login failed", details: err.message });
  }
};
