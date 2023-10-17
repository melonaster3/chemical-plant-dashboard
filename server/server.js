
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { Pool } = require('pg');
const { pool, createUserTable } = require('./db/database');

app.use(express.json());




// Create tables
 createUserTable()
  .then(() => {
    console.log('Dummy Data made');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

// Other middleware and routes
// ...

// Start the server
app.use('/api', require('./routes/index.js'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the Express app
