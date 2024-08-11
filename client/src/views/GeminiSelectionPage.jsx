import GeminiSelection from "../components/GeminiSelection"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import { useNavigate } from "react-router-dom";

const GeminiSelectionPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="selection-title mb-5">Choose an option</p>
      <div className="flex flex-row">
        <GeminiSelection 
          title="Gemini Advisor"
          iconName="event_note"
          desc="Create schedules based on upcoming course availability"
          path="/advisor-chat"
        />

        <GeminiSelection 
          title="Gemini Tutor"
          iconName="school"
          desc="Chat with Gemini to ask questions about class material"
          path="/tutor-chat"
        />
      </div>
    </div>
  )
}

export default GeminiSelectionPage