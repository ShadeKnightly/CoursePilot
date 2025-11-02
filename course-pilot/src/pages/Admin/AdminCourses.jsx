import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu.jsx";
import Search from "../../components/Search/search";
import Card from "../../components/card/cardComponent";
import "../../styles/AdminCourses.css"; // shared styles for consistency

// Fake API data
const fakeInitialCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Intro to Computer Science",
    room: "A101",
    instructor: "John Doe",
    days: ["Mon", "Wed", "Fri"],
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description: "Basics of CS",
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures",
    room: "B202",
    instructor: "Jane Smith",
    days: ["Tue", "Thu"],
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description: "DS and algos",
  },
  {
    id: 3,
    code: "WEB301",
    name: "Web Development",
    room: "C303",
    instructor: "Mark Evans",
    days: ["Mon", "Wed"],
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description: "Frontend & backend",
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const AdminCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      await delay(600);
      setCourses([...fakeInitialCourses]);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  // Filter results by name or code
  useEffect(() => {
    const name = searchName.trim().toLowerCase();
    const code = searchCode.trim().toLowerCase();
    const result = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(name) &&
        c.code.toLowerCase().includes(code)
    );
    setFiltered(result);
  }, [courses, searchName, searchCode]);

  // Simulated delete
  const handleDelete = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    await delay(500);
    setCourses((prev) => prev.filter((p) => p.id !== courseToDelete.id));
    setCourseToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Menu admin={true} />

      <div className="admin-courses-page page-padding">
        <div className="courses-container card-elevated">
          <div className="courses-header">
            <div className="search-group">
              <Search
                placeholder="Search by Course Name"
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Search
                placeholder="Search by Course Code"
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>

            <div className="header-actions">
              <button
                className="btn primary"
                onClick={() => navigate("/admin/create-course")}
              >
                + Create Course
              </button>
            </div>
          </div>

          <div className="courses-list">
            {loading ? (
              <p>Loading courses...</p>
            ) : filtered.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              filtered.map((course) => (
                <div key={course.id} className="course-row">
                  <div className="course-info">
                    <Card
                      title={course.name}
                      description={`Code: ${course.code} • Room: ${course.room} • Instructor: ${course.instructor}`}
                    />
                  </div>

                  <div className="course-actions">
                    <button
                      className="btn warn"
                      onClick={() =>
                        navigate(`/admin/edit-course/${course.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => handleDelete(course)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Delete Course</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{courseToDelete?.name}</strong> (
              {courseToDelete?.code})?
            </p>
            <div className="modal-actions">
              <button
                className="btn secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCourseToDelete(null);
                }}
              >
                Cancel
              </button>
              <button className="btn danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCourses;
