import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const studentsRef = collection(db, 'students');
    const unsubscribe = onSnapshot(studentsRef, (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    });

    return () => unsubscribe();
  }, []);

  const handleCourseFilter = (course) => {
    setSelectedCourse(course);
    setFilteredStudents(course ? students.filter(s => s.course === course) : students);
  };

  const handleStudentClick = (student) => {
    if (user) {
      setSelectedStudent(student);
      setIsModalOpen(true);
    } else {
      alert("Please login to view student details.");
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate('/');
    } catch (error) {
      alert("Failed to logout");
    }
  };

  const courses = [...new Set(students.map(s => s.course))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Student Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => navigate('/add-student')}
              >
                Add New Student
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <select
          value={selectedCourse}
          onChange={(e) => handleCourseFilter(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded"
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.email}</td>
                <td className="px-4 py-2 border">
                  <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {student.course}
                  </span>
                </td>
                <td className="px-4 py-2 border">{student.mobile}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleStudentClick(student)}
                    className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <div className="space-y-2">
              <div>
                <p className="font-medium">Name:</p>
                <p>{selectedStudent.name}</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p>{selectedStudent.email}</p>
              </div>
              <div>
                <p className="font-medium">Course:</p>
                <p>{selectedStudent.course}</p>
              </div>
              <div>
                <p className="font-medium">Mobile:</p>
                <p>{selectedStudent.mobile}</p>
              </div>
              <div>
                <p className="font-medium">Date of Birth:</p>
                <p>{selectedStudent.dateOfBirth}</p>
              </div>
              <div>
                <p className="font-medium">Address:</p>
                <p>{selectedStudent.address}</p>
              </div>
              <div>
                <p className="font-medium">Emergency Contact:</p>
                <p>{selectedStudent.emergencyContact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
