import React, {useEffect, useState} from 'react';
import "../../Styles/Navbar.scss"
import { useSelector, useDispatch } from 'react-redux';
import { register, logout } from "../../redux/features/auth/authSlice"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
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

  const makeLoggout = () => {
    console.log('hi')
    dispatch(logout())
    navigate('/')
  }


  return (
    <div className="navbar not-logged-in">
      <h2>Facebook</h2>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
      <button type="button" onClick={makeLoggout} >logout</button>
    </div>
  )
}

export default Navbar