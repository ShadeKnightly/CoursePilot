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
        //msg.subject.toLowerCase().includes(searchValue) ||
        //msg.name.toLowerCase().includes(searchValue) ||
        msg.msg.toLowerCase().includes(searchValue)
    );
    setFilteredMessages(filtered);
  }, [searchField, messages]);

  const handleRemove = (id) => {
    const updated = messages.filter((msg) => msg.id !== id);
    setMessages(updated);
    setFilteredMessages(updated);
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
                name={msg.name || "Unknown Sender"}
                subject={msg.subject || "(No Subject)"}
                body={msg.msg}
                date={msg.createdAt}
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
