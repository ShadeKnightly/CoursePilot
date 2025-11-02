import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import "../../styles/AdminStudents.css";

const AdminStudents = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulated API call
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          name: "Discrete Mathematics",
          students: [
            { id: 1, name: "Alice Johnson", email: "alice@school.com" },
            { id: 2, name: "Bob Smith", email: "bob@school.com" },
            { id: 3, name: "Charlie Brown", email: "charlie@school.com" },
          ],
        },
        {
          id: 2,
          name: "Web Development",
          students: [
            { id: 4, name: "Daniel Kim", email: "daniel@school.com" },
            { id: 5, name: "Emma Wilson", email: "emma@school.com" },
          ],
        },
        {
          id: 3,
          name: "Programming Fundamentals",
          students: [
            { id: 6, name: "George Lopez", email: "george@school.com" },
            { id: 7, name: "Hannah Davis", email: "hannah@school.com" },
          ],
        },
      ]);
    }, 1000);
  }, []);

  // Filter courses and students by search term
  const filteredCourses = courses
    .filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((course) => ({
      ...course,
      students: course.students.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="admin-layout">
      <Menu admin={true} />

      <div className="admin-container">
        <div className="admin-header">
          <h1>Students</h1>
          <input
            type="text"
            placeholder="Search by course or student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search"
          />
        </div>

        <div className="courses-list">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div
                className="course-header"
                onClick={() => toggleExpand(course.id)}
              >
                <h2>{course.name}</h2>
                <span>{course.students.length} students</span>
                <button className="toggle-btn">
                  {expanded === course.id ? "−" : "+"}
                </button>
              </div>

              <div
                className={`students-collapse ${
                  expanded === course.id ? "open" : ""
                }`}
              >
                <div className="students-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.students.map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
