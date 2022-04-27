import { Outlet } from "react-router";
import Login from "./components/auth/Login";
import Cookies from 'js-cookie';


const ProtectedRoutes = () => {

  const cookieAuth = Cookies.get('isAuth')
  console.log(cookieAuth)

  return cookieAuth ? <Outlet /> : <Login/> ;
}

export default ProtectedRoutes