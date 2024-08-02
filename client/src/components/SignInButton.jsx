import React from 'react';
import { signInWithGoogle } from '../auth/googleAuth';
import '../styles/SignInButton.css';

const SignInButton = () => {
  return (
    <button className='my-4 p-4 rounded-full' onClick={signInWithGoogle}>Get Started with Google Sign-In</button>
  );
};

export default SignInButton;
