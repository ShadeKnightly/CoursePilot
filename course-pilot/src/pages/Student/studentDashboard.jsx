import React from "react";
import CardComp from "../../components/card/cardComponent";


const StudentDashboard = () => {
  // Mocked data for now, will replace with backend data 
  const student = {
    firstName: "FirstName",
    lastName: "LastName",
    role: "Student",
    studentId: "1234556",
    program: "Software Development",
    department: "School of Technology",
  };

  return (
      <main style={{ padding: "2rem", flex: 1, display: "flex", justifyContent: "center" }}>
        <CardComp title={`Welcome ${student.firstName} ${student.lastName}`}>
          <div className="student-info">
            <p>{student.role}</p>
            <p>Student ID: {student.studentId}</p>
            <p>Program: {student.program}</p>
            <p>Department: {student.department}</p>
          </div>
        </CardComp>
      </main>
  );
};

export default StudentDashboard;
