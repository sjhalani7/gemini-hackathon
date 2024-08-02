import React from 'react';
import { auth } from '../auth/firebaseConfig';
import { signOut } from '../auth/googleAuth';

const SignOutButton = () => {
  return auth.currentUser && (
    <button onClick={signOut}>Sign Out</button>
  );
};

export default SignOutButton;
