import React from 'react'
import SignOutButton from './SignOutButton'
import BackButton from './BackButton'

const Navbar = ( { backLink }) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <BackButton link={backLink}/>
      <SignOutButton />
    </div>
  )
}

export default Navbar