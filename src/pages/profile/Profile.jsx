import React, { Suspense, lazy, useEffect, useState } from "react";

import "../../Styles/profile/Index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelFriendRequest,
  getCurrentInvitation,
} from "../../redux/features/users/usersSlice";
import { getAllPostsFromSelectUser } from "../../redux/features/posts/postsSlice";
import {
  getUserImageUploadStatus,
  getCurrentUserFriendlist,
  getinvitationsStatus,
  getFriendListStatus,
  getCurrentUser,
  selectCurrentUser,
  getSelectedUserCommonFriends,
  selectSelectedUserCommonFriends,
  selectAllUsernamesList
} from "../../redux/features/users/usersSlice";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import {
  getUserByUsername,
  selectProfileUser,
  selectredirectToErrorPage,
  resetPageErrorRedirection,
  selectnavigationErrorsStatus,
  getProfileStatus
} from "../../redux/features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

import TopProfile from "./topProfile/TopProfile";
import BottomProfile from "./bottomProfile/BottomProfile";
const Profile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // déclaration des variables
  let { userName } = useParams();
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);
  // déclartion des états
  const [profileBtn, setProfileBtn] = useState("SENDABLE");
  // déclarations de redux
  const foundUser = useSelector(selectProfileUser);
  const currentUser = useSelector(selectCurrentUser);
  const currentInvit = useSelector(getCurrentInvitation);
  const imageUploadStatus = useSelector(getUserImageUploadStatus);
  const friendlistStatus = useSelector(getFriendListStatus);
  const invitationStatus = useSelector(getinvitationsStatus);
  const [bottomContent, setBottomContent] = useState("publications");
  const selectedUserWithCM = useSelector(selectSelectedUserCommonFriends);
  const profileStatus = useSelector(getProfileStatus)
  const usernamesList = useSelector(selectAllUsernamesList)
  const redirectToErrorPages = useSelector(selectredirectToErrorPage)

  const navigationErrors = useSelector(selectnavigationErrorsStatus)

  useEffect(() => {
    // TRIGGERS WHEN NAVIGATES TO
    if (usernamesList.includes(userName)) {
      
      dispatch(getUserByUsername(userName)).unwrap();
        dispatch(getSelectedUserCommonFriends(userName)).unwrap();
        dispatch(getAllPostsFromSelectUser({ page: 1, username: userName }));
    } else {
      navigate('/error')
    }


  }, [userName]);

 

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log(foundUser)
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')



  useEffect(() => {
    // REFRESH COMPONENT WHENEVER IMAGE IS UPLOADED
    //dispatch(getUserPostImages(foundUser.id))
    if (imageUploadStatus === "succeeded") {
      dispatch(getUserByUsername(userName)).unwrap();
      dispatch(getAllPostsFromSelectUser({ page: 1, username: userName }));
    }
  }, [imageUploadStatus]);

  useEffect(() => {
    if (invitationStatus === "succeeded") {
      // REFRESH WHENEVER INVITATION IS SENT
      dispatch(getCurrentUser());
      dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    }
 
  }, [invitationStatus]);


  useEffect(() => {
    if (foundUser && foundUser.username) {
      let foundInvitation = foundUser.received_invitations.filter(
        (invit) => invit.sender_id === cookieUserInfos.id
      );
      if (currentInvit && currentInvit.receiver_id === foundUser.id) {
        setProfileBtn("CANCELABLE");
      } else if (
        foundInvitation[0] &&
        foundInvitation[0].receiver_id === foundUser.id &&
        currentInvit !== ""
      ) {
        setProfileBtn("CANCELABLE");
      }
    }
  }, [currentInvit]);

  useEffect(() => {
    if (friendlistStatus === "succeeded") {
      dispatch(getCurrentUser());
      dispatch(getUserByUsername(userName)).unwrap();
      dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    }dispatch(getSelectedUserCommonFriends(userName)).unwrap();
  }, [friendlistStatus]);

  // ***************** FONCTIONS ************************

  const handleCancelFriendRequest = (e) => {
    let foundInvitation = foundUser.received_invitations.filter(
      (invit) => invit.sender_id === cookieUserInfos.id
    );
    e.preventDefault();
    let res;
    if (currentInvit && currentInvit.id > 0) {
      res = currentInvit.id;
    } else if (foundInvitation[0] && foundInvitation[0].id > 0) {
      res = foundInvitation[0].id;
    }
    try {
      dispatch(cancelFriendRequest(res)).unwrap();
    } catch (e) {
      console.log(e);
    }
  };


  let hoveredBottomContentMenuSelectionnedElemList = document.querySelectorAll(
    ".profile-navbar-option"
  );
  if (hoveredBottomContentMenuSelectionnedElemList !== null) {
    hoveredBottomContentMenuSelectionnedElemList.forEach((el) => {
      let res = el.querySelector(".profile-blue-line-container");
      el.style.color = "#65676B";
      res.style.display = "none";
    });
  }

  let hoveredBottomContentMenuSelectionnedElem = document.querySelector(
    `.profile-navbar-option.${bottomContent}`
  );


  if (hoveredBottomContentMenuSelectionnedElem !== null) {
    hoveredBottomContentMenuSelectionnedElem.style.color = "hsl(214, 89%, 52%)";
    let blueLine = hoveredBottomContentMenuSelectionnedElem.querySelector(
      ".profile-blue-line-container"
    );
    blueLine.style.display = "flex";
  }


  let selectedFilteredFriendlist = [];

  if (selectedUserWithCM.length > 0) {
    selectedFilteredFriendlist = selectedUserWithCM.slice(0, 9);
  }

  const openMessenger = () => {
    alert("Fonctionnalité en développement");
  };

  const navigateToUsernamesProfile = (username) => {
    window.scrollTo({ top: 0, left: 0 })
    navigate(`/${username}`);
    setBottomContent("publications");
  };




  return (
    <>
      {usernamesList.includes(foundUser.username) ?
        <>
          <div className="profile-container">
  

  <TopProfile
    foundUser={foundUser}
    selectedFilteredFriendlist={selectedFilteredFriendlist}
    openMessenger={openMessenger}
    currentUser={currentUser}
    handleCancelFriendRequest={handleCancelFriendRequest}
    setBottomContent={setBottomContent}
    bottomContent={bottomContent}
  />



  <BottomProfile
    bottomContent={bottomContent}
    setBottomContent={setBottomContent}
    selectedUserWithCM={selectedUserWithCM}
    selectedFilteredFriendlist={selectedFilteredFriendlist}
    navigateToUsernamesProfile={navigateToUsernamesProfile}
    userName={userName}
    foundUser={foundUser}
    currentUser={currentUser}
    />



</div>
        </>
        :
        <></>
      }
    
      </>
  );
};

export default Profile;
