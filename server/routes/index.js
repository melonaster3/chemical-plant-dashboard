// routes/index.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Database configuration for the routes file
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'mydb',
  password: 'labber',
  port: 5432,
});

router.get('/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM sensor_data'; // Replace with your actual table name
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

module.exports = router; // Export the router