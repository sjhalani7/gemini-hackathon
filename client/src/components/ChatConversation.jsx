import React from 'react';
import ChatMessage from './ChatMessage'; // Adjust the import based on your file structure

const ChatConversation = ({ messages }) => {
  return (
    <div className="flex flex-col grow w-1/2 overflow-y-scroll">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatConversation;
