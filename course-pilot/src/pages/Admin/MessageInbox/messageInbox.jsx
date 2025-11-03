import React, { useState, useEffect } from "react";
import CardComp from "../../../components/card/cardComponent";
import SearchBox from "../../../components/Search/search";
import MessageItem from "../../../components/MessageItem/messageItem";
import { mockMessages } from "../../../data";

const MessageInbox = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchField, setSearchField] = useState("");

  // Load mock data initially
  useEffect(() => {
    setMessages(mockMessages);
    setFilteredMessages(mockMessages);
  }, []);

  // Filter messages
  useEffect(() => {
    const searchValue = searchField.toLowerCase();
    const filtered = messages.filter(
      (msg) =>
        msg.subject.toLowerCase().includes(searchValue) ||
        msg.name.toLowerCase().includes(searchValue) ||
        msg.body.toLowerCase().includes(searchValue)
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
                key={msg.id}
                id={msg.id}
                name={msg.name}
                subject={msg.subject}
                body={msg.body}
                date={msg.date}
                onRemove={() => handleRemove(msg.id)}
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
