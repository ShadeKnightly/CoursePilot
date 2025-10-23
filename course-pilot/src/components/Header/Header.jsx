import React from "react";
import "./Header.css";
import logo from "../../assets/bvc_logo.png"

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img
          className="logo"
          alt="logo"
          src={logo}
        />
      </div>

      <h1 className="title">Course Pilot</h1>

      <div className="header-right">
        <a href="/signup" className="signup-link">
          Sign Up
        </a>
      </div>
    </header>
  );
}

export default Header;
