// react
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/features/auth/authSlice"
// others
import "../../Styles/Navbar.scss"
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const cookieAuth = Cookies.get('isAuth')

  const makeLoggout = () => {
    console.log(cookieAuth)
    dispatch(logout())
    //navigate('/')
  }



  return (
    <div className="navbar">
      <h2>Facebook</h2>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
      <button type="button" onClick={makeLoggout} >logout</button>
    </div>
  )
}

export default Navbar