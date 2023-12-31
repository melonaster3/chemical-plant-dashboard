
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Set the server port to the value in the PORT environment variable or 3001 if not defined
const { createUserTable } = require('./db/database'); // Import a connection pool and a function to create user tables from the database.js file
const cors = require('cors'); // Import the cors package, which helps with handling Cross-Origin Resource Sharing

app.use(express.json()); // Middleware to parse incoming JSON data
app.use(cors()); // Middleware to enable CORS for your server, allowing it to be accessed from other domains

// added to re connect to db in case db is added later for Docker
async function connectToDatabase() {
  return createUserTable().catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    // Retry the connection after a delay
    return new Promise((resolve) => setTimeout(resolve, 2000)).then(
      connectToDatabase
    );
  });
}

// Create tables
connectToDatabase()
  .then(() => {
    console.log("Dummy Data made");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });

// Start the server
app.use('/api', require('./routes/index.js'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the Express app
