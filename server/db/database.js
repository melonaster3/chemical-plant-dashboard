// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const { Pool } = require('pg');
const { dummyDatasets, generateData } = require('./dummyData.js'); // Import the data

// Create a PostgreSQL database connection pool with configuration from environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || "labber", // Use a default password if not provided
  port: parseInt(process.env.DB_PORT),
});

// Function to create tables
const createUserTable = async () => {
  // SQL query to delete the 'sensor_data' table if it already exists
  const deleteDataQuery = `
    DROP TABLE IF EXISTS sensor_data;
  `;

  // SQL query to create the 'sensor_data' table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sensor_data (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP,
      temperature NUMERIC,
      pressure NUMERIC,
      level1_chemical NUMERIC,
      level2_chemical NUMERIC
    )
  `;

  // Function to insert data into the 'sensor_data' table
  const insertData = async (data) => {
    const { timestamp, temperature, pressure, level1_chemical, level2_chemical } = data;
    const query = `
      INSERT INTO sensor_data (timestamp, temperature, pressure, level1_chemical, level2_chemical)
      VALUES ($1, $2, $3, $4, $5)
    `;

    try {
      // Insert data into the 'sensor_data' table
      await pool.query(query, [timestamp, temperature, pressure, level1_chemical, level2_chemical]);
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  // Delete any existing 'sensor_data' table
  await pool.query(deleteDataQuery);

  // Create the 'sensor_data' table if it doesn't exist
  pool.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created (if it did not already exist).');
    }
  });

  // Insert data from dummy datasets into the 'sensor_data' table
  dummyDatasets.forEach((data) => {
    insertData(data);
  });

  // Generate simulated data and insert it into the 'sensor_data' table
  const simulatedData = generateData();
  simulatedData.forEach((data) => {
    insertData(data);
  });
};

// Export the database connection pool and the createUserTable function
module.exports = {
  pool,
  createUserTable,
};