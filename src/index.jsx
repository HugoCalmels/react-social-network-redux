// related to react
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Link, Route, Routes, Switch } from "react-router-dom";
// related to redux
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { checkingUserAuthentication } from './redux/features/auth/authSlice'
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


  const isAuth = useSelector(checkingUserAuthentication)

  console.log('?????????????????????????????????????????????????')
  console.log(isAuth)
  console.log('?????????????????????????????????????????????????')


  // uses redux to refresh after auth is successed


  useEffect(() => {
    console.log('test info')
  }, [cookieAuth])



  return (
    <>
      <Router>

      {/* Navbar will show ONLY IF user is auth */}
      {cookieAuth  ? 
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
