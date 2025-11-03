import React, { useState } from "react";
import { mockMessages } from "../../data";
import CardComp from "../../components/card/cardComponent";
import './AdminMessages.css';
import SearchBox from "../../components/Search/search.jsx";
import MessageDetailPopup from "../../components/MessageDetailPopup/MessageDetailPopup.jsx";

const AdminMessages = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSelect = (message) => {
    setSelectedMessage(message);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === message.id ? { ...m, read: true } : m
      )
    );
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredMessages = messages.filter(msg => {
    const statusMatch = (filter === 'All') || 
                        (filter === 'Unread' && !msg.read) || 
                        (filter === 'Read' && msg.read);

    const searchMatch = msg.sender.toLowerCase().includes(searchTerm) ||
                        msg.subject.toLowerCase().includes(searchTerm) ||
                        msg.message.toLowerCase().includes(searchTerm);
    
    return statusMatch && searchMatch;
  }); 

  return (
      <div className="content-area">
        <CardComp > {/* Main content card */}
          <div className="message-inbox-header">
            <h2>Message Inbox</h2>
            {/* 2. Pass the handler to the SearchBox component */}
            <SearchBox 
                placeholder={'Search'} 
                onChangeHandler={handleSearchChange}
            /> 
            <div className="filter-options">
              <label htmlFor="filter-select">Select</label>
              <select id="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
            </div>
          </div>

          <div className="message-container">
            {/* Messages List */}
            <div className="message-list-pane">
                <div className="message-list-header">
                  <span className="col-name">Name</span>
                  <span className="col-subject"></span>
                  <span className="col-date"></span>
                </div>
                <div className="message-scroll-area">
                  {/* Map over*/}
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => handleSelect(msg)}
                      className={`message-item ${msg.read ? 'read' : 'unread'} ${selectedMessage?.id === msg.id ? 'selected' : ''}`}
                    >
                      <div className="color-indicator"></div> {/* Visual indicator*/}
                      <p className="message-sender">{msg.sender}</p>
                      <p className="message-subject">{msg.subject}</p>
                      <p className="message-date">{msg.date}</p>
                    </div>
                  ))}
                  {/* Display message if no*/}
                  {filteredMessages.length === 0 && (
                      <p className="no-messages-found" style={{padding: '10px', textAlign: 'center'}}>No messages match your criteria.</p>
                  )}
                </div>

            </div>  
          </div>
        </CardComp>
        {/* 3. Render the MessageDetailPopup component */}
        {selectedMessage && (
            <MessageDetailPopup
                message={selectedMessage}
                onClose={handleClosePopup}
            />
        )}
      </div>
  );
};

export default AdminMessages;