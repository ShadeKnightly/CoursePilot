import React, { useEffect, useState } from "react";
// Reuse existing components
import CardComp from "../../../components/card/cardComponent.jsx";
import StudentItem from "./StudentItem.jsx";
import StudentFilterPanel from "./StudentFilterPanel.jsx";
import StudentDetailsPanel from "./StudentDetailsPanel.jsx";

const AdminStudents = () => {

    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [programLookup, setProgramLookup] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State to manage the active right-hand panel (view-only)
    const [activeStudent, setActiveStudent] = useState(null); 

    const normalizeStudent = (s, lookup = programLookup) => {
        const firstName = s.firstname || s.firstName || s.first_name || "";
        const lastName = s.lastname || s.lastName || s.last_name || "";
        const name = `${firstName} ${lastName}`.trim() || s.name || s.username || "";
        const programId = s.program || s.programId || s.programID || "";
        const programTitle = lookup[Number(programId)] || null;
        return {
            id: s.userId || s.id,
            firstName,
            lastName,
            name,
            programId,
            programTitle,
            department: s.department || "",
            email: s.email || "",
            phone: s.phone || "",
            username: s.username || "",
            birthday: s.birthday || "",
            term: s.term || "",
        };
    };

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            const [progRes, studentRes] = await Promise.all([
                fetch(`${API_BASE}/course/auth/programs`),
                fetch(`${API_BASE}/user/auth/students`),
            ]);

            if (!progRes.ok) {
                const err = await progRes.json().catch(() => ({}));
                throw new Error(err.message || `Failed to load programs (${progRes.status})`);
            }
            if (!studentRes.ok) {
                const err = await studentRes.json().catch(() => ({}));
                throw new Error(err.message || `Failed to load students (${studentRes.status})`);
            }

            const progData = await progRes.json();
            const progList = Array.isArray(progData) ? progData : [];
            const lookup = progList.reduce((acc, p) => {
                acc[Number(p.programID)] = p.title;
                return acc;
            }, {});
            setPrograms(progList);
            setProgramLookup(lookup);

            const studentsData = await studentRes.json();
            const normalized = Array.isArray(studentsData) ? studentsData.map((s) => normalizeStudent(s, lookup)) : [];
            setStudents(normalized);
            setFilteredStudents(normalized);
        } catch (err) {
            console.error("Failed to fetch students", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [API_BASE]);
    
    
    // --- Panel Handlers ---

    // Handler to open the student details panel in VIEW mode
    const handleViewStudentDetails = (studentId) => {
        const student = students.find(s => s.id === studentId);
        setActiveStudent(student || null);
    };

    // Handler to close any active panel (used by the panel's "Close" button)
    const handleClosePanel = () => {
        setActiveStudent(null);
    };
    const handleFilterStudents = (filters) => {
        const { name, id, program } = filters;

        const filtered = students.filter((student) => {
            const matchesName =
                name === "" ||
                student.name.toLowerCase().includes(name.toLowerCase());

            const matchesId =
                id === "" ||
                String(student.id).includes(String(id));

            const matchesProgram =
                program === "" || String(student.programId) === String(program);

            return matchesName && matchesId && matchesProgram;
        });

        setFilteredStudents(filtered);
    };


    const listHeader = () => <h3 className="card-header-title">Students</h3>;


    return (
        <div className="admin-students-container">
            {/* The main list */}
            <CardComp 
                title='Students' 
                headerComponent={listHeader()}
            >

                {loading ? (
                    <p>Loading students...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : filteredStudents.length === 0 ? (
                    <p>No students found.</p>
                ) : (
                    filteredStudents.map((student) => (
                        <StudentItem 
                            key={student.id} 
                            {...student}
                            program={student.programTitle || student.programId || student.program}
                            onDetails={() => handleViewStudentDetails(student.id)} 
                        />
                    ))
                )}
            </CardComp>
            
            {/* The filter and Add Student panel (on the right) */}
            <StudentFilterPanel 
                onFilter={handleFilterStudents}
                programs={programs}
            />

            {/* Conditional Panel for Student Details (View/Edit/Create) */}

            {/* Fix: When students details button was clicked details appeared off below the card comp */}
            {activeStudent && (
                <CardComp>
                    <StudentDetailsPanel 
                        student={activeStudent}
                        onClose={handleClosePanel}
                    />
                </CardComp>
            )}

        </div>
    );
};

export default AdminStudents;