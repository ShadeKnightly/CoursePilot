import React, { useState } from 'react';
// Import your styling file here (e.g., './CoursePanel.css')

// Define all fields shown in the layout image
const initialEmptyCourse = {
    courseCode: '',
    courseName: '',
    term: '',
    dateRange: '',
    instructor: '',
    room: '',
    time: '',
    description: '',
    startDate: '',
    endDate: '',
    registrationOpenDate: '',
    registrationCloseDate: '',
    // Use an array or string for days, defaulting to empty/none selected
    classDays: [], 
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
    
    const handleDayChange = (e) => {
        const { value, checked } = e.target;
        
        setFormData(prevData => {
            const currentDays = prevData.classDays;
            
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
        
        // Basic validation check (ensure required fields are present)
           if (!formData.courseCode || !formData.courseName || !formData.instructor || !formData.startDate || !formData.term || !formData.dateRange || !formData.description) {
               alert("Please fill in Course Code, Name, Instructor, Term, Date Range, Description, and Start Date.");
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
                    <label htmlFor="courseName">Course Name</label>
                    <input type="text" id="courseName" name="courseName" value={formData.courseName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="term">Term</label>
                    <input type="text" id="term" name="term" value={formData.term} onChange={handleChange} required />
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
                <div className="form-group">
                    <label htmlFor="dateRange">Date Range</label>
                    <input type="text" id="dateRange" name="dateRange" value={formData.dateRange} onChange={handleChange} required />
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
                                    checked={formData.classDays.includes(day)}
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
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                
                <div className="form-group-date-column">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCoursePanel;