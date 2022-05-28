import React, {useState} from 'react';
import { login } from "../../redux/features/auth/authSlice"
import { useDispatch } from 'react-redux';
import "../../Styles/Authentication/Login.scss"

const Login = (props) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = [email, password].every(Boolean) && addRequestStatus === 'idle';

  const tryToLogin = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(login({ email, password })).unwrap()
        setEmail('')
        setPassword('')
      } catch (err) {
        console.error('Failed to save the person', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }



  return (
    <div className="auth-login-container">
      <h2>LOGIN</h2>
      <form>

      <div className="input-entry">
        <label>email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
      </div>

      <div className="input-entry">
        <label>password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </div>

      <button type="button" onClick={tryToLogin} >send</button>
      </form>
      <button onClick={() => props.setIsRegistering(true)}>creer un compte</button>
    </div>
  )
}

export default Login