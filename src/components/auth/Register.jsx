import React, {useEffect, useState} from 'react';
import { register } from "../../redux/features/auth/authSlice"
import { useSelector, useDispatch } from 'react-redux';
import "../../Styles/Authentication/Register.scss"
const Register = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = [name, password].every(Boolean) && addRequestStatus === 'idle';

  const onSaveTodoClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(register({ name, password })).unwrap()
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
    <div className="auth-register-container">
      <h2>REGISTER</h2>
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
      <button onClick={() => props.setIsRegistering(false)}>login</button>
    </div>
  )
}

export default Register