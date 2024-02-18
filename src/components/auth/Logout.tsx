import React from 'react'
import { SignOut } from "../../api/auth"

const Logout = ({ currentUser }) => {
  return (
    <button 
      className='logout' 
      onClick={() => {
        SignOut(); 
        window.location.reload()
      }}
    >
      Logout
    </button>
  )
}

export default Logout