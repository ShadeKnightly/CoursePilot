import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/bvc_logo.png";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("studentUser"));
    setUser(storedUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("studentUser");
    setUser(null);
    navigate("/signup");
  };

  const handleViewPrograms = () => {
    navigate("/viewPrograms");
  }

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          className="logo"
          alt="logo"
          src={logo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </div>

      <h1 className="title">Course Pilot</h1>

      <div className="header-right">

        <button
        onClick={handleViewPrograms} 
        className="header-button"
        style={{ marginRight: "10px" }}>
        Programs
        </button>

        {user ? (
          <>
            <span style={{ marginRight: "10px", fontWeight: "500" }}>
              Welcome, {user.firstName}
            </span>
            <button
              onClick={handleSignOut}
              className="header-button">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={handleSignUp} className="header-button">
            Sign Up
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
