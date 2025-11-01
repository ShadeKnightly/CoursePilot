import React, { useState } from "react";
import CardComp from "../../../components/card/cardComponent";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!term) {
      setStatus("Please select a term before submitting.");
      return;
    }

    setStatus("Saving your term selection...");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus(`Term "${term}" successfully saved!`);

    setTimeout(() => {
      navigate("/courseSelect");
    }, 1000);
  };

  return (
    <main className="registration-page">
      <CardComp title="Course Registration">
        <div className="registration-inner">
          <CardComp title="Select a term">
            <p className="registration-text">
              Before registering for courses, please select which term you plan
              to register for:
            </p>

            <form className="registration-form" onSubmit={handleSubmit}>
              <select className="RegFormTermSelect"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                <option value="">Select a Term</option>
                <option value="Spring">Spring: Mar–Jun</option>
                <option value="Summer">Summer: Jun–Aug</option>
                <option value="Fall">Fall: Sept–Dec</option>
                <option value="Winter">Winter: Jan–Mar</option>
              </select>

              <button className="RegSubmit" type="submit">Submit</button>
            </form>

            {status && <p className="status">{status}</p>}
          </CardComp>
        </div>
      </CardComp>
    </main>
  );
};

export default Registration;
