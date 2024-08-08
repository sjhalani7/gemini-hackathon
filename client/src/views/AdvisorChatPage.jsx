import ChatSection from "../components/ChatSection"
import ChatSidebar from "../components/ChatSidebar"
import Navbar from "../components/Navbar"

const AdvisorChatPage = () => {
  return (
    <div className="flex flex-row w-full h-full">
      <ChatSidebar/>
      <div className="flex flex-col w-full h-full">
        <Navbar backLink="/gemini-selection"/>
        <ChatSection mode="advisor"/>
      </div>
    </div>
  )
}

export default AdvisorChatPage