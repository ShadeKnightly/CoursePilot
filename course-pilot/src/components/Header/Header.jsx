import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/bvc_logo.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

    
  // Load user from localStorage on mount or when route changes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);

    
  }, [location]);
  
  useEffect(()=>{
    const handleStorageChhange = () =>{
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(updatedUser);
    };
    
    window.addEventListener("storage", handleStorageChhange);
    return () => window.removeEventListener("storage", handleStorageChhange);
    
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/viewPrograms");
  };
  const handleSignIn = () => {
    navigate("/login");
  }

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
          <button onClick={handleSignIn} className="signin-link">
            Sign In
          </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
