import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

function Menu({ isAdmin }) {
  return (
    <nav className="menu">
      <ul>
        {/* These links are common to both roles */}
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">View Profile</Link></li>
        
        {/* Conditional Links based on role */}
        {isAdmin ? (
          <>
            <li><Link to="/AdminCourses">Courses</Link></li> 
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/messages">Messages</Link></li>
          </>
        ) : (
          <>
            {/* STUDENT LINKS */}
            <li><Link to="/registration">Course Registration</Link></li>
            <li><Link to="/courses">My Courses</Link></li>
            <li><Link to="/contact">Contact Form</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Menu;