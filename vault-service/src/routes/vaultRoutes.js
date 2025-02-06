const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const vault = []; // Placeholder for database

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
};

// Store Password
router.post("/store", authenticate, (req, res) => {
    const { password } = req.body;
    const encryptedPassword = crypto.createCipher("aes-256-cbc", process.env.ENCRYPTION_KEY).update(password, "utf8", "hex");
    vault.push({ username: req.user.username, password: encryptedPassword });
    res.json({ message: "Password stored securely" });
});

// Retrieve Passwords
router.get("/", authenticate, (req, res) => {
    const userVault = vault.filter((entry) => entry.username === req.user.username);
    res.json(userVault);
});

module.exports = router;
