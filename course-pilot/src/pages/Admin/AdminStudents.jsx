import React, { useState } from "react";
// Reuse existing components
import CardComp from "../../components/card/cardComponent.jsx";
import StudentItem from "./StudentItem.jsx";
import StudentFilterPanel from "./StudentFilterPanel.jsx";
import StudentDetailsPanel from "./StudentDetailsPanel.jsx"; // 🎯 New Import

// Define placeholder student data
const initialStudents = [
    { id: '1001', name: 'Alice Johnson', program: 'Software Development', department: 'CST' },
    { id: '1002', name: 'Bob Williams', program: 'Data Analytics', department: 'Analytics' },
    { id: '1003', name: 'Charlie Davis', program: 'IT Operations', department: 'Networking' },
    { id: '1004', name: 'Diana Clark', program: 'Software Development', department: 'CST' },
];

const AdminStudents = () => {
    
    const [students, setStudents] = useState(initialStudents);
    const [filteredStudents, setFilteredStudents] = useState(initialStudents);
    
    // State to manage the active right-hand panel (view/edit/create student details)
    // Value is { type: 'view' | 'edit' | 'create', data: studentObject | null }
    const [activeStudentPanel, setActiveStudentPanel] = useState(null); 
    
    
    // --- Panel Handlers ---

    // Handler to open the student details panel in VIEW mode
    const handleViewStudentDetails = (studentId) => {
        const student = students.find(s => s.id === studentId);
        setActiveStudentPanel({ type: 'view', data: student });
    };

    // Handler to close any active panel (used by the panel's "Close" button)
    const handleClosePanel = () => {
        setActiveStudentPanel(null);
    };
    
    // Handler for the Add New Student button (opens the create panel)
    const handleAddStudent = () => {
        setActiveStudentPanel({ type: 'create', data: null });
    };

    // 🎯 CRITICAL: Handler to save/update student data
    const handleSaveStudent = (studentData, mode) => {
        if (mode === 'create') {
            // Logic for creating a new student
            const newStudentId = (Math.max(...students.map(s => parseInt(s.id))) + 1).toString(); // Simple ID generation
            const newStudent = { ...studentData, id: newStudentId };
            
            // Update state (simulates API call)
            setStudents(prevStudents => [...prevStudents, newStudent]);
            setFilteredStudents(prevStudents => [...prevStudents, newStudent]);
            
            console.log("Created new student:", newStudent);

            // Re-open the panel in VIEW mode for the newly created student
            setActiveStudentPanel({ type: 'view', data: newStudent });
        
        } else if (mode === 'edit') {
            // Logic for editing an existing student
            
            // Update state (simulates API call)
            setStudents(prevStudents => 
                prevStudents.map(student => 
                    student.id === studentData.id ? studentData : student
                )
            );
            setFilteredStudents(prevStudents => 
                prevStudents.map(student => 
                    student.id === studentData.id ? studentData : student
                )
            );
            
            console.log("Saved changes for student:", studentData.id);
            
            // Re-open the panel in VIEW mode with the updated data
            setActiveStudentPanel({ type: 'view', data: studentData }); 
        }
    };
    
    // Handler for filtering logic (placeholder)
    const handleFilterStudents = (filters) => {
        console.log("Filtering students with:", filters);
        // TODO: Implement actual filtering logic here using the 'filters' object
        // setFilteredStudents(filteredResult);
        setFilteredStudents(students); // Currently displays all students
    };
    
    const listHeader = () => <h3 className="card-header-title">Students</h3>;


    return (
        <div className="admin-students-container">
            {/* The main list */}
            <CardComp 
                title='Students' 
                headerComponent={listHeader()}
            >
                {/* Map the filtered list of students */}
                {filteredStudents.map((student) => (
                    <StudentItem 
                        key={student.id} 
                        {...student}
                        onDetails={() => handleViewStudentDetails(student.id)} 
                    />
                ))}
            </CardComp>
            
            {/* The filter and Add Student panel (on the right) */}
            <StudentFilterPanel 
                onFilter={handleFilterStudents} 
                onAddStudent={handleAddStudent} 
            />

            {/* Conditional Panel for Student Details (View/Edit/Create) */}
            {activeStudentPanel && (
                <StudentDetailsPanel 
                    panelData={activeStudentPanel.data}
                    panelType={activeStudentPanel.type}
                    onClose={handleClosePanel}
                    onSave={handleSaveStudent} // 🎯 Passing the persistence handler
                />
            )}

        </div>
    );
};

export default AdminStudents;