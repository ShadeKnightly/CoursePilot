import React, { useState, useEffect } from "react";
import CardComp from "../../../components/card/cardComponent";
import SearchBox from "../../../components/Search/search";
import MessageItem from "../../../components/MessageItem/messageItem";

const MessageInbox = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchField, setSearchField] = useState("");
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Load mock data initially
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/user/auth/messages`);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || `Server error: ${res.status}`);
        }
        const data = await res.json();
        setMessages(data);
        setFilteredMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err.message);
      }
    };

    loadMessages();
  }, [API_BASE]);

  // Filter messages
  useEffect(() => {
    const searchValue = searchField.toLowerCase();
    const filtered = messages.filter(
      (msg) =>
        (msg.subject || "").toLowerCase().includes(searchValue) ||
        (msg.userId || "").toLowerCase().includes(searchValue) ||
        (msg.msg || "").toLowerCase().includes(searchValue)
    );
    setFilteredMessages(filtered);
  }, [searchField, messages]);

  const handleRemove = async (messageId) => {
    try {
      const res = await fetch(`${API_BASE}/user/auth/messages/${messageId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Failed to delete message: ${res.status}`);
      }

      // Remove from local state after successful deletion
      const updated = messages.filter((msg) => msg.messageId !== messageId);
      setMessages(updated);
      setFilteredMessages(updated);
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert(`Error deleting message: ${err.message}`);
    }
  };

  const onSearchChange = (e) => setSearchField(e.target.value);

  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title="Inbox">
        <SearchBox placeholder="Search messages..." onChangeHandler={onSearchChange} />
        <div className="messages-container">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <MessageItem
                key={msg.messageId}
                id={msg.messageId}
                senderId={msg.userId || "Unknown Sender"}
                subject={msg.subject || "(No Subject)"}
                body={msg.msg}
                date={(msg.createdAt.split("T")[0]) || "Unknown Date"}
                onRemove={() => handleRemove(msg.messageId)}
              />
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      </CardComp>
    </main>
  );
};

export default MessageInbox;
