import { useEffect, useState } from "react"
import ChatSection from "../components/ChatSection"
import ChatSidebar from "../components/ChatSidebar"
import Navbar from "../components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import { useNavigate } from "react-router-dom";
import { getChatHistory, getChatIds } from "../services/geminiService";

const AdvisorChatPage = () => {
  const timestamp = Date.now().toString();

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(timestamp);
  const [chats, setChats] = useState([{ id: timestamp, text: "New Chat" }]);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const loadChats = async() => {
      if (chats.length === 1) {
        const response = await getChatIds("advisor");
        const chatIds = response.chat_ids;
        console.log("Chat Ids: ", chatIds);

        const newChats = [];
        chatIds.forEach(async(chatId) => {
          const response = await getChatHistory(chatId, "advisor");
          const history = response.history;
          const chatHistory = JSON.parse(history).history;

          console.log("Chat id: ", chatId);
          console.log("Chat history: ", chatHistory);

          newChats.push({ id: chatId, text: chatHistory[3].text });
        });
        newChats.push(chats[0]);

        setChats(newChats);
      }
    }
    
    loadChats();
  }, []);

  const startNewChat = () => {
    const newChatId = Date.now().toString();

    const newChat = { id: newChatId, text: "New Chat"};
    setCurrentChatId(newChatId);
    setMessages([]);

    const newChats = [...chats, newChat];
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
        setChats={setChats}
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