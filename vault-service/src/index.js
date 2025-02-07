const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    req.user = user;
    next();
  });
};

// 🔐 In-memory storage for passwords (temporary)
const vault = {};

// 🔒 Encrypt passwords before storing
const encryptPassword = (password) => {
  const cipher = crypto.createCipher("aes-256-ctr", process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// 🔑 Decrypt passwords when retrieving
const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipher("aes-256-ctr", process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// 🔹 Store Password (POST /vault)
app.post("/vault", authenticateToken, (req, res) => {
  const { site, password } = req.body;
  if (!site || !password) {
    return res.status(400).json({ message: "Site and password are required" });
  }

  const userId = req.user.id;
  if (!vault[userId]) vault[userId] = [];

  const encryptedPassword = encryptPassword(password);
  vault[userId].push({ site, password: encryptedPassword });

  res.json({ message: "Password stored successfully" });
});

// 🔹 Retrieve Passwords (GET /vault)
app.get("/vault", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const storedPasswords = vault[userId] || [];

  const decryptedPasswords = storedPasswords.map((entry) => ({
    site: entry.site,
    password: decryptPassword(entry.password),
  }));

  res.json({ passwords: decryptedPasswords });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Vault service running on port ${PORT}`));
