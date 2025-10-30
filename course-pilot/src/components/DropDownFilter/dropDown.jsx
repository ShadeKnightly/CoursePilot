import React from "react";
import './dropDown.css'


const DropDownFilter = ({ onChangeHandler, value }) => {
    return (
        <select onChange={onChangeHandler} value={value}>
            <option value="">Select a Term</option>
            <option value="spring">Spring: Mar–Jun</option>
            <option value="summer">Summer: Jun–Aug</option>
            <option value="fall">Fall: Sept–Dec</option>
            <option value="winter">Winter: Jan–Mar</option>
        </select>
    );
};




export default DropDownFilter;