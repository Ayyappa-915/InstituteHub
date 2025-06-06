const User = require('../models/User');
const Task = require('../models/Task');
const Event = require('../models/Event');
const Resource = require('../models/Resource');

exports.generateReport = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const events = await Event.countDocuments();
        const taskStats = await Task.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const availableResources = await Resource.countDocuments({ status: 'available' });
        const allocatedResources = await Resource.countDocuments({ status: 'allocated' });

        res.json({
            users,
            events,
            tasks: taskStats,
            resources: {
                available: availableResources,
                allocated: allocatedResources
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Report generation failed' });
    }
};
