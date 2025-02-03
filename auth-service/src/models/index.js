const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();
const app = express();
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

pool.connect()
    .then(() => console.log('Connected to Auth DB'))
    .catch(err => console.error('Database connection error:', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Auth Service Running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
