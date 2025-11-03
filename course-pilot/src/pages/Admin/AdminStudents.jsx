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