import React, { useState, useEffect } from "react";
import CardComp from "../../components/card/cardComponent";

const Profile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Simulated async fetch for now
    const fetchStudentData = async () => {
      const data = {
        username: "Username",
        firstName: "FirstName",
        lastName: "LastName",
        phone: "123-456-7890",
        email: "email@email.com",
        birthdate: "2000-11-20",
        password: "123456",
      };
      setStudent(data);
    };
    fetchStudentData();
  }, []);

  // Simulate button logic
  const handleEditProfile = () => {
    alert("Edit Profile clicked");
  };

  const handleResetPassword = () => {
    alert("Reset Password clicked");
  };

  if (!student) return <p>Loading profile...</p>;

  return (
    <main style={{ padding: "2rem", flex: 1, display: "flex", justifyContent: "center" }}>
      <CardComp title={`${student.username}'s Profile`}>
        <div className="student-info">
          <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Birthdate:</strong> {student.birthdate}</p>
          <p><strong>Password:</strong> {"*".repeat(student.password.length)}</p>
        </div>

        <div className="button-container" style={{ marginTop: "2rem", textAlign: "right" }}>
          <button 
            onClick={handleEditProfile} 
            className="edit-btn"
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Edit Profile
          </button>

          <button 
            onClick={handleResetPassword}
            className="reset-btn"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--color-secondary)",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Reset Password
          </button>
        </div>
      </CardComp>
    </main>
  );
};

export default Profile;
