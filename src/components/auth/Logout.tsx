import { SignOut } from "../../api/auth"

const Logout = () => {
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