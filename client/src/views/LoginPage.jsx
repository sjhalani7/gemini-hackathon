import React from 'react';
import '../styles/LoginPage.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/gemini-selection");
  }

  return (
    <div className='flex flex-row w-full h-full overflow-hidden relative'>
      <div className='flex flex-col justify-center container'>
        <div className="home-container m-40">
          <h1>Gem.edu</h1>
          <p>Your personal teacher and advisor outside of the classroom.</p>
          {user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
      <img className="logo absolute" src={logo} alt="Logo" />
    </div>
  );
};

export default LoginPage;
