const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  recipientRole: { type: String, enum: ['admin', 'faculty', 'student'] },
  senderId: { type: String },
  senderRole: { type: String, enum: ['admin', 'faculty', 'student'] }, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
