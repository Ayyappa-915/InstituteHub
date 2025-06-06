// controllers/taskController.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body); // body must contain userId
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Task creation failed' });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Fetching tasks failed' });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Task update failed' });
    }
};
