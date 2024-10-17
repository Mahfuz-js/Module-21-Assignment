const multer = require('multer');
const Student = require('../models/Student');
const path = require('path');

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single('profilePicture');

exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      const student = await Student.findById(req.student.id);
      student.profilePicture = req.file.path;
      await student.save();
      res.json({ filePath: req.file.path });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
};

exports.readFile = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filePath);
};

exports.deleteFile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    if (student.profilePicture) {
      fs.unlinkSync(student.profilePicture);
      student.profilePicture = null;
      await student.save();
      res.json({ msg: 'File deleted' });
    } else {
      res.status(404).json({ msg: 'No file found' });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
