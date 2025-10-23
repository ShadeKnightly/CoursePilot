import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";


function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">View Profile</Link></li>
        <li><Link to="/registration">Course Registration</Link></li>
        <li><Link to="/manage">Add / Remove</Link></li>
        <li><Link to="/contact">Contact Form</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;