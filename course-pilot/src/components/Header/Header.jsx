import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Header.css";
import logo from "../../assets/bvc_logo.png";

function Header() {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useContext(UserContext);


const handleSignOut = async () => {
  try {
    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
    
    // Call logout endpoint to clear server-side cookie
    await fetch(`${API_BASE}/user/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear client-side state regardless of API call result
    setCurrentUser(null);
    setTimeout(() => {
      navigate("/viewPrograms");
    }, 0);
  }
};


  const handleViewCourses = () => {
    navigate("/viewCourses");
  }

  const handleViewPrograms = () => {
    navigate("/viewPrograms");
  }

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

        <button
        onClick={handleViewCourses}
        className="header-button"
        style={{}}>
        Courses
        </button>

        {currentUser ? (
          <>
            <button
              onClick={handleSignOut}
              className="header-button">
              Sign Out
            </button>
          </>
        ) : (
        <>
          <button onClick={() => navigate("/signup")} className="header-button">
            Sign Up
          </button>
          <button onClick={() => navigate("/login")} className="signin-link">
            Sign In
          </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
