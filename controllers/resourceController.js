const Resource = require('../models/Resource');
const User = require('../models/User');

exports.addResource = async (req, res) => {
  try {
    const resource = await Resource.create({
      name: req.body.name,
      type: req.body.type,
      status: 'available'
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: 'Resource creation failed' });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Fetching resources failed' });
  }
};

exports.allocateResource = async (req, res) => {
    try {
        const { allocatedTo } = req.body;
        const resourceId = req.params.id;

        const user = await User.findOne({ userId: allocatedTo });
        if (!user) {
            return res.status(404).json({ error: 'User not found for given userId' });
        }

        const resource = await Resource.findByIdAndUpdate(
            resourceId,
            { status: 'allocated', allocatedTo: user.userId },
            { new: true }
        );

        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        res.json(resource);
    } catch (err) {
        console.error('Allocation error:', err);
        res.status(400).json({ error: 'Allocation failed' });
    }
};

exports.deallocateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { status: 'available', allocatedTo: null },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Deallocation failed' });
  }
};
