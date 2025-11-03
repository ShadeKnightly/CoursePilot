import React, { useState } from 'react';
// import './EditCoursePanel.css'; // You can reuse styles from the edit panel

// Define the initial empty state for a new course
const initialEmptyCourse = {
    courseCode: '',
    name: '',
    term: '',
    startEnd: '',
    program: '',
    description: '',
};

const CreateCourse = ({ onSave, onCancel }) => {
    
    // State to hold the new course form data
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
        
        // Basic validation check
        if (!formData.courseCode || !formData.name) {
             alert("Please fill in at least the Course Code and Name.");
             return;
        }
        
        // Call the onSave handler from AdminCourses with the new data
        onSave(formData); 
    };

    return (
        // Use the same class name for positioning as the Edit panel (e.g., edit-course-panel)
        <div className="edit-course-panel"> 
            <h3>Create New Course</h3>
            <form onSubmit={handleSubmit}>
                
                {/* Course Code (Required) */}
                <label htmlFor="courseCode">Course Code:</label>
                <input 
                    type="text" 
                    id="courseCode"
                    name="courseCode" 
                    value={formData.courseCode} 
                    onChange={handleChange} 
                    required 
                />
                
                {/* Course Name (Required) */}
                <label htmlFor="name">Course Name:</label>
                <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                
                {/* Term */}
                <label htmlFor="term">Term:</label>
                <input 
                    type="text" 
                    id="term"
                    name="term" 
                    value={formData.term} 
                    onChange={handleChange} 
                />
                
                {/* Description */}
                <label htmlFor="description">Description:</label>
                <textarea 
                    id="description"
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows="4"
                ></textarea>

                {/* Add labels/inputs for Start/End, Program, and any other fields */}

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="save-btn">
                        Create Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;