import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import "./cardComp.css";
import { Link, useLocation } from "react-router-dom";

const CardComp = ({ title, children }) => {
  const location = useLocation();

  // Only show icons on the Course Registration page
  const showIcons = location.pathname === "/courseSelect";

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
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
