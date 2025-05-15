import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    customCourse: '',
    mobile: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.mobile || !formData.address) {
      setError('All fields are required');
      return;
    }

    const finalCourse = formData.course === 'other' ? formData.customCourse : formData.course;

    try {
      await addDoc(collection(db, 'students'), {
        ...formData,
        course: finalCourse,
        timestamp: serverTimestamp()
      });
      setSuccess('Student added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding student:', error);
      setError('Failed to add student');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Student</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter student email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            >
              <option value="">Select course</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.course === 'other' && (
            <div>
              <label className="block text-sm font-medium mb-1">Specify Course</label>
              <input
                name="customCourse"
                value={formData.customCourse}
                onChange={handleChange}
                placeholder="Enter course name"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Emergency Contact</label>
            <input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Enter emergency contact number"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
