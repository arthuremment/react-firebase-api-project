import React from 'react'
import Login from "./Login"
import SignUp from './SignUp'
import Logout from './Logout'

const Forms = ({ handleModal, modal, currentUser }) => {

  const [log, setLog] = React.useState(true)
  const toggleLogin = () => {
    setLog(prev => !prev)
  }

  return (
    <>
      {currentUser ?
        <div className='logout-container'>
          <Logout />
        </div>
        :
        <div className='forms'>
          {log ?
            <Login toggleLogin={toggleLogin} />
            :
            <SignUp toggleLogin={toggleLogin} handleModal={handleModal} currentUser={currentUser} />}
        </div>}
    </>
  )
}

export default Forms