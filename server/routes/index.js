const express = require('express');
const router = express.Router();

// Define a route to get a list of items
router.get('/api/items', (req, res) => {
  // Replace this with logic to fetch items from a database or another source
  const items = ['Item 1', 'Item 2', 'Item 3'];
  res.json(items);
});

// Add more routes as needed

module.exports = router;