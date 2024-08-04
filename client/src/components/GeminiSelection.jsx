import { useNavigate } from "react-router-dom";
import "../styles/GeminiSelection.css";

const GeminiSelection = ( { title, iconName, desc, path } ) => {
  const navigate = useNavigate();

  return (
    <button 
      className="gemini-selection-container flex flex-col mx-4 p-1 justify-center"
      onClick={() => navigate(path)}
    >
      <p className="font-bold m-2">{title}</p>
      <span className="m-2 material-symbols-outlined gemini-icon">{iconName}</span>
      <p className="m-2">{desc}</p>
    </button>
  )
}

export default GeminiSelection