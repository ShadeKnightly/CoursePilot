import React from "react";
import "./inputBox.css";

const InputBox = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  className = "",
  multiline = false, 
}) => {
  return (
    <div className={`input-box-wrapper ${className}`}>
      {label && <label className="input-label">{label}</label>}
     
     {multiline ? (
        <textarea
          className="input-box textarea-box"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={5}
        />
     )
     : (
     
      <input
        className="input-box"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
         />
      )}
    </div>
  );
};

{/*LargeInputBox render the same input but styled differently*/}
export const LargeInputBox = ({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  return (
    <div className="input-box-wrapper">
      {label && <label className="input-label">{label}</label>}
      <textarea
        className="input-box textarea-box"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};
export default InputBox;
