import React, { Suspense, lazy, useEffect, useState } from "react";
// components

import Authentication from "../../components/auth/Authentication";
import { checkingUserAuthentication } from "../../redux/features/auth/authSlice";
import { selectCurrentUser } from "../../redux/features/users/usersSlice";
//redux
import { useSelector, useDispatch } from "react-redux";
// others
import Cookies from "js-cookie";

import Friendlist from "../../components/home/Friendlist";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import blueUsersIcon from "../../assets/icons/blueUsersIcon.png";
import { useNavigate } from "react-router-dom";
import AddNewPost from "./components/AddNewPost"
import PostsList from "./components/PostsList"



const Home = (props) => {
  const navigate = useNavigate();
  const cookieAuth = Cookies.get("isAuth");

  const currentUser = useSelector(selectCurrentUser);

  const navigateToCurrentUserProfile = () => {
    let cookieUser = Cookies.get("user");

    let cookieUserInfos = JSON.parse(cookieUser);

    navigate(`/${cookieUserInfos.name}`);
  };

  const navigateToUserFriendlist = () => {
    let cookieUser = Cookies.get("user");

    let cookieUserInfos = JSON.parse(cookieUser);

    navigate(`/${cookieUserInfos.name}/friends`);
  };

  return (
    <>
  
      {cookieAuth ? (
        <>
          <main>
            <div className="posts-container">
              <div className="left-side-bar">
           
                <div className="left-side-bar-menu">
                  <div
                    className="left-side-bar-user-profile "
                    onClick={navigateToCurrentUserProfile}
                  >
                    <div className="left-side-bar-profile-avatar">
                      {currentUser.avatar_link !== null ? (
                        <>
                          <img
                            src={currentUser.avatar_link}
                            alt="avatarImage"
                          ></img>
                        </>
                      ) : (
                        <>
                          <img src={defaultProfile} alt="avatarImage"></img>
                        </>
                      )}
                    </div>
                    <div className="left-side-bar-profile-username">
                      {currentUser.username}
                    </div>
                  </div>
                  <div
                    className="left-side-bar-user-friendlist"
                    onClick={navigateToUserFriendlist}
                  >
                    <div className="left-side-bar-user-friendlist-icon">
                      <img src={blueUsersIcon} alt="friends" />
                    </div>
                    <div className="left-side-bar-user-friendlist-tag">
                      Amis
                    </div>
                  </div>
                  </div>
        
              </div>

              <div className="postlist-center-container">
           
                  <AddNewPost />
          
              
                  <PostsList currentUser={currentUser} />
              
              </div>

              <div className="right-side-bar">
          
                  <Friendlist />
          
              </div>
            </div>
          </main>
        </>
      ) : (
        <Authentication />
        )}

    </>
  );
};

export default Home;
