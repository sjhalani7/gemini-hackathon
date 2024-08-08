import ChatSection from "../components/ChatSection"
import ChatSidebar from "../components/ChatSidebar"
import Navbar from "../components/Navbar"

const TutorChatPage = () => {
  return (
    <div className="flex flex-row w-full h-full">
      <ChatSidebar header='Gemini Tutor'/>
      <div className="flex flex-col w-full h-full">
        <Navbar backLink="/course-selection"/>
        <ChatSection mode="tutor"/>
      </div>
    </div>
  )
}

export default TutorChatPage