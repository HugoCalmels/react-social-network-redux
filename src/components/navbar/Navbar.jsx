// react
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/features/auth/authSlice"
import { getUserPostImages } from "../../redux/features/images/imagesSlice"
// others
import "../../Styles/Navbar.scss"
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const cookieAuth = Cookies.get('isAuth')

 

  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 

  const makeLoggout = () => {
    console.log(cookieAuth)
    dispatch(logout())
    navigate('/')
  }

  const redirectToProfile = () => {
    loadUserPostImages()
    navigate(`/${cookieUserInfos.name}`)
  }

  const loadUserPostImages = () => {
    try {
      dispatch(getUserPostImages(cookieUserInfos.id)).unwrap()
    } catch (e) {
      console.log(e)
    } finally {

    }
  }





  return (
    <div className="navbar">
      <h2>Facebook</h2>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
      <button type="button" onClick={makeLoggout} >logout</button>
      <button type="button"
        onClick={redirectToProfile
}
      >
        my profile</button>
    </div>
  )
}

export default Navbar