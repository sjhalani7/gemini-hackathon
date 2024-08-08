import React from 'react'

const ChatSidebar = ( { header } ) => {
  return (
    <div className='sidebar flex flex-col justify-between'>
      <div className='px-3 py-4'>
        <h1 className='font-bold mb-4'>{header}</h1>
        <p>Recent Chats</p>
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