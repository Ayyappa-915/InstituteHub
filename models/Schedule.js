
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    type: { type: String, enum: ['class', 'meeting', 'deadline', 'other'], default: 'other' },
    createdBy: { type: String }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
