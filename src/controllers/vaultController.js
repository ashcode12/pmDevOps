const crypto = require('crypto');
const { VaultEntry } = require('../models');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; 
// 32 bytes for AES-256

function encryptPassword(plainText) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptPassword(encryptedText) {
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const content = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

exports.getVault = async (req, res) => {
  try {
    const entries = await VaultEntry.findAll({ where: { userId: req.userId } });
    const result = entries.map(e => ({
      id: e.id,
      title: e.title,
      password: decryptPassword(e.encryptedPassword) // or you can omit if you want to keep it encrypted
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addEntry = async (req, res) => {
  try {
    const { title, password } = req.body;
    const encrypted = encryptPassword(password);

    const entry = await VaultEntry.create({
      title,
      encryptedPassword: encrypted,
      userId: req.userId
    });
    res.json({ message: 'Entry created', entryId: entry.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
