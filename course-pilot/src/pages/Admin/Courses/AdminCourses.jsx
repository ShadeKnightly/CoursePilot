import React, { useEffect, useState } from "react";
import ClassItem from "../../../components/ClassItem/classItem";
import CardComp from "../../../components/card/cardComponent.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx"; 
import EditCoursePanel from "./EditCoursePanel.jsx"; 
import CreateCoursePanel from "./CreateCoursePanel.jsx"; 
import SearchBox from "../../../components/Search/search.jsx";


const AdminCourses = () => { 

    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

    // Course Data managed by state
    const [courses, setCourses] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [activePanel, setActivePanel] = useState(null); 

        
    const normalizeId = (id) => {
        const n = Number(id);
        return Number.isNaN(n) ? id : n;
    };

    const dedupeCourses = (list = []) => {
        const seen = new Set();
        return list.filter((course) => {
            const id = normalizeId(course.courseID || course.id);
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
        });
    };

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${API_BASE}/course/auth/courses`);
            if (!res.ok) {
                throw new Error(`Failed to load courses (${res.status})`);
            }
            const data = await res.json();
            const list = Array.isArray(data) ? data : [];
            setCourses(dedupeCourses(list));
        } catch (err) {
            console.error("Failed to fetch courses", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // handlers for create/edit forms
    
    const handleCancelPanel = () => {
        setActivePanel(null);
    };

    const handleEditCourse = (courseCode) => {
        const course = courses.find(c => c.courseCode === courseCode);
        if (course) {
            setActivePanel({ type: 'edit', data: course });
        }
    };
    
    //  Implementation to save an edited course
    const handleSaveEditedCourse = async (updatedCourseData) => {
        const id = normalizeId(updatedCourseData.courseID || updatedCourseData.id);
        const payload = {
            code: updatedCourseData.courseCode,
            name: updatedCourseData.courseName || updatedCourseData.CourseName,
            term: updatedCourseData.term,
            dateRange: updatedCourseData.dateRange || `${updatedCourseData.startDate || ''}${updatedCourseData.endDate ? ' - ' + updatedCourseData.endDate : ''}`,
            desc: updatedCourseData.description || updatedCourseData.c_Description || "",
        };

        try {
            const res = await fetch(`${API_BASE}/course/auth/${id}/course`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Failed to update course (${res.status})`);
            }

            await fetchCourses();
            handleCancelPanel();
        } catch (err) {
            console.error("Failed to update course", err);
            setError(err.message);
        }
    };
    
    // implementation to save a created course
    const handleSaveNewCourse = async (newCourseData) => {
        const payload = {
            code: newCourseData.courseCode,
            name: newCourseData.courseName,
            term: newCourseData.term || "",
            dateRange: newCourseData.dateRange || `${newCourseData.startDate || ''}${newCourseData.endDate ? ' - ' + newCourseData.endDate : ''}`,
            desc: newCourseData.description || "",
        };

        try {
            const res = await fetch(`${API_BASE}/course/auth/course`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Failed to create course (${res.status})`);
            }

            await fetchCourses();
            handleCancelPanel();
        } catch (err) {
            console.error("Failed to create course", err);
            setError(err.message);
        }
    };
    
    const handleCreateCourse = () => {
        setActivePanel({ type: 'create', data: null });
    };


    // handler for delete course data
    
    const handleDeleteCourse = (courseCode) => {
        const course = courses.find(c => c.courseCode === courseCode);
        if (course) setCourseToDelete(course);
    };

    const handleCancelDelete = () => {
        setCourseToDelete(null);
    };

    // confirm course deletion
    const handleConfirmDelete = async () => {
        if (courseToDelete) {
            const id = normalizeId(courseToDelete.courseID || courseToDelete.id);
            try {
                const res = await fetch(`${API_BASE}/course/auth/${id}/course`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.message || `Failed to delete course (${res.status})`);
                }

                await fetchCourses();
                console.log(`[ACTION] Confirmed deletion of: ${courseToDelete.courseCode}`);
            } catch (err) {
                console.error("Failed to delete course", err);
                setError(err.message);
            } finally {
                setCourseToDelete(null);
            }
        }
    }; 
    //search
    useEffect(() => {
        if (!courses.length) return;
    
        const searchValue = searchField.toLowerCase();
    
        const filtered = courses.filter((course) =>
        // Search in key fields, handles undefined fields safely
        (course.courseCode?.toLowerCase().includes(searchValue) ||
          course.CourseName?.toLowerCase().includes(searchValue) ||
          course.c_Description?.toLowerCase().includes(searchValue) ||
          course.term?.toLowerCase().includes(searchValue))
        );
    
        setFilteredCourses(filtered);
      }, [courses, searchField]);

    const onSearchChange = (event) => setSearchField(event.target.value);


    const createButton = (
        <button className="create-btn" onClick={handleCreateCourse}>
            Create New Course
        </button>
    );

    return ( 
    
        <div className="admin-course-list-container">
            
            <CardComp 
                title='Courses' 
                actionButton={createButton} 
            > 
                {loading ? (
                    <p>Loading courses...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : courses.length === 0 ? (
                    <p>No courses available.</p>
                ) : (
                <>
                    <SearchBox placeholder="Search" onChangeHandler={onSearchChange} />
                    {filteredCourses.length === 0 ? (
                        <p>No courses match your search.</p>
                    ) : (
                        filteredCourses.map((course) => (
                            <ClassItem 
                                key={course.courseID || course.courseCode} 
                                courseCode={course.courseCode}
                                name={course.CourseName || course.courseName}
                                term={course.term}
                                startEnd={course.dateRange}
                                program={course.title}
                                description={course.c_Description}
                                onEdit={() => handleEditCourse(course.courseCode)}
                                onRemove={() => handleDeleteCourse(course.courseCode)} 
                                isSignedIn={true}
                                isAdmin={true}
                            />
                        ))
                    )}
                </>
                )}
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
                courseCode={courseToDelete?.courseCode} 
                onConfirm={handleConfirmDelete} // Uses the confirmed deletion logic
                onCancel={handleCancelDelete}
            />
            
        </div>
    );
} 

export default AdminCourses;