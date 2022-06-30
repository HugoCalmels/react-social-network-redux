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
import { getSelectedUserFriendList,getUsersStatus, selectAllUsers, getAllUsers, getCurrentStatus,getFriendListStatus, getCurrentUser, selectCurrentUser, getCurrentInvitation } from './redux/features/users/usersSlice'
// components
import { getImagesStatus, getUserPostImages, selectAllImages } from "./redux/features/images/imagesSlice"
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
import { getAllPosts, getPostsStatus, selectAllPosts, getAllImagesPostsFromUser } from './redux/features/posts/postsSlice'
import { getCurrentUserFriendlist, selectFriendList } from './redux/features/users/usersSlice'

const App = () => {

  const dispatch = useDispatch()
  const usersStatus = useSelector(getUsersStatus)
  const users = useSelector(selectAllUsers)
  const currentStatus = useSelector(getCurrentStatus)
  const user = useSelector(selectCurrentUser)
  const postsStatus = useSelector(getPostsStatus)
  const imagesStatus = useSelector(getImagesStatus)
  const friendlist = useSelector(selectFriendList)
  const friendlistStatus = useSelector(getFriendListStatus)

  let author
  if (Cookies.get('user')) {
    author = JSON.parse(Cookies.get('user'))
  }



  useEffect(() => {
    if (usersStatus === "idle") {
  
      if (Cookies.get('user')) {
       // dispatch(getCurrentUserFriendlist(author.id)).unwrap()
      }
    }
  }, [postsStatus, usersStatus, currentStatus, dispatch])

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllUsers())
    console.log('USE EFFECT INDEX THAT SHOULD TRIGGER ONLY ONCE')
    console.log('USE EFFECT INDEX THAT SHOULD TRIGGER ONLY ONCE')
    console.log('USE EFFECT INDEX THAT SHOULD TRIGGER ONLY ONCE')
    console.log('USE EFFECT INDEX THAT SHOULD TRIGGER ONLY ONCE')
    console.log('USE EFFECT INDEX THAT SHOULD TRIGGER ONLY ONCE')
    console.log('USE EFFECT INDEX THAT SHOULD TRIGGER ONLY ONCE')
  },[])

  

  let userList = []
  if (usersStatus === 'loading') {
    userList = <p>" Loading ... "</p>;
  } else if (usersStatus === 'succeeded') {

    userList = users
  } else if (usersStatus === 'error') {
    userList = <p>Error</p>
  }

  let currentUser = ''
  if (currentStatus === 'loading') {
    currentUser= <p>" Loading ... "</p>;
  } else if (currentStatus === 'succeeded') {

    currentUser= user
  } else if (currentStatus === 'error') {
    currentUser= <p>Error</p>
  }

  const cookieAuth = Cookies.get('isAuth') 
  const userAuth = useSelector(userAuthenticated)

  useEffect(() => {
    console.log("INDEX : USERLIST CHANGED")
    console.log(userList)
    console.log(currentUser)
    console.log(friendlist)
    console.log("INDEX : USERLIST CHANGED")
  }, [userList, currentUser])

  useEffect(() => {
  }, [cookieAuth])


  // PROBLEME IL TROUVE LA LISTE DES USERS BIEN UPDATED COMME I LFAUT AVEC LE AVATAR LINK
  // MAIS LE CURRENT USER EST PAS UPDATED CORRECTEMENT

  return (
    <>
      <Router>

      {/* Navbar will show ONLY IF user is auth */}
      {userAuth  ? 
          <>
            <Navbar userList={ userList} friendlist={friendlist} />
          </>
        :<></> }

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home currentUser={currentUser}/>} exact/>
          <Route path='/about' element={<About />} />
          <Route path='/users/confirmation' element={<Confirmation />} />
          {/* DYNAMIC ROUTES */}
          {userList && userList.length > 0 ?
            <>
               {userList.map((user) => (
                 <Route path={`/${user.username}`} element={<Profile user={user} currentUser={currentUser} friendlist={friendlist} exact/>} ></Route>
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
