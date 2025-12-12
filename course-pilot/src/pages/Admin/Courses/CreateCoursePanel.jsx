import React, { useState } from 'react';
// Import your styling file here (e.g., './CoursePanel.css')

// Define all fields shown in the layout image
const initialEmptyCourse = {
    courseCode: '',
    CourseName: '',
    term: '',
    dateRange: '',
    c_Description: '',
};

const CreateCoursePanel = ({ onSave, onCancel }) => {
    
    const [formData, setFormData] = useState(initialEmptyCourse);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation check (ensure required fields are present)
        if (!formData.courseCode || !formData.CourseName || !formData.term || !formData.dateRange || !formData.c_Description) {
            alert("Please fill in Course Code, Name, Term, Date Range, and Description.");
            return;
        }
        
        // Call the onSave handler from AdminCourses with the new data
        onSave(formData); 
    };

    return (
        <div className="edit-course-panel"> 
            <div className="course-details-title">Course Details</div>
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
                    <input type="text" id="term" name="term" value={formData.term} onChange={handleChange} required />
                </div>

                {/* --- ROW 2 --- */}

                <div className="form-group">
                    <label htmlFor="dateRange">Date Range</label>
                    <input type="text" id="dateRange" name="dateRange" value={formData.dateRange} onChange={handleChange} required />
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCoursePanel;