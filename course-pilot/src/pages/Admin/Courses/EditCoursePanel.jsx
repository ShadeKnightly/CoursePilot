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
    
    const handleDayChange = (e) => {
        const { value, checked } = e.target;
        
        setFormData(prevData => {
            const currentDays = prevData.classDays || []; // Handle case where classDays is null/undefined
            
            if (checked) {
                // Add the day if checked
                return { ...prevData, classDays: [...currentDays, value] };
            } else {
                // Remove the day if unchecked
                return { ...prevData, classDays: currentDays.filter(day => day !== value) };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation check
        if (!formData.courseCode || !formData.courseName || !formData.instructor || !formData.startDate) {
             alert("Please ensure Course Code, Name, Instructor, and Start Date are filled.");
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
                    <label htmlFor="courseName">Course Name</label>
                    <input type="text" id="courseName" name="courseName" value={formData.courseName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="instructor">Instructor</label>
                    <input type="text" id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} required />
                </div>

                {/* --- ROW 2 --- */}
                <div className="form-group">
                    <label htmlFor="room">Room</label>
                    <input type="text" id="room" name="room" value={formData.room} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
                </div>
                <div className="form-group class-days-group">
                    <label>Class Days</label>
                    <div className="day-options">
                        {['M', 'T', 'W', 'TH', 'F'].map(day => (
                            <label key={day} className="day-checkbox">
                                <input 
                                    type="checkbox" 
                                    name="classDays" 
                                    value={day} 
                                    // Check if the current day is included in the existing classDays array
                                    checked={formData.classDays && formData.classDays.includes(day)}
                                    onChange={handleDayChange}
                                />
                                <span className="custom-radio">{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* --- ROW 3 & 4: Description (Full height) & Dates --- */}
                <div className="form-group description-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                
                <div className="form-group-date-column">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        {/* Note: Input type="date" works best with strings formatted as YYYY-MM-DD */}
                        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationOpenDate">Registration Open Date</label>
                        <input type="date" id="registrationOpenDate" name="registrationOpenDate" value={formData.registrationOpenDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationCloseDate">Registration Close Date</label>
                        <input type="date" id="registrationCloseDate" name="registrationCloseDate" value={formData.registrationCloseDate} onChange={handleChange} />
                    </div>
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