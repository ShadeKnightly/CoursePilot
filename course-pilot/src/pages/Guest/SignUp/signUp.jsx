import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComp from "../../../components/card/cardComponent";
import "./signUp.css"

const SignUp = () => {
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
    for (const key in formData) {
      if (!formData[key]) {
        setStatus("Please fill all fields.");
        return;
      }
    }

    setStatus("Creating account...");

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate unique student ID
    const studentId = "S" + Math.floor(Math.random() * 1000000).toString();

    // Create user object
    const newUser = { ...formData, studentId };

    // Save to localStorage (you could also store multiple users)
    localStorage.setItem("studentUser", JSON.stringify(newUser));

    setStatus("Sign Up successful! Redirecting...");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <main className="signup-page">
      <CardComp title="Sign Up">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-section">
            <h3>Personal</h3>
            <div className="form-row">
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-row">
              <input type="date" name="birthday" placeholder="Date of Birth" value={formData.birthday} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h3>Account Information</h3>
            <div className="form-row">
              <input name="program" placeholder="Program" value={formData.program} onChange={handleChange} />
              <select name="department" value={formData.department} onChange={handleChange} disabled>
                <option value="Software Development">Department</option>
              </select>
            </div>
            <div className="form-row">
              <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>

          {status && <p className="status">{status}</p>}
        </form>
      </CardComp>
    </main>
  );
};

export default SignUp;
