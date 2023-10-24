require('dotenv').config(); // Load environment variables from the .env file

const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router
const { Pool } = require('pg'); // Import the Pool class from the pg library for database connections

// Database configuration for the routes file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL environment variable
});

// Define a route that handles HTTP GET requests to '/data'
router.get('/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM sensor_data'; // Define a SQL query to select all data from a table (replace 'sensor_data' with your actual table name)
    const result = await pool.query(query); 
    res.status(200).json(result.rows); // Send a JSON response with the query result data when successful
  } catch (error) {
    console.error(error); // Log any errors to the console
    res.status(500).json({ error: 'An error occurred while fetching data' }); // Send a 500 Internal Server Error response if an error occurs
  }
});

module.exports = router; // Export the router to be used in other parts of the application