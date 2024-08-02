import React from 'react';
import '../styles/LoginPage.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';

const LoginPage = () => {
  const [user] = useAuthState(auth); 
  
  return (
    <div className='flex flex-col justify-center container'>
      <div className="m-20">
        <h1>Gem.edu</h1>
        <p>Your personal teacher and advisor outside of the classroom.</p>
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  );
};

export default LoginPage;