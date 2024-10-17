const express = require('express');
const { getProfile, updateProfile } = require('../controllers/studentController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);

module.exports = router;
