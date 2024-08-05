import { useState } from "react";
import ChatConversation from "./ChatConversation"
import ChatInput from "./ChatInput"

const ChatSection = () => {
  const [messages, setMessages] = useState([
    { 
      text: "What is a string?",
      userSent: true 
    },
    { 
      text: "A string consists of many characters. Its underlying structure is usually some type of list.",
      userSent: false 
    },
  ]);

  const handleSubmit = (inputValue) => {    
    console.log("Submit clicked! Input: " + inputValue);
    console.log("Messages: ", messages);

    const newMessages = [
      ...messages, 
      {
        text: inputValue,
        userSent: true
      }
    ];

    setMessages(newMessages);
  }

  return (
    <div className="flex flex-col justify-between items-center h-full p-2">
      <ChatConversation messages={messages}/>
      <ChatInput handleSubmit={handleSubmit}/>
    </div>
  )
}

export default ChatSection