import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const { text, userSent } = message;
  return (
    <div className={`flex w-full ${userSent ? 'user-message' : 'bot-message'}`}>
      <div className={`message px-4 py-3 m-2`}>
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
