const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import the routes
const routes = require('./routes/index');

// Middleware to parse JSON data
app.use(express.json());

// Use the routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});