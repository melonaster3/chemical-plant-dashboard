 
// DummyDataset 
 const dummyDatasets = [
    {
      timestamp: "2023-10-13T00:00:00Z",
      temperature: 24.5,
      pressure: 1019.8,
      level1_chemical: 74.2,
      level2_chemical: 59.8,
     },
    {
      timestamp: "2023-10-13T00:05:00Z",
      temperature: 24.7,
      pressure: 1020.0,
      level1_chemical: 74.5,
      level2_chemical: 60.0,
    },
    {
      timestamp: "2023-10-13T00:10:00Z",
      temperature: 24.8,
      pressure: 1020.2,
      level1_chemical: 74.7,
      level2_chemical: 60.2,
    },
    {
      timestamp: "2023-10-13T00:15:00Z",
      temperature: 24.3,
      pressure: 1010.2,
      level1_chemical: 75,
      level2_chemical: 62.2,
    },
    {
      timestamp: "2023-10-13T00:20:00Z",
      temperature: 24.8,
      pressure: 1000.2,
      level1_chemical: 74.0,
      level2_chemical: 60.7,
    },
    {
      timestamp: "2023-10-13T00:25:00Z",
      temperature: 25,
      pressure: 1020.2,
      level1_chemical: 74.9,
      level2_chemical: 59.2,
    },
    {
      timestamp: "2023-10-13T00:30:00Z",
      temperature: 25.3,
      pressure: 1025.2,
      level1_chemical: 75.7,
      level2_chemical: 54.2,
    },
    {
      timestamp: "2023-10-13T00:35:00Z",
      temperature: 24.2,
      pressure: 1027.2,
      level1_chemical: 76.7,
      level2_chemical: 57.2,
 
    },
    {
      timestamp: "2023-10-13T00:40:00Z",
      temperature: 24.0,
      pressure: 1028.2,
      level1_chemical: 74.3,
      level2_chemical: 59.2,
 
    },
    {
      timestamp: "2023-10-13T00:45:00Z",
      temperature: 25.8,
      pressure: 1023.2,
      level1_chemical: 72.7,
      level2_chemical: 60.9,
 
    },
    {
      timestamp: "2023-10-13T00:50:00Z",
      temperature: 22.8,
      pressure: 1021.2,
      level1_chemical: 71.7,
      level2_chemical: 60.1,
 
    },
    {
      timestamp: "2023-10-13T00:55:00Z",
      temperature: 24.8,
      pressure: 1020.9,
      level1_chemical: 74.7,
      level2_chemical: 59.2,
 
    },
  ]; 


// Function to generate simulated sensor data
const generateData = () => {
  // Set an initial timestamp for the data
  const timestamp = new Date('2023-10-13T01:00:00Z');
  const data = [];

  // Loop to generate data for a week (10080 records, 5 minutes apart)
  for (let i = 0; i < 10080; i++) {
    // Generate random values for temperature, pressure, and two chemical levels
    const temperature = (Math.random() * (30 - 20) + 20).toFixed(1);
    const pressure = (Math.random() * (1030 - 1000) + 1000).toFixed(1);
    const level1_chemical = (Math.random() * (80 - 60) + 60).toFixed(1);
    const level2_chemical = (Math.random() * (70 - 50) + 50).toFixed(1);

    // Add the generated data to the 'data' array
    data.push({
      timestamp: timestamp.toISOString(),
      temperature,
      pressure,
      level1_chemical,
      level2_chemical,
    });

    // Increment the timestamp by 5 minutes for the next data point
    timestamp.setMinutes(timestamp.getMinutes() + 5);
  }

  // Return the array containing the generated data
  return data;
};

  module.exports = {dummyDatasets, generateData};
