import { useState } from "react";
import "../styles/CourseSelection.css";

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="course-selection-container flex flex-col justify-center items-center h-full w-full">
      <p className="selection-title mt-24 mb-2">Select a course</p>
      <p className="mb-2">Term: Fall 2024</p>
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
      <div className="course-list flex flex-col w-1/2 mb-24">
        {filteredCourses.map((course, index) => (
          <button key={index} className="course-item w-full p-2 mb-2">
            {course}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelectionPage;
