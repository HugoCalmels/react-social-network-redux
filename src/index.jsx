
// related to react
import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,

  Route,
  Routes,

} from "react-router-dom";
// related to redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { userAuthenticated, selectAuthLoader } from "./redux/features/auth/authSlice";
import {  } from "./redux/features/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Confirmation from "./components/auth/Confirmation";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Error from "./pages/Error";
// others
import Cookies from "js-cookie";
import "./Styles/Main.scss";
import Friends from "./pages/Friends";
import FailedToLogin from "./pages/FailedToLogin";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NewPassword from "./components/auth/NewPassword";
import {selectredirectToErrorPage} from "./redux/features/profile/profileSlice"
import {

  getCurrentUserSuggestions,

} from "./redux/features/users/usersSlice";
import LoaderConnexion from "./components/LoaderConnexion"


const App = () => {
  const dispatch = useDispatch();

  const redirectionToErrorPage = useSelector(selectredirectToErrorPage)

  let author;
  if (Cookies.get("user")) {
    author = JSON.parse(Cookies.get("user"));
  }


  const cookieAuth = Cookies.get("isAuth");
  const userAuth = useSelector(userAuthenticated);


  useEffect(() => { 
    
  }, [cookieAuth]);





  // PROBLEME IL TROUVE LA LISTE DES USERS BIEN UPDATED COMME I LFAUT AVEC LE AVATAR LINK
  // MAIS LE CURRENT USER EST PAS UPDATED CORRECTEMENT

  return (
    <>
    
      <Router>
        {/* Navbar will show ONLY IF user is auth */}
        {userAuth ? (
          <>

              <Navbar />
          
          </>
        ) : (
          <></>
        )}
     
        
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/register" element={<Register />} exact/>
          <Route path="/login" element={<Login />}exact />
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} exact/>
          <Route path="/failed-to-login" element={<FailedToLogin />}exact />
          <Route path="/users/confirmation" element={<Confirmation />}exact />
          <Route path="/forgotten-password" element={<ForgottenPassword/>} exact/>
          <Route path="/reset-password" element={<ResetPassword />} exact/>
          <Route path="/users/password/:edit" element={<NewPassword />} exact/>

          {/* DYNAMIC ROUTES */}

          <Route
            path={`/:userName`}
            element={<Profile />}
          ></Route>
          <Route
            path={`/:userName/friends`}
            element={<Friends />}
            exact
          ></Route>
              <Route
            path={`/:userName/:anything`}
            element={<Error />}
          ></Route>
      

          {/* ERROR ROUTES */}
          <Route path="/error" element={<Error />} />
          {/* PRIVATE ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/users" element={<Users />}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

// Test public route
function About() {
  return <h2>About</h2>;
}

// Test private route
function Users() {
  return <h2>THIS ROUTE IS PROTECTED</h2>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
