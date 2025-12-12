import React, { useState, useEffect } from 'react';
import  "./CoursePanel.css";

// Import your styling file here (e.g., './CoursePanel.css')

const EditCoursePanel = ({ courseData, onSave, onCancel }) => {
    
    // State is initialized with the existing courseData
    const [formData, setFormData] = useState(courseData);

    // Ensure the form data updates if the admin clicks a different "Edit" button
    useEffect(() => {
        if (courseData) {
            // Convert any complex fields (like classDays) if necessary before setting state
            setFormData(courseData);
        }
    }, [courseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation check
           if (!formData.courseCode || !formData.CourseName || !formData.term || !formData.dateRange || !formData.c_Description) {
               alert("Please ensure Course Code, Name, Term, Date Range, and Description are filled.");
             return;
        }
        
        // Call the onSave handler (handleSaveEditedCourse in AdminCourses) with the updated data
        onSave(formData); 
    };

    return (
        // Use the same class name for positioning as the Create panel
        <div className="edit-course-panel"> 
            {/* Displaying the course code helps the admin verify they're editing the right course */}
            <div className="course-details-title">Edit Course: {courseData.courseCode}</div> 
            <form onSubmit={handleSubmit} className="course-form-grid">
                
                {/* --- ROW 1 --- */}
                <div className="form-group">
                    <label htmlFor="courseCode">Course code</label>
                    <input type="text" id="courseCode" name="courseCode" value={formData.courseCode} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="CourseName">Course Name</label>
                    <input type="text" id="CourseName" name="CourseName" value={formData.CourseName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="term">Term</label>
                    <input type="text" id="term" name="term" value={formData.term || ''} onChange={handleChange} required />
                </div>

                {/* --- ROW 2 --- */}
                <div className="form-group">
                    <label htmlFor="dateRange">Date Range</label>
                    <input type="text" id="dateRange" name="dateRange" value={formData.dateRange || ''} onChange={handleChange} required />
                </div>

                {/* --- ROW 3 & 4: Description (Full height) & Dates --- */}
                <div className="form-group description-group">
                    <label htmlFor="c_Description">Description</label>
                    <textarea id="c_Description" name="c_Description" value={formData.c_Description} onChange={handleChange} required></textarea>
                </div>
                
                {/* --- ACTIONS --- */}
                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Submit Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCoursePanel;