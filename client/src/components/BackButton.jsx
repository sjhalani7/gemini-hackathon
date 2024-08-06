import React from 'react'
import "../styles/BackButton.css";
import { useNavigate } from 'react-router-dom';

const BackButton = ( { link } ) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  }
  
  return (
    <button className='flex items-center back-button' onClick={handleClick}>
      <span class="back-icon material-symbols-outlined mx-1">
        arrow_back_ios
      </span>
      <p>Back</p>
    </button>
  )
}

export default BackButton