import { useEffect, useState } from "react";
import axios from "../api/mockApi";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/students");
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const courses = ["All", ...new Set(students.map((s) => s.course))];

  const filteredStudents = filteredCourse === "All"
    ? students
    : students.filter((s) => s.course === filteredCourse);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      {auth.currentUser ? (
        <div>
          <p>Welcome, <strong>{auth.currentUser.email}</strong></p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please <a href="/login">Login</a> to add students.</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <label>Filter by course: </label>
        <select
          value={filteredCourse}
          onChange={(e) => setFilteredCourse(e.target.value)}
        >
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <ul style={{ marginTop: "20px" }}>
          {filteredStudents.map((student) => (
            <li key={student.id}>
              <strong>{student.name}</strong> ({student.email}) - {student.course}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
