const express = require('express');
const { encryptPassword, decryptPassword } = require('../services/passwordService');

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

module.exports = router;
