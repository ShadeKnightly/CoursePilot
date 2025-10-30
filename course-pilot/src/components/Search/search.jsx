import React from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";

const SearchBox = ({ placeholder, onChangeHandler }) => (
  <div className="search-container">
    <FaSearch className="search-icon" />
    <input
      className="search-box"
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  </div>
);

export default SearchBox;
