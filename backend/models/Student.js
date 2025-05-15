// server/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  mobile: String,
  dateOfBirth: String,
  address: String,
  emergencyContact: String,
});

module.exports = mongoose.model('Student', studentSchema);
