const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createanyEvent,
    getAllEvents,
    deleteanyEvent,
    updateanyEvent
} = require('../controllers/eventController');

router.post('/', auth, createanyEvent);
router.get('/', auth, getAllEvents);
router.delete('/:id', auth, deleteanyEvent);
router.put('/:id', auth, updateanyEvent); 

module.exports = router;
