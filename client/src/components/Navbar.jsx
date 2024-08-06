import React from 'react'
import SignOutButton from './SignOutButton'
import BackButton from './BackButton'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center'>
      <BackButton />
      <SignOutButton />
    </div>
  )
}

export default Navbar