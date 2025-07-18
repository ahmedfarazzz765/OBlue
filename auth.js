const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = []; // In-memory user store, replace with DB in production
const JWT_SECRET = 'your_jwt_secret_key'; // Use env variable in production

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email and password' });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, email, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username: user.username });
});

module.exports = router;
