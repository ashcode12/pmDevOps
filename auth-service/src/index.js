const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Add this middleware to parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "superSecret";

// Hardcoded users
const users = [
  { id: 1, username: "admin", password: "password123" },
  { id: 2, username: "user", password: "mypassword" },
];

// 🔐 Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// 👤 Get User Profile (Requires JWT)
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});

// Start the Auth Service
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
