import React, { useState } from 'react';
import BackButton from './BackButton';
import UserProfile from './UserProfile';

const Navbar = ({ backLink }) => {
  return (
    <div className='flex justify-between items-center relative'>
      <BackButton link={backLink} />
      <UserProfile />
    </div>
  );
};

export default Navbar;
