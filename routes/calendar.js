const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    addSchedule,
    getAllSchedules,
    deleteSchedule,
    updateSchedule
} = require('../controllers/calendarController');

router.post('/', auth, addSchedule);
router.get('/', auth, getAllSchedules);
router.delete('/:id', auth, deleteSchedule);
router.put('/:id', auth, updateSchedule); 

module.exports = router;
