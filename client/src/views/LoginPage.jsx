import React from 'react';
import '../styles/LoginPage.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const LoginPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/gemini-selection");
  }

  return (
    <div className='flex flex-row w-full h-full'>
      <div className='flex flex-col justify-center container'>
        <div className="home-container m-40">
          <h1>Gem.edu</h1>
          <p>Your personal teacher and advisor outside of the classroom.</p>
          {user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
      <div className='flex justify-center items-center w-full'>
        <img className="logo" src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default LoginPage;
