

const { Pool } = require('pg');
const {dummyDatasets, generateData} = require('./dummyData.js'); // Import the data

const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'mydb',
  password: 'labber',
  port: 5432,
});

// Function to create tables
const createUserTable = async () => {
  const deleteDataQuery = `
  DELETE FROM sensor_data
`;

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

const insertData = async (data) => {
    const { timestamp, temperature, pressure, level1_chemical, level2_chemical } = data;
    const query = `
      INSERT INTO sensor_data (timestamp, temperature, pressure, level1_chemical, level2_chemical)
      VALUES ($1, $2, $3, $4, $5)
    `;
  
    try {
      await pool.query(query, [timestamp, temperature, pressure, level1_chemical, level2_chemical]);
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  // Insert the dummy data into the database
  await pool.query(deleteDataQuery);

  dummyDatasets.forEach((data) => {
    insertData(data);
  });
  const simulatedData = generateData();
  simulatedData.forEach((data) => {
    insertData(data);
  });
  
  pool.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created (if it did not already exist).');
    }
  });
  
  
};

module.exports = {
  pool,
  createUserTable,
};