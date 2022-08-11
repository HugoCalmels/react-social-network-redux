// react
import { useState, useEffect } from "react";
// components
import Login from "./Login";
import Register from "./Register";
// others
import '../../Styles/Authentication/Index.scss';
import Content from "./Content"
import Footer from "./Footer"
import Failed from "./Failed"
import { useDispatch, useSelector } from "react-redux";
import { getUserErrorStatus, getAuthNextAction, getUserStatus } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Authentication = (props) => {
  const navigate = useNavigate();
  let { url } = useParams();
  const cookieAuth = Cookies.get('isAuth')
  const [isRegistering, setIsRegistering] = useState(false)

  const [failedToAuth, setFailedToAuth] = useState(false)

  const [currentComponent, setCurrentComponent] = useState('')

  const error = useSelector(getUserErrorStatus)

  const nextAction = useSelector(getAuthNextAction)

  const usersStatus = useSelector(getUserStatus)

  const [test, setTest] = useState(0)

  const [falseLogin, setFalseLogin] = useState(false)

  let currentPage = null || error
 

  useEffect(() => {
  
    if (currentPage !== null ) {
      navigate('/failed-to-login')
    
      currentPage = null
    } else {
      navigate('/')
      currentPage = null
    }
 
  }, [usersStatus])










  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log(currentPage )
  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')

  console.log('@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@')

  




 
  

  return (
    <>
      <div className="authentication-container">
        
        <Content setCurrentPage={props.setCurrentPage } currentPage={props.currentPage}/>
    
     
        
        <Footer/>
      </div>
    </>
  )
}


export default Authentication