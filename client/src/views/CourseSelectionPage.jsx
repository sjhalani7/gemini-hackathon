import { useState } from "react";
import "../styles/CourseSelection.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';

const CourseSelectionPage = () => {
  const [courses, setCourses] = useState([
    "CSEN 122 - Computer Architecture",
    "CSEN 161 - Web Dev",
    "CSEN 171 - Programming Languages",
    "CSEN 122 - Computer Architecture",
    "CSEN 161 - Web Dev",
    "CSEN 171 - Programming Languages",
    "CSEN 122 - Computer Architecture",
    "CSEN 161 - Web Dev",
    "CSEN 171 - Programming Languages",
    "CSEN 122 - Computer Architecture",
    "CSEN 161 - Web Dev",
    "CSEN 171 - Programming Languages",
    "CSEN 122 - Computer Architecture",
    "CSEN 161 - Web Dev",
    "CSEN 171 - Programming Languages",
    "CSEN 122 - Computer Architecture",
    "CSEN 161 - Web Dev",
    "CSEN 171 - Programming Languages",
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/");
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleClick = (course) => {
    navigate("/tutor-chat", { state: { course } });
  };  

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Navbar backLink="/gemini-selection"/>
      <div className="course-selection-container flex flex-col justify-start items-center grow">
        <div className="w-1/2 flex justify-between items-center mt-16 mb-2">
        <p className="selection-title">Select a course</p>
        <p>Term: Fall 2024</p>
        </div>
        <div className="input-container w-1/2 relative mb-2">
          <input
            type="text"
            placeholder="ex. CSEN 122 - Computer Architecture"
            className="input-box w-full p-3 pl-10"
            value={inputValue}
            onChange={handleInputChange}
          />
          <span className="material-symbols-outlined search-icon">search</span>
        </div>
        <div className="course-list flex flex-col w-1/2 h-1/2 mb-24">
          {filteredCourses.map((course, index) => (
            <button key={index} className="course-item w-full p-2 mb-2" onClick={() => handleClick(course)}>
              {course}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSelectionPage;
