const Student = require('../models/Student');

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    let student = await Student.findById(req.student.id);

    if (student) {
      student.name = name || student.name;
      student.email = email || student.email;

      await student.save();
      return res.json(student);
    }

    res.status(404).json({ msg: 'Student not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
