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
    // If user already has a term (from DB or context) and not editing, populate it
    const existingTerm = currentUser?.selectedTerm || currentUser?.term || "";
    if (existingTerm && !isEditing) {
      setTerm(existingTerm);
    }
  }, [currentUser, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!term) {
      setStatus("Please select a term before submitting.");
      return;
    }

    // If switching term, warn the user that current courses will be unregistered
    const existingTerm = currentUser?.selectedTerm || currentUser?.term || "";
    const isSwitchingTerm = existingTerm && term && existingTerm !== term;
    if (isSwitchingTerm) {
      const confirmed = window.confirm(
        "Switching terms will unregister all courses from your current term. Do you want to continue?"
      );
      if (!confirmed) {
        setStatus("Term change cancelled.");
        setTimeout(() => setStatus(""), 2500);
        return;
      }
    }

    setStatus("Saving your term selection...");
    try {
      const userId = currentUser?.userId || currentUser?.userID || currentUser?.id;
      if (!userId) {
        throw new Error("Missing user ID; please sign in again.");
      }
      const payload = {
        term: term,
        // Hint to backend to unregister previous term courses if term is changing
        unregisterPrevious: Boolean(isSwitchingTerm)
      };
      const res = await fetch(`${API_BASE}/user/auth/${userId}/registration`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server error: ${res.status}`);
      }

      setStatus(
        isSwitchingTerm
          ? "Term changed and previous courses unregistered."
          : "Term selection saved successfully!"
      );

      // Update current user in context and localStorage
      const updatedUser = { ...currentUser, selectedTerm: term, term };
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
          <CardComp title={currentUser?.selectedTerm || currentUser?.term ? "Your Selected Term" : "Select a Term"}>
            {(!currentUser?.selectedTerm && !currentUser?.term) || isEditing ? (
              // Show form when no term selected or editing
              <>
                <p className="registration-text">
                  {(currentUser?.selectedTerm || currentUser?.term) && isEditing
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
                    {(currentUser?.selectedTerm || currentUser?.term) && isEditing && (
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
                    <strong>{currentUser.selectedTerm || currentUser.term}</strong>
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
