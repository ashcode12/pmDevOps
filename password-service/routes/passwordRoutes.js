const express = require('express');
const { encryptPassword, decryptPassword } = require('../services/passwordService');
const generatePassword = require('../utils/passwordGenerator');

const router = express.Router();

// Encrypt a password
router.post('/encrypt', (req, res) => {
    const { password } = req.body;
    const encryptedPassword = encryptPassword(password);
    res.json({ encryptedPassword });
});

// Decrypt a password
router.post('/decrypt', (req, res) => {
    const { encryptedPassword } = req.body;
    const password = decryptPassword(encryptedPassword);
    res.json({ password });
});

// Generate a secure password
router.post('/generate-password', (req, res) => {
    const {
        length,
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSpecialChars,
    } = req.body;

    try {
        const password = generatePassword({
            length,
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSpecialChars,
        });
        res.json({ password });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
