const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    sendMessage,
    getMessagesByRole
} = require('../controllers/messageController');

router.post('/', auth, sendMessage);
router.get('/:role', auth, getMessagesByRole);

module.exports = router;
