const express = require("express");
const cors = require("cors");
const generatePassword = require("./utils/passwordGenerator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Password Generation Route
app.get("/api/password/generate", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
