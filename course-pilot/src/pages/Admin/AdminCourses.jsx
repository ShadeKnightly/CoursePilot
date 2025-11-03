import React, {useState} from "react";
import ClassItem from "../../components/ClassItem/classItem";
import CardComp from "../../components/card/cardComponent.jsx";
import Search from "../../components/Search/search.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx"; 
import EditCoursePanel from "./EditCoursePanel.jsx"; 
import CreateCoursePanel from "./CreateCoursePanel.jsx"; 

const initialCourseData = [
    {   
        courseCode: 'COMP101', 
        name: 'Intro to Programming', 
        term: 'Fall 2025', 
        startEnd: 'Sept 1 - Dec 15', 
        program: 'Software Development', 
        description: '...' 
    },
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

const AdminCourses = () => { 

    //  Course Data is managed by state
    const [courses, setCourses] = useState(initialCourseData); 
    
    // The rest of the list now uses the state variable
    const coursesToDisplay = courses;

    const [courseToDelete, setCourseToDelete] = useState(null);
    const [activePanel, setActivePanel] = useState(null); 


    // handlers for edit/delete
    
    const handleCancelPanel = () => {
        setActivePanel(null);
    };

    const handleEditCourse = (courseCode) => {
        const course = courses.find(c => c.courseCode === courseCode);
        if (course) {
            setActivePanel({ type: 'edit', data: course });
        }
    };
    
    // saving edited course
    const handleSaveEditedCourse = (updatedCourseData) => {
        setCourses(prevCourses => 
            prevCourses.map(course => 
                course.courseCode === updatedCourseData.courseCode 
                    ? updatedCourseData // Replace the old course with the updated data
                    : course
            )
        );
        handleCancelPanel(); 
    };
    
    // saving new course
    const handleSaveNewCourse = (newCourseData) => {
        // here we can make an api call
        
        // simulate an api response
        setCourses(prevCourses => [...prevCourses, newCourseData]);
        
        console.log(`[ACTION] Saved new course: ${newCourseData.courseCode}`);
        handleCancelPanel(); 
    };
    
    const handleCreateCourse = () => {
        setActivePanel({ type: 'create', data: null });
    };


    // handler for delete
    
    const handleDeleteCourse = (courseCode) => {
        setCourseToDelete(courseCode);
    };

    const handleCancelDelete = () => {
        setCourseToDelete(null);
    };

    // confirm deletion
    const handleConfirmDelete = () => {
        if (courseToDelete) {
            // here we can make another api call

            // simulates api response
            setCourses(prevCourses => 
                prevCourses.filter(course => course.courseCode !== courseToDelete)
            );
            
            console.log(`[ACTION] Confirmed deletion of: ${courseToDelete}`);
            setCourseToDelete(null);
        }
    }; 

    // renders-
    const twoSearchBar = () => (
        <div className="card-header-search-bar"> 
            <Search placeholder={'Search course name'}/>
            <Search placeholder={'Search course code'}/>
        </div>
    );

    const createButton = (
        <button className="create-btn" onClick={handleCreateCourse}>
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
                {/* Renders the list from the 'courses' state */}
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
            
            {/* Conditional Panels */}
            {activePanel && activePanel.type === 'edit' && (
                <EditCoursePanel
                    courseData={activePanel.data}
                    onSave={handleSaveEditedCourse}
                    onCancel={handleCancelPanel}
                />
            )}

            {activePanel && activePanel.type === 'create' && (
                <CreateCoursePanel
                    onSave={handleSaveNewCourse}
                    onCancel={handleCancelPanel}
                />
            )}
            
            {/* Delete Modal */}
            <DeleteConfirmation
                courseCode={courseToDelete} 
                onConfirm={handleConfirmDelete} // Uses the confirmed deletion logic
                onCancel={handleCancelDelete}
            />
        </div>
    );
} 

export default AdminCourses;