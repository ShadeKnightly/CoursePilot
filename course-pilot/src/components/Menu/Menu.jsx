import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  // grab the current user from our context and check which role it is
  const { currentUser } = useContext(UserContext);
  const isAdmin = currentUser?.role === "admin";

  if(currentUser){
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">View Profile</Link></li>
        {isAdmin ? (
          <>
            <li><Link to="/courses">Manage Courses</Link></li>
            <li><Link to="/students">Manage Students</Link></li>
            <li><Link to="/messageInbox">View Messages</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/registration">Course Registration</Link></li>
            <li><Link to="/courses">My Courses</Link></li>
            <li><Link to="/contact">Contact Form</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
}

export default Menu;