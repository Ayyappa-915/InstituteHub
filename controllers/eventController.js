const Event = require('../models/Event');
const User = require('../models/User');

exports.createanyEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const userId = req.user.userId; 

    const event = await Event.create({
      title,
      description,
      date,
      createdByUserId: userId
    });

    res.json(event);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(400).json({ error: 'Event creation failed' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: 'Fetching events failed' });
  }
};

exports.deleteanyEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(400).json({ error: 'Event deletion failed' });
  }
};

exports.updateanyEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(400).json({ error: 'Event update failed' });
  }
};
