import React, { useState, useContext } from "react";
import CardComp from "../../../components/card/cardComponent";
import "./contactPage.css"
import { UserContext } from "../../../context/UserContext";

const Contact = () => {
   const [status, setStatus] = useState("");
   const [formData, setFormData] = useState({
    Name: "",
    Subject: "",
    Message: ""
  });
  const { currentUser } = useContext(UserContext);

  //debug
  console.log("currentUser:", currentUser);


  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (const key in formData) {
      if (!formData[key]) {
        setStatus("Please fill all fields.");
        return;
      }
    }

    setStatus("Sending message...");

    // determine user id
    const userId = currentUser?.userID;
    if (!userId) {
      setStatus("You must be signed in to send a message.");
      return;
    }

    // Compose message payload (server expects a `message` field)
    const payload = {
      message: JSON.stringify({ name: formData.Name, subject: formData.Subject, body: formData.Message }),
    };

    try {
      const res = await fetch(`${API_BASE}/user/auth/messages/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server error: ${res.status}`);
      }

      setStatus("Message Sent Successfully");
      setFormData({ Name: "", Subject: "", Message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus(`Failed to send message: ${error.message}`);
      setTimeout(() => setStatus(""), 4000);
    }
  };


    return (
        <CardComp title="Contact Us">
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-section">
                    <div className="form-row">
                        <input className="ContactInput" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required />
                    </div>
                
                    <div className="form-row">
                        <input className="ContactInput" name="Subject" placeholder="Subject" value={formData.Subject} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <textarea className="MessageArea" name="Message" placeholder="Message" value={formData.Message} onChange={handleChange} required rows="4" />
                    </div>
                </div>
                <div className="form-actions">
                    <button className="submit" type="submit" disabled={status === "Sending message..."} >{status === "Sending message..." ? "Sending..." : "Submit"}</button>
                </div>
                {status && <p className="status">{status}</p>}
            </form>
        </CardComp>
    );

};


export default Contact;