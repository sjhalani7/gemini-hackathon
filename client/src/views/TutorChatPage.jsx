import { useState } from "react"
import ChatSection from "../components/ChatSection"
import ChatSidebar from "../components/ChatSidebar"
import Navbar from "../components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import { useLocation, useNavigate } from "react-router-dom";

const TutorChatPage = () => {
  const location = useLocation();
  const course = location.state?.course;

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(course);
  const [chats, setChats] = useState([{ id: course, text: "New Chat" }]);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  const startNewChat = () => {
    navigate('/course-selection');
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
        <Navbar backLink="/course-selection"/>
        <ChatSection messages={messages} setMessages={setMessages} mode="tutor" chatId={currentChatId} setInitialText={setInitialText}/>
      </div>
    </div>
  )
}

export default TutorChatPage