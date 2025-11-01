import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComp from "../../../components/card/cardComponent";
import "./signUp.css"

const LogIn = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    department: "Software Development",
    program: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      setStatus("Please fill all fields.");
      return;
    }

    setStatus("Signing In...");

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retrieve all users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user that matches email/username + password
    const matchedUser = users.find(
      (u) =>
        (u.email === formData.email || u.username === formData.email) &&
        u.password === formData.password
    );

    if (!matchedUser) {
      setStatus("Invalid email/username or password.");
      return;
    }

    // Save logged-in user to current session
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    setStatus("Sign In successful! Redirecting...");
    

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <main className="signup-page">
      <CardComp title="Sign in">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-section">
            <div className="form-row">
              <input className="SignUpInput" name="email" placeholder="Email/Username" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="form-section">
            <div className="form-row">
              <input className="SignUpInput" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button className="submit" type="submit">Submit</button>
          </div>

          {status && <p className="status">{status}</p>}
        </form>
      </CardComp>
    </main>
  );
};

export default LogIn;
