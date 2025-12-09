import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = currentUser;

  // Simulate button logic
  /*
  const handleEditProfile = () => {
    const updatedEmail = prompt("Enter new email:", user.email);
    const updatedPhone = prompt("Enter new phone number:", user.phone);

    if (!updatedEmail || !updatedPhone) {
      alert("Edit cancelled or invalid input.");
      return;
    }
    // Update current user data
    const updatedUser = { ...user, email: updatedEmail, phone: updatedPhone };

    // Update in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    //update in user context
    setCurrentUser(updatedUser);

    alert("Profile updated successfully!");
  };
  */

  const handleEditProfile = () => {
  const user = currentUser;

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let updatedEmail = user.email;

  while (true) {
    const input = prompt("Enter new email:", updatedEmail);
    if (input === null) return; // user clicked Cancel
    if (emailRegex.test(input)) {
      updatedEmail = input;
      break;
    } else {
      alert("Invalid email format. Please try again.");
    }
  }

  // Validate phone
  const phoneRegex = /^\d{10}$/; // 10-digit numbers only
  let updatedPhone = user.phone;

  while (true) {
    const input = prompt("Enter new phone number:", updatedPhone);
    if (input === null) return; // user clicked Cancel
    if (phoneRegex.test(input)) {
      updatedPhone = input;
      break;
    } else {
      alert("Invalid phone number format. Must be 10 digits. Please try again.");
    }
  }

  // Update current user data
  const updatedUser = { ...user, email: updatedEmail, phone: updatedPhone };

  // Update in localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((u) =>
    u.username === user.username ? updatedUser : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Update in context
  setCurrentUser(updatedUser);

  alert("Profile updated successfully!");
};




  const handleResetPassword = () => {
  const newPassword = prompt("Enter your new password:");
  if (!newPassword || newPassword.trim().length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const updatedUser = { ...user, password: newPassword };

  // Update in users list (localStorage)
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((u) =>
    u.username === user.username ? updatedUser : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Update currentUser in context
  setCurrentUser(updatedUser);

  alert("Password reset successfully!");
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
          <p><strong>Password:</strong> {user.password ? "*".repeat(user.password.length) : "••••••"}</p>
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
