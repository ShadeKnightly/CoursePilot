import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import "./cardComp.css";
import { Link, useLocation } from "react-router-dom";

// added headerComponent prop for the search bar inside of cardComponent in Admin Courses
const CardComp = ({ title,headerComponent, actionButton, children }) => {
  const location = useLocation();

  // Only show icons on the Course Registration page
  const showIcons = location.pathname === "/courseSelect";

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <div className="card-header-search-bar">
          {headerComponent}
        </div>
        <div className="card-header-action">
          {actionButton}
        </div>
        

        {showIcons && (
          <div className="card-icons">
            <Link to="/search" className="icon-button">
              <FaSearch />
            </Link>
            <Link to="/cart" className="icon-button">
              <FaShoppingCart />
            </Link>
          </div>
        )}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default CardComp;
