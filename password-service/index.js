const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const passwordRoutes = require('./routes/passwordRoutes');
app.use('/passwords', passwordRoutes);

// Start server
app.listen(port, () => {
    console.log(`Password Service running on port ${port}`);
});
