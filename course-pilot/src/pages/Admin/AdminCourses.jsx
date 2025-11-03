import React, { useState, useEffect } from "react";
import ClassItem from "../../components/ClassItem/classItem";
import CardComp from "../../components/card/cardComponent.jsx";
import SearchBox from "../../components/Search/search.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
import EditCoursePanel from "./EditCoursePanel.jsx";
import CreateCoursePanel from "./CreateCoursePanel.jsx";
import { mockCourses } from "../../data";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  // Simulate fetching courses (like ViewCourses)
  useEffect(() => {
    const fetchCourses = () => {
      return new Promise((resolve) => {
        console.log("Fetching all available courses for admin...");
        setTimeout(() => resolve(mockCourses), 1000);
      });
    };

    fetchCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
    });
  }, []);

  // Unified search filtering
  useEffect(() => {
    if (!courses.length) return;

    const searchValue = searchField.toLowerCase();
    const filtered = courses.filter((course) =>
      Object.values(course).join(" ").toLowerCase().includes(searchValue)
    );

    setFilteredCourses(filtered);
  }, [courses, searchField]);

  // --- Handlers ---
  const onSearchChange = (event) => setSearchField(event.target.value);

  const handleEditCourse = (courseCode) => {
    const course = courses.find((c) => c.courseCode === courseCode);
    if (course) setActivePanel({ type: "edit", data: course });
  };

  const handleSaveEditedCourse = (updatedCourseData) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.courseCode === updatedCourseData.courseCode ? updatedCourseData : c
      )
    );
    setActivePanel(null);
  };

  const handleSaveNewCourse = (newCourseData) => {
    const newId =
      courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses((prev) => [...prev, { id: newId, ...newCourseData }]);
    setActivePanel(null);
  };

  const handleCreateCourse = () => setActivePanel({ type: "create" });
  const handleCancelPanel = () => setActivePanel(null);

  const handleDeleteCourse = (courseCode) => setCourseToDelete(courseCode);
  const handleCancelDelete = () => setCourseToDelete(null);
  const handleConfirmDelete = () => {
    if (courseToDelete) {
      setCourses((prev) =>
        prev.filter((course) => course.courseCode !== courseToDelete)
      );
      setCourseToDelete(null);
    }
  };

  // --- Render ---
  return (
    <main style={{ padding: "2rem" }}>
      <CardComp
        title="Manage Courses"
        headerComponent={
          <SearchBox placeholder="Search courses..." onChangeHandler={onSearchChange} />
        }
        actionButton={
          <button className="create-btn" onClick={handleCreateCourse}>
            + Create New Course
          </button>
        }
      >
        {courses.length === 0 ? (
          <p>Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <ClassItem
              key={course.id}
              courseCode={course.courseCode}
              name={course.name}
              term={course.term}
              startEnd={course.startEnd}
              program={course.program}
              description={course.description}
              onEdit={() => handleEditCourse(course.courseCode)}
              onRemove={() => handleDeleteCourse(course.courseCode)}
              isAdmin={true}
            />
          ))
        ) : (
          <p>No courses match your search.</p>
        )}
      </CardComp>

      {/* Panels */}
      {activePanel?.type === "edit" && (
        <EditCoursePanel
          courseData={activePanel.data}
          onSave={handleSaveEditedCourse}
          onCancel={handleCancelPanel}
        />
      )}

      {activePanel?.type === "create" && (
        <CreateCoursePanel
          onSave={handleSaveNewCourse}
          onCancel={handleCancelPanel}
        />
      )}

      <DeleteConfirmation
        courseCode={courseToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
};

export default AdminCourses;
