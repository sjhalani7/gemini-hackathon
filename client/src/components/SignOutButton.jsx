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
    <button onClick={handleClick}>Sign Out</button>
  );
};

export default SignOutButton;
