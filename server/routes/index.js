// routes/index.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Database configuration for the routes file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || "labber",
  port: parseInt(process.env.DB_PORT),
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