import React, { useState } from "react";
import CardComp from "../../../components/card/cardComponent";
import "./contactPage.css"

const Contact = () => {
   const [status, setStatus] = useState("");
   const [formData, setFormData] = useState({
    Name: "",
    Subject: "",
    Message: ""
  });

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

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const messageId = Date.now(); 

    // Create message object
    const newMessage = { ...formData, messageId };

    // Save to localStorage (you could also store multiple messages)
    const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
    existingMessages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(existingMessages));

    setStatus("Message Sent Successfully");
    setFormData({ Name: "", Subject: "", Message: "" });

    setTimeout(() => setStatus(""), 3000);
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