import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const user = currentUser;

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
          <p><strong>Birthdate:</strong> {user.birthday}</p>
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
