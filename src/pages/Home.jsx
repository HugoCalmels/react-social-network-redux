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
import Friendlist from "../components/home/Friendlist"
import defaultProfile from "../assets/images/defaultProfile.jpg";
import blueUsersIcon from "../assets/icons/blueUsersIcon.png";

const Home = (props) => {

  const cookieAuth = Cookies.get('isAuth')




  return (
    <>
       {cookieAuth ? 
        <>
          <main>
          <div className="posts-container">
        <div className="left-side-bar">
          <div className="left-side-bar-menu">
                  <div className="left-side-bar-user-profile">
                    <div className="left-side-bar-profile-avatar">
                    {props.currentUser.avatar_link !== null ? (
                  <>
                    <img src={props.currentUser.avatar_link} alt="avatarImage"></img>
                  </>
                ) : (
                  <>
                    <img src={defaultProfile} alt="avatarImage"></img>
                  </>
                )}
                    </div>
                    <div className="left-side-bar-profile-username">{props.currentUser.username}</div>
                  </div>   
                  <div className="left-side-bar-user-friendlist">
                    <div className="left-side-bar-user-friendlist-icon"><img src={blueUsersIcon} alt="friends"/></div>
                    <div className="left-side-bar-user-friendlist-tag">Amis</div>
            </div>
          </div>
              
        </div>
     
            
            <div className="postlist-center-container">
            <AddNewPost />
                <PostsList currentUser={props.currentUser} />
            </div>
            
            <div className="right-side-bar">
            <Friendlist />
              
            </div>
            </div>
            </main>
        </>
        
        : <Authentication />}
    </>
  );
}

export default Home