import Footer from "../components/auth/Footer"
import ContentFailed from "../components/failed-to-login/ContentFailed"
import "../Styles/failed-to-login/index.scss"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { getUserErrorStatus, getAuthNextAction, getUserStatus } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const FailedToLogin = () => {
  const cookieAuth = Cookies.get('isAuth')
  const navigate = useNavigate();
  const usersStatus = useSelector(getUserStatus)
  useEffect(() => {
    if (cookieAuth === true) {
      navigate('/')
    }
  },[usersStatus])

 
  return (
    <div className="authentication-container">
        
          <ContentFailed />
    
     
        
        <Footer/>
    </div>
  )
}


export default FailedToLogin