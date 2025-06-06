const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/reportController');

router.get('/', auth, generateReport);

module.exports = router;
