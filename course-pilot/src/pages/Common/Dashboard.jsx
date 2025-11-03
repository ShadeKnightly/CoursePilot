import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";


const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/viewPrograms");
    }
  }, [currentUser, navigate]);
  const user = currentUser;
  if (!currentUser) return null; // prevent rendering before redirect
  
  return (
      <main style={{ padding: "2rem", flex: 1, display: "flex", justifyContent: "center" }}>
        <CardComp title={`Welcome ${user.firstName} ${user.lastName}`}>
          <div className="student-info">
            <p>{user.role}</p>
            <p>Student ID: {user.studentId}</p>
            <p>Program: {user.program}</p>
            <p>Department: {user.department}</p>
          </div>
        </CardComp>
      </main>
  );
};

export default Dashboard;
