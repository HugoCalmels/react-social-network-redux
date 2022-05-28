import {useState} from 'react'
// components
import PostsList from "../components/posts/PostsList"
import Authentication from '../components/auth/Authentication';
import { checkingUserAuthentication } from '../redux/features/auth/authSlice'
//redux
import { useSelector, useDispatch } from 'react-redux';
// others
import Cookies from 'js-cookie';

const Home = () => {

  const cookieAuth = Cookies.get('isAuth')




  return (
    <>
       {cookieAuth ? 
        <>
          <PostsList />
        </>
        
        : <Authentication />}
    </>
  );
}

export default Home