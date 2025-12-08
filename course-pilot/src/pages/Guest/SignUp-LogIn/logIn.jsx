import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CardComp from "../../../components/card/cardComponent";
import "./signUp.css"


const LogIn = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.username || !formData.password) {
      setStatus("Please fill all fields.");
      return;
    }

    setStatus("Signing In...");

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      const res = await fetch(`${API_BASE}/user/auth/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      
      // Save logged-in user to current session 
      localStorage.setItem("currentUser", JSON.stringify(data));
      setCurrentUser(data);
      
      setStatus(`Welcome back, ${data.username || data.email}!`);

      // Redirect after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setStatus(`Sign in failed: ${error.message}`);
      setTimeout(() => setStatus(""), 4000);
    }
  };


  return (
    <main className="signup-page">
      <CardComp title="Sign in">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-section">
            <div className="form-row">
              <input className="SignUpInput" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>
          </div>
          <div className="form-section">
            <div className="form-row">
              <input className="SignUpInput" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button className="submit" type="submit" disabled={status === "Signing In..."}>{
              status === "Signing In..." ? "Signing In..." : "Submit"
            }</button>
          </div>

          {status && <p className="status">{status}</p>}
        </form>
      </CardComp>
    </main>
  );
};

export default LogIn;
