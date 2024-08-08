import React, { useState } from 'react';
import BackButton from './BackButton';
import UserProfile from './UserProfile';
import '../styles/Navbar.css';

const Navbar = ({ backLink }) => {
  return (
    <div className='navbar flex justify-between items-center relative'>
      <BackButton link={backLink} />
      <UserProfile />
    </div>
  );
};

export default Navbar;
