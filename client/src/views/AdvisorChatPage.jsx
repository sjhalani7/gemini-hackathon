import ChatSection from "../components/ChatSection"
import Navbar from "../components/Navbar"

const AdvisorChatPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar backLink="/gemini-selection"/>
      <ChatSection mode="advisor"/>
    </div>
  )
}

export default AdvisorChatPage