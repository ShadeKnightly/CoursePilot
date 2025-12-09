import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import CardComp from "../../../components/card/cardComponent";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    // If user has a term and is not editing, set it
    if (currentUser?.selectedTerm && !isEditing) {
      setTerm(currentUser.selectedTerm);
    }
  }, [currentUser, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!term) {
      setStatus("Please select a term before submitting.");
      return;
    }

    setStatus("Saving your term selection...");
    try {
      const payload = {
        term: term
      };
      const res = await fetch(`${API_BASE}/user/auth/${currentUser.userID}/registration`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server error: ${res.status}`);
      }

      setStatus("Term selection saved successfully!");

      // Update current user in context and localStorage
      const updatedUser = { ...currentUser, selectedTerm: term };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setTimeout(() => {
        navigate("/courseSelect");
      }, 1500);
    } catch (error) {
      setStatus(`Failed to save term selection: ${error.message}`);
      setTimeout(() => setStatus(""), 4000);
    }
  };

  const handleContinue = () => {
    // User continues with current term without changes
    navigate("/courseSelect");
  };

  const handleEdit = () => {
    // Enable editing mode
    setIsEditing(true);
    setStatus("");
  };

  const handleCancel = () => {
    // Cancel editing and revert to current term
    setTerm(currentUser?.selectedTerm || "");
    setIsEditing(false);
    setStatus("");
  };

  return (
    <main className="registration-page">
      <CardComp title="Course Registration">
        <div className="registration-inner">
          <CardComp title={currentUser?.selectedTerm ? "Your Selected Term" : "Select a Term"}>
            {!currentUser?.selectedTerm || isEditing ? (
              // Show form when no term selected or editing
              <>
                <p className="registration-text">
                  {currentUser?.selectedTerm && isEditing
                    ? "Change your term selection:"
                    : "Before registering for courses, please select which term you plan to register for:"}
                </p>

                <form className="registration-form" onSubmit={handleSubmit}>
                  <select
                    className="RegFormTermSelect"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  >
                    <option value="">Select a Term</option>
                    <option value="Spring">Spring: Mar–Jun</option>
                    <option value="Summer">Summer: Jun–Aug</option>
                    <option value="Fall">Fall: Sept–Dec</option>
                    <option value="Winter">Winter: Jan–Mar</option>
                  </select>

                  <div className="button-group">
                    <button className="RegSubmit" type="submit">
                      Submit
                    </button>
                    {currentUser?.selectedTerm && isEditing && (
                      <button
                        className="RegCancel"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              // Show current term with options when term is selected
              <>
                <div className="current-term-display">
                  <p className="registration-text">
                    Your current term selection:
                  </p>
                  <p className="term-badge">
                    <strong>{currentUser.selectedTerm}</strong>
                  </p>
                </div>

                <div className="button-group">
                  <button
                    className="RegSubmit"
                    type="button"
                    onClick={handleContinue}
                  >
                    Continue with this Term
                  </button>
                  <button
                    className="RegEdit"
                    type="button"
                    onClick={handleEdit}
                  >
                    Change Term
                  </button>
                </div>
              </>
            )}

            {status && <p className="status">{status}</p>}
          </CardComp>
        </div>
      </CardComp>
    </main>
  );
};

export default Registration;
