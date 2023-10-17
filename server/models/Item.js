const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Item', itemSchema);