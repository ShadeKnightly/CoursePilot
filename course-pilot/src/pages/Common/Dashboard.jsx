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

  if (!currentUser) return null;

  const user = currentUser;

  return (
    <main
      style={{
        padding: "2rem",
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardComp title={`Welcome ${user.firstName} ${user.lastName}`}>
        <div className="student-info">
          <p>{user.role}</p>

          {/* Show only if data exists */}
          {user.studentId && <p>Student ID: {user.studentId}</p>}
          {user.program && <p>Program: {user.program}</p>}
          {user.department && <p>Department: {user.department}</p>}

          {/* Admin info */}
        {user.role === "admin" && (
          <>
            <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
              You have administrator access.
            </p>
            <p>ID: {user.id}</p>
          </>
        )}
        </div>
      </CardComp>
    </main>
  );
};

export default Dashboard;
