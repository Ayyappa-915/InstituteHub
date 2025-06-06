
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addResource,
  getAllResources,
  allocateResource,
  deallocateResource
} = require('../controllers/resourceController');

router.post('/', auth, addResource);
router.get('/', auth, getAllResources);

router.put('/allocate/:id', auth, allocateResource);
router.put('/deallocate/:id', auth, deallocateResource);

module.exports = router;
