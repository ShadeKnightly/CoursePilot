import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComp from "../../components/card/cardComponent.jsx";
import Search from "../../components/Search/search.jsx";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // --- FETCH MESSAGES FROM BACKEND ---
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  // --- HANDLE FILTERING ---
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Unread"
        ? !msg.read
        : msg.read;

    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // --- HANDLE MARK AS READ ---
  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`/api/messages/${id}`, { read: true });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } catch (err) {
      console.error("❌ Error updating message:", err);
    }
  };

  return (
    <div className="admin-message-container">
      <CardComp
        title="Message Inbox"
        headerComponent={
          <div className="message-header-tools">
            <Search
              placeholder="Search messages..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-dropdown">
              <label htmlFor="filter">Filter:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="message-list">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${msg.read ? "read" : "unread"}`}
                onClick={() => handleMarkAsRead(msg.id)}
              >
                <div className="message-row">
                  <span className="message-name">{msg.name}</span>
                  <span className="message-subject">{msg.subject}</span>
                  <span className="message-date">{msg.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-messages">No messages found.</p>
          )}
        </div>
      </CardComp>
    </div>
  );
};

export default AdminMessages;
