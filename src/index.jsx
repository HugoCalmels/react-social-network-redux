// related to react
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Link, Route, Routes, Switch } from "react-router-dom";
// related to redux
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { checkingUserAuthentication } from './redux/features/auth/authSlice'
import { testRandomNumber } from './redux/features/auth/authSlice'
import { userAuthenticated } from './redux/features/auth/authSlice'
import { getUserStatus } from './redux/features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux';
// components
import ProtectedRoutes from './ProtectedRoutes';
import Navbar from './components/navbar/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Confirmation from './components/auth/Confirmation'
import Home from './pages/Home'
// others
import Cookies from 'js-cookie';
import './Styles/Main.scss'

const App = () => {

  const cookieAuth = Cookies.get('isAuth') 

  const userStatus = useSelector(getUserStatus)
  const isAuth = useSelector(checkingUserAuthentication)

  const dispatch = useDispatch()
  const userAuth = useSelector(userAuthenticated)

  useEffect(() => {
   
    //dispatch(checkingUserAuthentication())
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
    console.log(userAuth)
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
  }, [userStatus, dispatch])

  // test avec redux, mais faudrait mettre un pansement sur les refresh de page




  // uses redux to refresh after auth is successed


  useEffect(() => {

  }, [cookieAuth])



  return (
    <>
      <Router>

      {/* Navbar will show ONLY IF user is auth */}
      {userAuth  ? 
          <>
            <Navbar />
          </>
        :<></> }

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} exact/>
          <Route path='/about' element={<About />} />
          <Route path='/users/confirmation' element={<Confirmation />} />
          {/* PRIVATE ROUTES */}
          <Route element ={<ProtectedRoutes/>} >
            <Route path='/Users' element={<Users />} />
          </Route>
        </Routes>
        
      </Router>
    </>
  )
}


// Test public route
function About() {
  return <h2>About</h2>;
}

// Test private route
function Users() {
  return <h2>THIS ROUTE IS PROTECTED</h2>;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
