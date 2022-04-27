import React, {useEffect, useState} from 'react';
import { login } from "../../redux/features/auth/authSlice"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import Register from "../../components/auth/Register"
import "../../Styles/Authentication/Login.scss"
const Login = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = [name, password].every(Boolean) && addRequestStatus === 'idle';

  const onSaveTodoClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(login({ name, password })).unwrap()
        setName('')
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
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
      </div>

      <div className="input-entry">
        <label>password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </div>

      <button type="button" onClick={onSaveTodoClicked} >send</button>
      </form>
      <button onClick={() => props.setIsRegistering(true)}>creer un compte</button>
    </div>
  )
}

export default Login