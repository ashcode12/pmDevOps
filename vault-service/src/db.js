const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

const createVaultTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS vault_entries (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            site VARCHAR(255) NOT NULL,
            encrypted_password TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;
    try {
        await pool.query(query);
        console.log("Vault entries table created");
    } catch (err) {
        console.error("Error creating vault table:", err);
    }
};

createVaultTable();
