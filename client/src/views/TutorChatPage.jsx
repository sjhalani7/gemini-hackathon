import { useEffect, useState } from "react"
import ChatSection from "../components/ChatSection"
import ChatSidebar from "../components/ChatSidebar"
import Navbar from "../components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import { useNavigate } from "react-router-dom";
import CourseSelectionPage from "./CourseSelectionPage";

const TutorChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const loadChats = async() => {
      if (chats.length === 1) {
        const response = await getChatIds("tutor");
        const chatIds = response.chat_ids;
        console.log("Chat Ids: ", chatIds);

        const newChats = [];
        await Promise.all(chatIds.map(async(chatId) => {
          const response = await getChatHistory(chatId, "tutor");
          const history = response.history;
          const chatHistory = JSON.parse(history).history;

          newChats.push({ id: chatId, text: chatHistory[3].text });
        }));
        newChats.push(chats[0]);

        setChats(newChats);
      }
    }
    
    //loadChats();
  }, []);

  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  }

  const handleCourseClick = (course) => {
    const newChatId = course.toString();
    console.log("Starting new chat with course: ", newChatId)

    const newChat = { id: newChatId, text: newChatId };
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

  if (!currentChatId) {
    return <CourseSelectionPage startNewChat={handleCourseClick} />;
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
        <Navbar backLink="/gemini-selection" />
        <ChatSection 
          messages={messages} 
          setMessages={setMessages} 
          mode="tutor" 
          chatId={currentChatId} 
          setInitialText={setInitialText} 
          course={currentChatId}
        />
      </div>
    </div>
  )
}

export default TutorChatPage;
