const express = require('express');
const { uploadFile, readFile, deleteFile } = require('../controllers/fileController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload', auth, uploadFile);
router.get('/read/:filename', readFile);
router.delete('/delete', auth, deleteFile);

module.exports = router;
