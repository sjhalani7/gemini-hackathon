import ChatSection from "../components/ChatSection"
import Navbar from "../components/Navbar"

const ChatPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar backLink="/course-selection"/>
      <ChatSection />
    </div>
  )
}

export default ChatPage