import { useState } from "react"
import ChatSection from "../components/ChatSection"
import ChatSidebar from "../components/ChatSidebar"
import Navbar from "../components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import { useNavigate } from "react-router-dom";

const AdvisorChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [chats, setChats] = useState([{ id: 1, text: "New Chat" }]);
  const [chatId, setChatId] = useState(1);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  const startNewChat = () => {
    const prevChatId = chatId;
    setChatId(prevChatId + 1);

    const newChat = { id: prevChatId + 1, text: "New Chat"};
    setCurrentChatId(prevChatId + 1);
    setMessages([]);

    const newChats = [newChat, ...chats];
    setChats(newChats);
  }

  const setInitialText = (id, text) => {
    const newChats = chats.map((chat) => {
      if (chat.id === id) {
        return { id: id, text: text };
      } else {
        return chat;
      }
    })

    setChats(newChats);
  }

  return (
    <div className="flex flex-row w-full h-full">
      <ChatSidebar 
        startNewChat={startNewChat} 
        chats={chats} 
        currentChatId={currentChatId} 
        setCurrentChatId={setCurrentChatId}
      />
      <div className="flex flex-col w-full h-full">
        <Navbar backLink="/gemini-selection"/>
        <ChatSection messages={messages} setMessages={setMessages} mode="advisor" chatId={currentChatId} setInitialText={setInitialText}/>
      </div>
    </div>
  )
}

export default AdvisorChatPage