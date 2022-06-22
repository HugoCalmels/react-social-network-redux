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
import { getUsersStatus, selectAllUsers, getAllUsers } from './redux/features/users/usersSlice'
// components
import ProtectedRoutes from './ProtectedRoutes';
import Navbar from './components/navbar/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Confirmation from './components/auth/Confirmation'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Error from './pages/Error'
// others
import Cookies from 'js-cookie';
import './Styles/Main.scss'

const App = () => {

  const dispatch = useDispatch()

  const usersStatus = useSelector(getUsersStatus)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    if (usersStatus === "idle") {
      console.log('FIRED')
      dispatch(getAllUsers())
    }


  }, [usersStatus, dispatch])

  let userList = []
  if (usersStatus === 'loading') {
    userList = <p>" Loading ... "</p>;
  } else if (usersStatus === 'succeeded') {

    userList = users
  } else if (usersStatus === 'error') {
    userList = <p>Error</p>
  }
  
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(userList)
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')


  const cookieAuth = Cookies.get('isAuth') 

  const userStatus = useSelector(getUserStatus)
  const isAuth = useSelector(checkingUserAuthentication)


  const userAuth = useSelector(userAuthenticated)

  useEffect(() => {
   
    console.log("INDEX : USERLIST CHANGED")
    console.log(userList)
    console.log("INDEX : USERLIST CHANGED")
  }, [userList])

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
          {/* DYNAMIC ROUTES */}
          {userList && userList.length > 0 ?
            <>
               {userList.map((user) => (
                 <Route path={`/${user.username}`} element={<Profile user={user} exact/>}></Route>
          )
          )}
            </>
            : ''}
         
          {/* ERROR ROUTES */}
          <Route path='/:anything' element={<Error />} />
          {/* PRIVATE ROUTES */}
          <Route element ={<ProtectedRoutes/>} >
            <Route path='/users' element={<Users />} />
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
