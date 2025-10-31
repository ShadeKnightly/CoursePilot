import React, { useState, useEffect } from "react";
import CardComp from "../../components/card/cardComponent";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (storedUser) {
    setUser(storedUser);
  } else {
    // Optional: redirect to sign-in if no user found
    // navigate("/login");
    setUser(null);
  }
}, []);


  // Simulate button logic
  const handleEditProfile = () => {
    alert("Edit Profile clicked");
  };

  const handleResetPassword = () => {
    alert("Reset Password clicked");
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <main style={{ padding: "2rem", flex: 1, display: "flex", justifyContent: "center" }}>
      <CardComp title={`${user.username}'s Profile`}>
        <div className="user-info">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Birthdate:</strong> {user.birthdate}</p>
          <p><strong>Password:</strong> {"*".repeat(user.password.length)}</p>
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
