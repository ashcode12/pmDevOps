const express = require('express');
const router = express.Router();
const vaultController = require('../controllers/vaultController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, vaultController.getVault);
router.post('/', authMiddleware, vaultController.addEntry);

module.exports = router;
