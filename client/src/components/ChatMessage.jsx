import React from 'react';

const ChatMessage = ({ message }) => {
  const { text, userSent } = message;
  return (
    <div className={`flex w-full ${userSent ? 'user-message' : 'bot-message'}`}>
      <p className={`message px-4 py-3 m-2`}>
        {text}
      </p>
    </div>
  );
};

export default ChatMessage;
