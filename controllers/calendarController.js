const Schedule = require('../models/Schedule');
const User = require('../models/User');

exports.addSchedule = async (req, res) => {
  try {
    const { title, description, date, type } = req.body;
    const userId = req.user.userId; 
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const schedule = await Schedule.create({
      title,
      description,
      date,
      type,
      createdBy: userId
    });

    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: 'Schedule creation failed', details: err.message });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: 1 });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Fetching schedules failed' });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Schedule deletion failed' });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { title, description, date, type },
      { new: true }
    );

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    res.json(schedule);
  } catch (err) {
    res.status(400).json({ error: 'Schedule update failed', details: err.message });
  }
};
