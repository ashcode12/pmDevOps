require('dotenv').config();
const express = require('express');
const passwordGenerator = require('./utils/passwordGenerator');
const passwordStrength = require('./utils/passwordStrength');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.get('/generate', (req, res) => {
  const length = parseInt(req.query.length) || 16;
  const password = passwordGenerator(length);
  res.json({ password });
});

app.post('/strength', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  const score = passwordStrength(password);
  res.json({ strength: score });
});

app.listen(PORT, () => {
  console.log(`Utility Service running on port ${PORT}`);
});
