
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: { type: String, enum: ['available', 'allocated'], default: 'available' },
  allocatedTo: { type: String, default: null } 
});

module.exports = mongoose.model('Resource', resourceSchema);
