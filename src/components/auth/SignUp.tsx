import React from 'react'
import Input from './Input'
import { signUp, SendEmailVerification, authentificateUser } from '../../api/Auth'

const SignUp = ({ toggleLogin, handleModal, currentUser }) => {

    const [isValid, setValid] = React.useState(false)
    const [credentials, setCredentials] = React.useState({ email: "", psw: "" })
    const [feedback, setFeedback] = React.useState("")

    React.useEffect(() => {
        setValid(credentials.email.length > 0 && credentials.psw.length > 0)
    }, [credentials])

    React.useEffect(() => {
        if (feedback != "Account successfully created") {
            return
        }
        const timer = setTimeout(() => {
            handleModal()
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [feedback])

    return (
        <>
            <div className="form-box register">
                <h2>Sign Up</h2>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        signUp(credentials).then(success => {
                            if (success) {
                                setFeedback("Account successfully created")
                                SendEmailVerification()
                                authentificateUser()
                                console.log(currentUser)
                                window.location.reload()
                            }                    
                        })
                            .catch(error => {
                                console.log(error)
                                if (error = "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
                                    setFeedback("Email already in use.")
                                } else if (error = "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).") {
                                    setFeedback("Password should be at least 6 characters.")
                                } else if (error = "FirebaseError: Firebase: Error (auth/invalid-email).") {
                                    setFeedback("Invalid-email.")
                                } else if (error = "Account successfully created") {
                                    setFeedback("Account successfully created")
                                }
                            })
                    }}>
                    <hr />
                    <small className={feedback != "Account successfully created" ? "red" : "green"}>{feedback}</small>
                    <Input
                        classNames="input email"
                        value="email"
                        name="email"
                        placeholder="Ex: example@yahoo.com"
                        action={e => {
                            setCredentials({ ...credentials, email: e.target.value })
                        }}
                    />
                    <Input
                        classNames="input psw"
                        value="password"
                        name="password"
                        placeholder="******"
                        action={e => {
                            setCredentials({ ...credentials, psw: e.target.value })
                        }}
                    />

                    <button
                        type="submit"
                        className={isValid ? "btn" : "no-btn"}
                        disabled={!isValid}
                    >
                        Submit
                    </button>

                    <div className="login-register">
                        <p>Already have an account ? <a href="#" className="login-link" onClick={() => toggleLogin()}>Login here</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp