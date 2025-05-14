import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // You'll create this for styles

const Home = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const studentsRef = collection(db, 'students');
    const unsubscribe = onSnapshot(
      studentsRef,
      (snapshot) => {
        const studentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsData);
        setFilteredStudents(studentsData);
      },
      (error) => {
        alert('Failed to fetch students');
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleCourseFilter = (course) => {
    setSelectedCourse(course);
    if (course) {
      setFilteredStudents(students.filter((student) => student.course === course));
    } else {
      setFilteredStudents(students);
    }
  };

  const handleStudentClick = (student) => {
    if (user) {
      setSelectedStudent(student);
    } else {
      alert('Please login to view student details');
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
      navigate('/');
    } catch (error) {
      alert('Failed to logout');
    }
  };

  const courses = [...new Set(students.map((student) => student.course))];

  return (
    <div className="container">
      <div className="header">
        <h1>Student Dashboard</h1>
        <div className="actions">
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <button onClick={() => navigate('/add-student')}>Add New Student</button>
              <button onClick={handleLogout} className="logout">Logout</button>
            </>
          ) : (
            <button onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </div>

      <select
        value={selectedCourse}
        onChange={(e) => handleCourseFilter(e.target.value)}
        className="dropdown"
      >
        <option value="">All Courses</option>
        {courses.map((course) => (
          <option key={course} value={course}>{course}</option>
        ))}
      </select>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td><span className="badge">{student.course}</span></td>
                <td>{student.mobile}</td>
                <td><button onClick={() => handleStudentClick(student)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedStudent(null)}>X</button>
            <h2>Student Details</h2>
            <div className="details">
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Course:</strong> <span className="badge">{selectedStudent.course}</span></p>
              <p><strong>Mobile:</strong> {selectedStudent.mobile}</p>
              <p><strong>DOB:</strong> {selectedStudent.dateOfBirth}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
              <p><strong>Emergency Contact:</strong> {selectedStudent.emergencyContact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
