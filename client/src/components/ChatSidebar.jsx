import React from 'react'
import ChatSessionButton from './ChatSessionButton'

const ChatSidebar = ({ startNewChat, chats, currentChatId, setCurrentChatId }) => {
  return (
    <div className='sidebar flex flex-col justify-between'>
      <div className='px-3 py-2 flex flex-col items-start'>
        <p className='font-bold p-2 my-1'>Recent Chats</p>
        {chats.map((chat) => 
          <ChatSessionButton 
            id={chat.id} 
            text={chat.text} 
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}/>
        )}
      </div>
      <button onClick={startNewChat} className='new-chat-button flex flex-row items-center text-left'>
        <span class="material-symbols-outlined p-3">
          add
        </span>
        <p>New Chat</p>
      </button>
    </div>
  )
}

export default ChatSidebar