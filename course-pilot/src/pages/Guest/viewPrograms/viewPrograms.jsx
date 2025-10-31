import React, { useState, useEffect } from "react";
import CardComp from "../../../components/card/cardComponent";
import InputBox, { LargeInputBox } from "../../../components/inputBox/inputBox";

import "./viewPrograms.css";


import "./viewPrograms.css";

const fetchAllPrograms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockDatabase = [
        {
          id: 1,
          title: "Software Development - Diploma",
          description:
            "A comprehensive two-year software development diploma program designed to equip students...",
          startDate: "September 5, 2024",
          endDate: "June 15, 2026",
          term: "Winter Term",
          domesticFee: "$9,254",
          internationalFee: "$27,735",
        },
        {
          id: 2,
          title: "Software Development - Post Diploma",
          description:
            "Jumpstart your tech career with our one-year post-diploma program in software development.",
          startDate: "September 5, 2024",
          endDate: "June 15, 2025",
          term: "Winter Term",
          domesticFee: "$7,895",
          internationalFee: "$23,675",
        },
      ];
      resolve(mockDatabase);
    }, 1000);
  });
};

const ViewPrograms = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchAllPrograms().then((data) => setPrograms(data));
  }, []);

  return (
    <main className="view-programs-page">
      <div className="program-container">
        {programs.map((program) => (
        <CardComp key={program.id} title={program.title} className="program-card-short">

            <LargeInputBox value={program.description} readOnly />
     
            <div className="program-grid">
                <div className="program-grid-left">
                <InputBox label="Start Date" value={program.startDate} readOnly />
                <InputBox label="End Date" value={program.endDate} readOnly />
                <InputBox label="Term" value={program.term} readOnly />
                </div>

            <div className="card-fees">
              <p>{program.domesticFee} domestic</p>
              <p>{program.internationalFee} international</p>
            </div>
            </div>
          </CardComp>
        ))}
      </div>
    </main>
  );
};

export default ViewPrograms;
