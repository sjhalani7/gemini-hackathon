import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../styles/MajorSelectionPage.css";
import { useNavigate } from 'react-router-dom';

const MajorSelectionPage = () => {
  const [selectedMajors, setSelectedMajors] = useState([]);
  const navigate = useNavigate();
  
  const casMajors = [
    "Ancient Studies",
    "Anthropology",
    "Art History",
    "Biochemistry",
    "Biology",
    "Chemistry",
    "Child Studies",
    "Classical Studies",
    "Communication",
    "Computer Science",
    "Engineering Physics",
    "English",
    "Environmental Studies and Sciences",
    "Ethnic Studies",
    "Greek Language and Literature",
    "History",
    "Individual Studies",
    "Latin and Greek",
    "Latin Language and Literature",
    "Mathematics",
    "Military Science",
    "Modern Languages and Literatures",
    "Music",
    "Neuroscience",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Public Health Science",
    "Religious Studies",
    "Sociology",
    "Studio Art",
    "Theatre and Dance",
    "Women's and Gender Studies"
  ];

  const businessMajors = [
    "Accounting",
    "Accounting & Information Systems",
    "Economics",
    "Finance",
    "Individual Studies",
    "Management & Entrepreneurship",
    "Management Information Systems",
    "Marketing"
  ];

  const engineeringMajors = [
    "Bioengineering",
    "Civil, Environmental, and Sustainable Engineering",
    "Computer Science and Engineering",
    "Electrical Engineering",
    "Electrical and Computer Engineering",
    "General Engineering",
    "Mechanical Engineering",
    "Web Design and Engineering"
  ];

  const toggleMajorSelection = (major) => {
    setSelectedMajors(prevSelectedMajors =>
      prevSelectedMajors.includes(major)
        ? prevSelectedMajors.filter(m => m !== major)
        : [...prevSelectedMajors, major]
    );
  };

  const renderMajorButtons = (majors) => {
    return majors.map((major, index) => (
      <>
      <button
        key={index}
        className={`major-button p-1 m-1 ${selectedMajors.includes(major) ? 'selected' : ''}`}
        onClick={() => toggleMajorSelection(major)}
      >
        {major}
      </button>
      {index !== majors.length - 1 && <span> • </span>}
      </>
    ));
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Navbar backLink="/gemini-selection" />
      <div className="major-selection-container flex flex-col justify-start items-center grow">
        <div className='w-2/3 flex mb-10'>
          <p className="selection-title mt-16">Select your <strong>major(s)</strong></p>
        </div>
        <div className='w-2/3'>
          <div className='mb-10'>
            <p>College of Arts and Sciences</p>
            <div>{renderMajorButtons(casMajors)}</div>
          </div>
          <div className='mb-10'>
            <p>Leavey School of Business</p>
            <div>{renderMajorButtons(businessMajors)}</div>
          </div>
          <div className='mb-10'>
            <p>School of Engineering</p>
            <div>{renderMajorButtons(engineeringMajors)}</div>
          </div>
        </div>
        {selectedMajors.length > 0 && <div className="w-2/3 flex flex-row justify-end">
          <button className='flex items-center next-button p-2' onClick={() => navigate("/minor-selection")}>
            <p>Next</p>
            <span className="material-symbols-outlined next-icon ml-1">
              arrow_forward_ios
            </span>
          </button>
        </div>}
      </div>
    </div>
  );
};

export default MajorSelectionPage;
