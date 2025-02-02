require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // This imports our db instance
const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Health route
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Mount routes
app.use('/auth', authRoutes);
app.use('/vault', vaultRoutes);

const PORT = process.env.PORT || 3000;

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to sync DB:', err);
  });

module.exports = app; // Exporting for testing if needed
