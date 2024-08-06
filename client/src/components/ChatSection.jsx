import { useState } from "react";
import ChatConversation from "./ChatConversation"
import ChatInput from "./ChatInput"
import { initialize, sendQuery } from "../services/geminiService";

const ChatSection = () => {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (inputValue) => {    
    console.log("Submit clicked! Input: " + inputValue);
  
    // Immediately update the UI with the user's message
    const newMessages = [
      ...messages, 
      {
        text: inputValue,
        userSent: true
      }
    ];
    setMessages(newMessages);
  
    // Call the backend service and wait for the response
    try {
      const response = await sendQuery(inputValue);
      // Add the response message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.response, userSent: false } // Adjust if response structure is different
      ]);
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };
  

  return (
    <div className="flex flex-col justify-between items-center h-full p-2">
      <ChatConversation messages={messages}/>
      <ChatInput handleSubmit={handleSubmit}/>
    </div>
  )
}

export default ChatSection