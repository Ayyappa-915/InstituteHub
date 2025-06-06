
const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const { content, recipientRole } = req.body;
    const userId = req.user.userId;
    const role = req.user.role;

    const message = await Message.create({
      content,
      recipientRole,
      senderId: userId,
      senderRole: role, 
      timestamp: new Date()
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: 'Message sending failed', details: err.message });
  }
};


exports.getMessagesByRole = async (req, res) => {
  try {
    const messages = await Message.find({ recipientRole: req.params.role }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Fetching messages failed', details: err.message });
  }
};
