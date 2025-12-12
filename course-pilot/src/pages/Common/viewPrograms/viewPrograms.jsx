import React, { useState, useEffect } from "react";
import CardComp from "../../../components/card/cardComponent";
import InputBox, { LargeInputBox } from "../../../components/inputBox/inputBox";
import "./viewPrograms.css";


const ViewPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";



  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/course/auth/programs`);

        if (!res.ok) {
          throw new Error(`Error fetching programs: ${res.statusText}`);
        }

        const data = await res.json();
        setPrograms(data || []);
      } catch (err) {
        console.error("Failed to fetch programs:", err);
        setError(err.message);
        return [];
      } finally {
        setLoading(false);
      }
    };
    fetchAllPrograms();
  }, [API_BASE]);

  return (
    <main className="view-programs-page">
      {loading ? (
        <div className="program-container">
          <p>Loading programs...</p>
        </div>
      ) : error ? (
        <div className="program-container">
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="program-container">
          <p>No programs available.</p>
        </div>
      ) : (
        <div className="program-container">
          {programs.map((program) => (
            <CardComp key={program.programID} title={program.title || ""} className="program-card-short">

              <LargeInputBox value={program.description || ""} readOnly />

              <div className="program-grid">
                <div className="program-grid-left">
                  <InputBox label="Start Date" value={program.startDate.split("T")[0] || ""} readOnly />
                  <InputBox label="End Date" value={program.endDate.split("T")[0] || ""} readOnly />
                  <InputBox label="Term" value={program.term || ""} readOnly />
                </div>

                <div className="card-fees">
                  <p>{program.feesDomestic || ""} domestic</p>
                  <p>{program.feesInternational || ""} international</p>
                </div>
              </div>
            </CardComp>
          ))}
        </div>
      )}
    </main>
  );
};

export default ViewPrograms;
