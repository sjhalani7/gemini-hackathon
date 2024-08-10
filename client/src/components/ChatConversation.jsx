import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage'; // Adjust the import based on your file structure
import LoadingAnimation from './LoadingAnimation';

const ChatConversation = ({ messages, loading }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col items-center w-3/5 overflow-y-scroll">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {loading && <LoadingAnimation />}
      <div ref={endOfMessagesRef}></div>
    </div>
  );
};

export default ChatConversation;
