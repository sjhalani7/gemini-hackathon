import ChatSection from "../components/ChatSection"
import Navbar from "../components/Navbar"

const TutorChatPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar backLink="/course-selection"/>
      <ChatSection mode="tutor"/>
    </div>
  )
}

export default TutorChatPage