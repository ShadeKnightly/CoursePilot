import React from "react";
import "./Background.css";

function Background({children}) {
  return (
    <div className="background">{children}</div>
  );
}

export default Background;