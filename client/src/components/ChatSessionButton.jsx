import React from 'react'

const ChatSessionButton = ({ id, text, currentChatId, setCurrentChatId }) => {
  const handleClick = () => {
    setCurrentChatId(id);
  }

  return (
    <button 
      className={`chat-session-button w-full rounded text-left p-2 my-1 ${id === currentChatId && 'chat-selected'}` }
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default ChatSessionButton