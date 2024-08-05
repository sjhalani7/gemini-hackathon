import { useState } from "react";
import "../styles/ChatPage.css";

const ChatInput = ( { handleSubmit } ) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(inputValue);
      setInputValue("");
    }
  }

  const handleClick = () => {
    handleSubmit(inputValue);
    setInputValue("");
  }

  return (
    <div className="chat-input-container flex flex-row items-center justify-between w-1/2 p-1 my-2">
      <input 
        type="text" 
        className="chat-input grow mx-5 p-1"
        placeholder="Enter question"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button 
        className="flex justify-center items-center send-button"
        onClick={handleClick}
      >
        <span className="material-symbols-outlined send-icon">
          send
        </span>
      </button>
    </div>
  )
}

export default ChatInput