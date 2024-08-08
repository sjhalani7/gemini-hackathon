import React from 'react'

const ChatSidebar = () => {
  return (
    <div className='sidebar flex flex-col justify-between'>
      <div className='px-3 py-4'>
        <p className='font-bold'>Recent Chats</p>
      </div>
      <button className='new-chat-button flex flex-row items-center text-left'>
        <span class="material-symbols-outlined p-3">
          add
        </span>
        <p>New Chat</p>
      </button>
    </div>
  )
}

export default ChatSidebar