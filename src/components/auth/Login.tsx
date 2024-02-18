import React from 'react'
import Input from './Input'
import { SignIn } from '../../api/Auth'

const Login = ({ toggleLogin }) => {

  const [isValid, setValid] = React.useState(false)
  const [feedback, setFeedback] = React.useState("")
  const [credentials, setCredentials] = React.useState({ email: "", psw: "" })

  const submit = () => {
    SignIn(credentials)
    .then(() => window.location.reload())
    .catch(error => setFeedback(error.massage))
  }

  React.useEffect(() => {
    setValid(credentials.email.length > 0 && credentials.psw.length > 0)
  }, [credentials])

  return (
    <>
      <div className="form-box login">
        <h2>Login</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            submit()
          }}
        >
          <hr />
          <small>{feedback}</small>
          <Input
            classNames="input email"
            value="email"
            name="email"
            action={e => {
              setCredentials({ ...credentials, email: e.target.value })
            }}
          />
          <Input
            classNames="input psw"
            value="password"
            name="password"
            action={e => {
              setCredentials({ ...credentials, psw: e.target.value })
            }}
          />

          <button
            type="submit"
            className={isValid ? "btn" : "no-btn"}
            disabled={!isValid}
          >
            Login
          </button>

          <div className="login-register">
            <p>Don't have an account? <a href="#" className="register-link" onClick={() => toggleLogin()}>Create An Account</a></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login