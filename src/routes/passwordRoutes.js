const express = require("express");
const generatePassword = require("../utils/passwordGenerator");

const router = express.Router();

router.get("/generate", (req, res) => {
  try {
    const { length, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars } = req.query;

    const password = generatePassword({
      length: parseInt(length) || 16,
      includeLowercase: includeLowercase !== "false",
      includeUppercase: includeUppercase !== "false",
      includeNumbers: includeNumbers !== "false",
      includeSpecialChars: includeSpecialChars !== "false",
    });

    res.status(200).json({ password });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
