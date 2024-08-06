import React from 'react'
import "../styles/BackButton.css";

const BackButton = () => {
  return (
    <button className='flex items-center'>
      <span class="back-icon material-symbols-outlined mx-1">
        arrow_back_ios
      </span>
      Back
    </button>
  )
}

export default BackButton