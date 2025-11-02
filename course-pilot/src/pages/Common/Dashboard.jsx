import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";


const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const user = currentUser;

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
