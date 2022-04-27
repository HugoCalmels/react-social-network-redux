import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Link, Route, Routes, Switch } from "react-router-dom";
// related to redux
import { store } from './redux/store';
import { Provider } from 'react-redux'
// components
import Navbar from './components/navbar/Navbar'
import ProtectedRoute from './ProtectedRoute';
import Profile from "./pages/Profile"
import Register from './components/auth/Register'
// others
import { checkingUserAuthentication } from './redux/features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// import About from './components/about'
import ProtectedRoutes from './ProtectedRoutes';
import Login from './components/auth/Login'
import Authentication from './components/auth/Authentication';
import './Styles/Main.scss'
import Confirmation from './components/auth/Confirmation'
import { AuthContext} from './helpers/authContext'

const App = () => {

  const cookieAuth = Cookies.get('isAuth')

  let res = useSelector(checkingUserAuthentication)
  console.log(res)
  useEffect(() => {
    console.log(res)
  }, [res])
  


  return (
    <>
      <Router>
      {cookieAuth ? 
          <>
            <Navbar />
            
          </>
        :<></> }

 


      <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} exact/>
          <Route path='/about' element={<About />} />
          <Route path='/users/confirmation' element={<Confirmation />} />
          <Route element ={<ProtectedRoutes/>} >
            <Route path='/Users' element={<Users />} />
          </Route>
        </Routes>
        
   
      </Router>
    </>
  )
}

function Home() {
  const cookieAuth = Cookies.get('isAuth')
  return (
    <>
       {cookieAuth ? 
          <>
       
            
          </>
        : <Authentication />}
    </>
  );
}


function About() {
  return <h2>About</h2>;
}

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

/*

        <Switch>
        <Route path="/register" exact >
        <h1>REGISTER</h1>
          </Route>
          <Route path="/about" exact component={<About/>} />

          <Route path="/" exact>
            <h1>HOME</h1>
          </Route>
          </Switch>
  <ProtectedRoute path="/profile" component={Profile} isAuth={cookieAuth} exact />
          */