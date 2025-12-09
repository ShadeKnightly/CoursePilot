import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComp from "../../../components/card/cardComponent";
import "./signUp.css"
// import { FaExpandArrowsAlt } from "react-icons/fa";

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

  const [errors, setErrors] = useState({});
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // handleChange
const handleChange = (e) => {
  const { name, value } = e.target;

  // Prevent typing more than 10 digits for phone
  if (name === "phone") {
    if (!/^\d*$/.test(value)) return;  // Only digits allowed
    if (value.length > 10) return;     // Max 10 digits
  }

  setFormData((prev) => ({ ...prev, [name]: value }));

  // Run validation only for non-phone fields immediately
  if (name !== "phone") {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }
};

// Validate phone on blur
const handleBlur = (e) => {
  const { name, value } = e.target;
  if (name === "phone") {
    setErrors((prev) => ({ ...prev, phone: validateField(name, value) }));
  }
};

// Validation functions
const validateField = (name, value) => {

  const trimmed = value.trim(); // remove leading/trailing spaces

  switch (name) {
    case "firstName":
    case "lastName":
      if (!value) return "Required";
      if (!/^[a-zA-Z'-]+$/.test(value)) 
        return "Name can only contain letters, apostrophes, or hyphens";
      break;
    case "email":
      if (!value) return "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
      break;
    case "phone":
      if (!value) return "Required";
      if (value.length !== 10) return "Phone must be 10 digits";
      break;
    case "username":
      if (!value) return "Required";
      if (/\s/.test(value)) return "Username cannot contain spaces";
      break;
    case "password":
      if (!value) return "Required"; // check original value
      if (/\s/.test(value)) return "Password cannot contain spaces"; // reject any spaces
      if (value.length < 6) return "Password must be at least 6 characters";
      break;
    case "program":
      if (!value) return "Required";
      break;
    case "birthday":
      if (!value) return "Required";
      break;
    default:
      return "";
  }
  return "";
};


 const handleSubmit = async (e) => {
    e.preventDefault();

 // Run all validations before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("Creating account...");

    try {
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        birthday: formData.birthday,
        department: formData.department,
        program: formData.program,
        username: formData.username,
        password: formData.password,
      };

      const res = await fetch(`${API_BASE}/user/auth/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || `Server error: ${res.status}`);
      }

      //const data = await res.json();
      setStatus("Sign up successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setStatus(`Sign up failed: ${error.message}`);
      setTimeout(() => setStatus(""), 4000);
    }
  };


   return (
    <main className="signup-page">
      <CardComp title="Sign Up">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-section">
            <h3>Personal</h3>
            <div className="form-row">
              <div>
                <input
                  className="SignUpInput"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div>
                <input
                  className="SignUpInput"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div>
                <input
                  className="SignUpInput"
                  type="date"
                  name="birthday"
                  placeholder="Date of Birth"
                  value={formData.birthday}
                  onChange={handleChange}
                />
                {errors.birthday && <span className="error-text">{errors.birthday}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div>
                <input
                  className="SignUpInput"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div>
                <input
                    className="SignUpInput"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}

              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Account Information</h3>
            <div className="form-row">
              <div>
                <input
                  className="SignUpInput"
                  name="program"
                  placeholder="Program"
                  value={formData.program}
                  onChange={handleChange}
                />
                {errors.program && <span className="error-text">{errors.program}</span>}
              </div>
              <div>
                <select
                  className="signUpDepartSelect"
                  name="department"
                  value={formData.department}
                  disabled
                >
                  <option value="Software Development">Department</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div>
                <input
                  className="SignUpInput"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
              <div>
                <input
                  className="SignUpInput"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="submit" type="submit" disabled={status === "Creating account..."}>
              {status === "Creating account..." ? "Submitting..." : "Submit"}
            </button>
          </div>
          {status && <p className="status">{status}</p>}
        </form>
      </CardComp>
    </main>
  );
};

export default SignUp;