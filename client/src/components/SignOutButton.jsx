import React from 'react';
import { auth } from '../auth/firebaseConfig';
import { signOut } from '../auth/googleAuth';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleClick = async() => {
    signOut();
    navigate("/");
  }

  return auth.currentUser && (
    <button className="flex items-center justify-end w-full text-right p-2" onClick={handleClick}>
      <p>Sign Out</p>
      <span class="material-symbols-outlined ml-2">
        logout
      </span>
    </button>
  );
};

export default SignOutButton;
