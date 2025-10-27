import React from "react";
import "./cardComp.css";

function CardComp({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default CardComp;
