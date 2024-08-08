import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import SignOutButton from './SignOutButton';
import "../styles/SignOutButton.css";

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='relative profile-section'>
        {user && (
          <div
            className={`profile-container rounded flex items-center cursor-pointer p-3 ${dropdownOpen && 'dropdown-open'}`}
            onClick={handleProfileClick}
          >
            <span>{user.displayName}</span>
            <img
              src={user.photoURL}
              alt="Profile"
              className='w-8 h-8 rounded-full ml-2'
            />
          </div>
        )}
        {dropdownOpen && (
          <div className='sign-out-button rounded absolute right-0 w-full text-right'>
            <SignOutButton />
          </div>
        )}
      </div>
  )
}

export default UserProfile