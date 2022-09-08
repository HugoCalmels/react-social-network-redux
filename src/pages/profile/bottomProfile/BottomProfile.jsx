import React, { useEffect,Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfileUser } from "../../../redux/features/profile/profileSlice";
import { getUserByUsername } from "../../../redux/features/profile/profileSlice";
import { getPostsStatus } from "../../../redux/features/posts/postsSlice";
import { getUserImageUploadStatus } from "../../../redux/features/users/usersSlice";

import PostsListProfile from "./components/PostsListProfile"
import ProfileFriendsContent from "./components/ProfileFriendsContent"
import ProfilePhotosContent from "./components/ProfilePhotosContent"
import BottomLeftProfilePhotos from "./components/BottomLeftProfilePhotos"
import BottomLeftProfileFriends from "./components/BottomLeftProfileFriends"



const BottomProfile = (props) => {
  const foundUser = useSelector(selectProfileUser);
  const postsStatus = useSelector(getPostsStatus)
  const imageUploadStatus = useSelector(getUserImageUploadStatus);
  const dispatch = useDispatch();
  let filteredPhotosList = [];
  let photoList = [];
  if (foundUser.length !== 0) {
    let res = foundUser.posts.filter((el) => el.image_link !== null && el.image_link !== '');
    photoList = res;
    filteredPhotosList = res.slice(0, 9);
  }



  useEffect(() => {
  
      dispatch(getUserByUsername(props.userName)).unwrap();
   

  }, [getUserImageUploadStatus ])
  




  return (
    <>
      {props.bottomContent === "publications" ? (
        <div className="profile-bottom">
          <div className="profile-bottom-left">
    
              <BottomLeftProfilePhotos
                setBottomContent={props.setBottomContent}
                filteredPhotosList={filteredPhotosList}
              />
     


              {props.selectedFilteredFriendlist.length > 0 ? (
                <>
                  <BottomLeftProfileFriends
                    setBottomContent={props.setBottomContent}
                    selectedUserWithCM={props.selectedUserWithCM}
                    selectedFilteredFriendlist={
                      props.selectedFilteredFriendlist
                    }
                    navigateToUsernamesProfile={
                      props.navigateToUsernamesProfile
                    }
                  />
                </>
              ) : (
                ""
              )}
  
          </div>

    
            <div className="profile-bottom-right">
              <PostsListProfile
                username={props.userName}
                currentUser={props.currentUser}
                foundUser={props.foundUser}
              />
            </div>
  
        </div>
      ) : props.bottomContent === "amis" ? (

          <>
            {props.selectedUserWithCM.length > 0 ? (
              <ProfileFriendsContent
                friendlist={props.selectedUserWithCM}
                  setBottomContent={props.setBottomContent}
                  currentUser={props.currentUser}
              />
            ) : (
              <>
                <p className="error-profile-mid-navbar">Aucun ami</p>
              </>
            )}
          </>

      ) : props.bottomContent === "photos" ? (
     
          <>
            {photoList.length > 0 ? (
              <ProfilePhotosContent photos={photoList} />
            ) : (
              <>
                <p className="error-profile-mid-navbar">Aucune photo</p>
              </>
            )}
          </>
 
      ) : (
        <></>
      )}
    </>
  );
};

export default BottomProfile;
