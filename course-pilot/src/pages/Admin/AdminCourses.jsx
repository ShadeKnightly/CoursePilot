import React, {useState} from "react";
import ClassItem from "../../components/ClassItem/classItem";
import CardComp from "../../components/card/cardComponent.jsx";
import Search from "../../components/Search/search.jsx";


import DeleteConfirmation from "./DeleteConfirmation.jsx"; 
import EditCourse from "./EditCourse.jsx"; 
import CreateCourse from "./CreateCourse.jsx"; 

const AdminCourses = () => { 

    // define courses data array to display courses
    const coursesToDisplay = [
        
        { 
           courseCode: 'COMP101', 
           name: 'Intro to Programming', 
           term: 'Fall 2025', 
           startEnd: 'Sept 1 - Dec 15', 
          program: 'Software Development', 
          description: '...' },
        { 
            courseCode: 'WEB201', 
            name: 'Web Development', 
            term: 'Winter 2026', 
            startEnd: 'Jan 5 - Mar 30', 
            program: 'Software Development', 
            description: '...' 
        },
        { 
            courseCode: 'DBS301', 
            name: 'Database Systems', 
            term: 'Fall 2025', 
            startEnd: 'Sept 1 - Dec 15', 
            program: 'Software Development', 
            description: '...', 
        },
        
    ];

    const [courseToDelete, setCourseToDelete] = useState(null);
    
    // 🎯 NEW STATE: Tracks which panel is currently open
    // Value is { type: 'edit' | 'create', data: courseObject | null } or null
    const [activePanel, setActivePanel] = useState(null); 


    // --- HANDLERS FOR EDIT/CREATE FORMS ---
    
    // Universal handler to close any active panel
    const handleCancelPanel = () => {
        setActivePanel(null);
    };

    // Handler for the "Edit" click (opens the Edit panel)
    const handleEditCourse = (courseCode) => {
        // Find the full course data to pre-populate the edit form
        const course = coursesToDisplay.find(c => c.courseCode === courseCode);
        
        if (course) {
            // Set active panel to 'edit' with the specific course data
            setActivePanel({ type: 'edit', data: course });
        }
    };
    
    // Handler for saving an edited course
    const handleSaveEditedCourse = (updatedCourseData) => {
        console.log(`[ACTION] Confirmed saving changes to: ${updatedCourseData.courseCode}`);
        // TODO: Implement actual course update logic here
        handleCancelPanel(); // Close the panel
    };
    
    // Handler for saving a new course
    const handleSaveNewCourse = (newCourseData) => {
        console.log(`[ACTION] Confirmed saving new course: ${newCourseData.courseCode}`);
        // TODO: Implement actual course creation logic here
        handleCancelPanel(); // Close the panel
    };
    
    // Handler for the "Create New Course" button (opens the Create panel)
    const handleCreateCourse = () => {
        // Set active panel to 'create'
        setActivePanel({ type: 'create', data: null });
    };


    // --- HANDLERS FOR DELETE MODAL (Unchanged) ---
    
    // sets course to delete
    const handleDeleteCourse = (courseCode) => {
        setCourseToDelete(courseCode);
    };

    // closes without taking action
    const handleCancelDelete = () => {
        setCourseToDelete(null);
    };

    // executes the final delete action
    const handleConfirmDelete = () => {
        if (courseToDelete) {
            console.log(`[ACTION] Confirmed deletion of: ${courseToDelete}`);
            // TODO: Implement actual course deletion logic 

            setCourseToDelete(null);
        }
    }; 

    // function to display the two search bars inside cardComp container
    const twoSearchBar = () => (
        <div className="card-header-search-bar"> 
            <Search placeholder={'Search course name'}/>
            <Search placeholder={'Search course code'}/>
        </div>
    );

    const createButton = (
        <button className="create-btn" onClick={handleCreateCourse}> {/* 🎯 Uses new handler */}
            Create New Course
        </button>
    );

    return ( 
        <div className="admin-course-list-container">
            <CardComp 
                title='Courses' 
                headerComponent={twoSearchBar()}
                actionButton={createButton} 
            > 
                {coursesToDisplay.map((course) => (
                    <ClassItem 
                    key={course.courseCode} 
                    {...course}
                    onEdit={() => handleEditCourse(course.courseCode)}
                    onRemove={() => handleDeleteCourse(course.courseCode)} 
                    isSignedIn={true}
                    isAdmin={true} 
                />
                ))}
            </CardComp>
            
            {/* CONDITIONAL RENDERING FOR EDIT PANEL */}
            {activePanel && activePanel.type === 'edit' && (
                <EditCourse
                    courseData={activePanel.data}
                    onSave={handleSaveEditedCourse}
                    onCancel={handleCancelPanel}
                />
            )}

            {activePanel && activePanel.type === 'create' && (
                <CreateCourse
                    onSave={handleSaveNewCourse}
                    onCancel={handleCancelPanel}
                />
            )}
            
            {/* Render the Confirmation Modal at the end */}
            <DeleteConfirmation
                courseCode={courseToDelete} 
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
} 

export default AdminCourses;
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
