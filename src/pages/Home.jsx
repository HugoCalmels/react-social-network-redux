import {useState} from 'react'
// components
import PostsList from "../components/posts/PostsList"
import Authentication from '../components/auth/Authentication';
import { checkingUserAuthentication } from '../redux/features/auth/authSlice'
//redux
import { useSelector, useDispatch } from 'react-redux';
// others
import Cookies from 'js-cookie';
import AddNewPost from '../components/posts/AddNewPost';

const Home = () => {

  const cookieAuth = Cookies.get('isAuth')




  return (
    <>
       {cookieAuth ? 
        <>
          
          <div className="posts-container">
        <div className="left-side-bar">
         
              
            </div>
     
            
            <div className="postlist-center-container">
            <AddNewPost />
              <PostsList />
            </div>
            
            <div className="right-side-bar">
  
              
            </div>
          </div>
        </>
        
        : <Authentication />}
    </>
  );
}

export default Home