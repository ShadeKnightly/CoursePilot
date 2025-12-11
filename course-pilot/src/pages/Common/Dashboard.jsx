import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [programTitle, setProgramTitle] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch program title if user has a program ID
  useEffect(() => {
    if (currentUser?.program && typeof currentUser.program === 'number') {
      const fetchProgramTitle = async () => {
        try {
          setLoadingProgram(true);
          const res = await fetch(`${API_BASE}/course/auth/programs`);
          if (!res.ok) throw new Error("Failed to load programs");
          const data = await res.json();
          const prog = Array.isArray(data) ? data.find(p => p.programID === currentUser.program) : null;
          setProgramTitle(prog?.title || null);
        } catch (err) {
          console.error("Failed to fetch program title:", err);
          setProgramTitle(null);
        } finally {
          setLoadingProgram(false);
        }
      };
      fetchProgramTitle();
    }
  }, [currentUser?.program, API_BASE]);

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
          {user.program && <p>Program: {loadingProgram ? "Loading..." : (programTitle || user.program)}</p>}
          {user.department && <p>Department: {user.department}</p>}

          {/* Admin info */}
        {user.role === "admin" && (
          <>
            <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
              You have administrator access.
            </p>
            <p>ID: {user.userID}</p>
          </>
        )}
        </div>
      </CardComp>
    </main>
  );
};

export default Dashboard;
