const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createTask,
    getAllTasks,
    updateTaskStatus
} = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/', auth, getAllTasks);
router.put('/:id', auth, updateTaskStatus);

module.exports = router;
