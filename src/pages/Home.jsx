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

const Home = (props) => {

  const cookieAuth = Cookies.get('isAuth')




  return (
    <>
       {cookieAuth ? 
        <>
          <main>
          <div className="posts-container">
        <div className="left-side-bar">
         
              
            </div>
     
            
            <div className="postlist-center-container">
            <AddNewPost />
                <PostsList currentUser={props.currentUser} />
            </div>
            
            <div className="right-side-bar">
  
              
            </div>
            </div>
            </main>
        </>
        
        : <Authentication />}
    </>
  );
}

export default Home