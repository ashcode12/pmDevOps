const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080

app.use(express.json());

// Import and use routes
const passwordRoutes = require('./routes/passwordRoutes');
app.use(passwordRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Password Service is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
