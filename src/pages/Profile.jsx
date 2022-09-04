import { useState, useEffect } from "react";
import "../Styles/profile/Index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createAvatar,
  createThumbnail,
  addSomeoneToFriendList,
  cancelFriendRequest,
  getCurrentInvitation,
} from "../redux/features/users/usersSlice";
import { getPostsStatus, getAllPosts } from "../redux/features/posts/postsSlice";
import {
  getUserImageUploadStatus,
  getCurrentUserFriendlist,
  removeSomeoneFromFriendlist,
  selectSelectedFriendList,
  getSelectedUserFriendList,
  getinvitationsStatus,
  getFriendListStatus,
  getCurrentUser,
  selectCurrentUser,
  getSelectedUserCommonFriends,
  selectSelectedUserCommonFriends

} from "../redux/features/users/usersSlice";
import cameraIcon from "../assets/icons/cameraIcon.png";
import blackPenIcon from "../assets/icons/blackPenIcon.png";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import PostsListProfile from "../components/posts/PostsListProfile";
import AddNewPost from "../components/posts/AddNewPost";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import {
  getUserByUsername,
  getProfileStatus,
  selectProfileUser,

} from "../redux/features/profile/profileSlice";
import ModalProfileFriend from "../components/profile/ModalProfileFriend"
import ModalProfileFriend2 from "../components/profile/ModalProfileFriend2"

import ProfileFriendsContent from "../components/profile/ProfileFriendsContent"
import ProfilePhotosContent from "../components/profile/ProfilePhotosContent"
import chevronIcon from "../assets/icons/chevronIcon.png"
import crossIcon from "../assets/icons/crossIcon.png"

const Profile = (props) => {
  const dispatch = useDispatch();
  // déclaration des variables
  let { userName } = useParams();
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);
  // déclartion des états
  const [profileBtn, setProfileBtn] = useState("SENDABLE");
  // déclarations de redux
  const profileStatus = useSelector(getProfileStatus);
  const foundUser = useSelector(selectProfileUser);
  const currentUser = useSelector(selectCurrentUser);
  const currentInvit = useSelector(getCurrentInvitation);
  const selectedFriendlist = useSelector(selectSelectedFriendList);
  const imageUploadStatus = useSelector(getUserImageUploadStatus);
  const postsStatus = useSelector(getPostsStatus);
  const friendlistStatus = useSelector(getFriendListStatus);
  const invitationStatus = useSelector(getinvitationsStatus);
  const [bottomContent, setBottomContent] = useState('publications')

  const selectedUserWithCM = useSelector(selectSelectedUserCommonFriends)

  useEffect(() => {
    // TRIGGERS ONLY ONCE
    dispatch(getUserByUsername(userName)).unwrap();
    //dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    // the same as above but including common_friendships

  }, []);

  useEffect(() => {
    // TRIGGERS WHEN NAVIGATES TO
    dispatch(getUserByUsername(userName)).unwrap();
    //dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    dispatch(getSelectedUserCommonFriends(userName)).unwrap()
  },[userName])

  useEffect(() => {
    // ONCE WE GOT PAGE/PROFILE USER.ID
 
      //dispatch(getSelectedUserFriendList(foundUser.id)).unwrap();
      //dispatch(getSelectedUserCommonFriends(userName)).unwrap()
 
  }, [profileStatus]);

  useEffect(() => {
    // REFRESH COMPONENT WHENEVER IMAGE IS UPLOADED
    //dispatch(getUserPostImages(foundUser.id))
    dispatch(getUserByUsername(userName)).unwrap();
    dispatch(getAllPosts());
  }, [imageUploadStatus, dispatch]);

  useEffect(() => {
    // REFRESH WHENEVER INVITATION IS SENT
    dispatch(getCurrentUser());
    
    dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
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

  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log(foundUser)
  console.log(selectedFriendlist)
  console.log(currentUser)
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')
  console.log('//////+++++++++++++/////////////')

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getUserByUsername(userName)).unwrap();
    dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    //dispatch(getSelectedUserCommonFriends(userName)).unwrap()
    //dispatch(getSelectedUserCommonFriends(userName)).unwrap()
  }, [friendlistStatus]);

  // ***************** FONCTIONS ************************
  const submitThumbnail = (e) => {
    console.log("hi");
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("thumbnail[image]", e.currentTarget.files[0]);
      data.append("thumbnail[user_id]", foundUser.id);
      dispatch(
        createThumbnail({ formDataUser: data, user: foundUser })
      ).unwrap();
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };

  const submitAvatar = (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("avatar[image]", e.currentTarget.files[0]);
      data.append("avatar[user_id]", foundUser.id);
      dispatch(createAvatar({ formDataUser: data, user: foundUser })).unwrap();
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };

  const addToFriendsList = (e) => {
    e.preventDefault();
    try {
      dispatch(
        addSomeoneToFriendList({
          user_id: cookieUserInfos.id,
          receiver_id: foundUser.id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  console.log('**********************************')
  console.log('**********************************')
  console.log(foundUser)
  console.log(selectedFriendlist)
  console.log('**********************************')
  console.log('**********************************')


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

  let friendship1;
  let isAlreadyFriend = false;
  if (
    currentUser.friendships &&
    currentUser.friendships.find((friend) => friend.friend_id === foundUser.id)
  ) {
    isAlreadyFriend = true;
    friendship1 = currentUser.friendships.find(
      (friend) => friend.friend_id === foundUser.id
    );
  }

  let friendship2;
  if (foundUser && foundUser.id) {
    friendship2 = foundUser.friendships.find(
      (friend) => friend.friend_id === cookieUserInfos.id
    );
  }

  const handleRemoveFromFriendlist = (e) => {
    dispatch(
      removeSomeoneFromFriendlist({
        friendship1: friendship1.id,
        friendship2: friendship2.id,
      })
    ).unwrap();

  };

  console.log('@@@@@@@@@@@@@@@@@@@@')
  console.log(selectedFriendlist)
  console.log('@@@@@@@@@@@@@@@@@@@@')

  let btnAddPost = document.querySelector(".btn-open-modal-add-post");
  if (foundUser.id !== cookieUserInfos.id && btnAddPost !== null) {
    btnAddPost.style.display = "none";
  }

  let miniModalsList = document.querySelectorAll('.modal-profile-text-modal-friendlist.profile')

  /////////////////

  const openModalnAssociated = (e) => {


    if (e.currentTarget.id === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none"
      })
    }


    let test = e.currentTarget.querySelector('.modal-profile-friend')

    test.style.display = "flex"

    console.log(test)

  
    
  }
  const openModalnAssociated2 = (e) => {
    console.log('IN')
    console.log(e.currentTarget.id)

    let test = e.currentTarget.querySelector('.modal-profile-friend')

    test.style.display = "flex"

    console.log(test)

  
    
  }

  const closeModalnAssociated = (e) => {
    if (e.currentTarget.id === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none"
      })
    }

    console.log('OUT')
    console.log('3333333333333333333333333333333333333333333')
    console.log('3333333333333333333333333333333333333333333')
    console.log('3333333333333333333333333333333333333333333')
    console.log('3333333333333333333333333333333333333333333')
    console.log(e.currentTarget.id)
      console.log('3333333333333333333333333333333333333333333')
        console.log('3333333333333333333333333333333333333333333')
        console.log('3333333333333333333333333333333333333333333')
    console.log('3333333333333333333333333333333333333333333')
    let test = e.currentTarget.querySelector('.modal-profile-friend')

    test.style.display = "none"
  }

  let hoveredBottomContentMenuSelectionnedElemList = document.querySelectorAll('.profile-navbar-option')
  if (hoveredBottomContentMenuSelectionnedElemList !== null) {
    hoveredBottomContentMenuSelectionnedElemList.forEach((el)=>{
      let res = el.querySelector('.profile-blue-line-container')
      el.style.color = "#65676B"
      res.style.display = "none"
    })
      
  }


  let hoveredBottomContentMenuSelectionnedElem = document.querySelector(`.profile-navbar-option.${bottomContent}`)

  console.log('#########################')
  console.log(hoveredBottomContentMenuSelectionnedElem)
  if (hoveredBottomContentMenuSelectionnedElem !== null) {
    console.log(hoveredBottomContentMenuSelectionnedElem)
    hoveredBottomContentMenuSelectionnedElem.style.color = "hsl(214, 89%, 52%)"
    let blueLine = hoveredBottomContentMenuSelectionnedElem.querySelector('.profile-blue-line-container')
    blueLine.style.display = "flex"
  }


  const openModalModifyProfil = () => {
    alert("Fonctionnalité en développement")
  }



  let filteredPhotosList = []
  let photoList = []
  if (foundUser.length !== 0) {
    let res = foundUser.posts.filter((el) => el.image_link !== null)
    photoList = res
    filteredPhotosList = res.slice(0, 9)
  }


  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log(foundUser)
  console.log(selectedUserWithCM)
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')

  let selectedFilteredFriendlist = []

  if (selectedUserWithCM.length > 0) {
    selectedFilteredFriendlist = selectedUserWithCM.slice(0, 9)
  }


  let photoReader = ''
  
  const [currentPhotoId, setCurrentPhotoId] = useState(0)

  photoReader = document.querySelector('.ppc-photos-reader.profile')


  const setPreviousPhoto = () => {
    if (currentPhotoId < 1) {
      setCurrentPhotoId(filteredPhotosList.length - 1)
    } else {
      setCurrentPhotoId(currentPhotoId - 1)
    }
  }

  const setNextPhoto = () => {
    if (currentPhotoId > filteredPhotosList.length - 2) {
      setCurrentPhotoId(0)
    } else {
      setCurrentPhotoId(currentPhotoId + 1)
    }
  }
  

  const closePhotosReader = () => {
    photoReader.style.display = "none"
  }

  const openPhotosReader = (e) => {
    setCurrentPhotoId(parseInt(e.currentTarget.id))
    photoReader.style.display = "flex"
  }




  let profileFriendModals = document.querySelectorAll('.modal-profile-friend.profile')

   let firstFriendModalHeightDimension = document.querySelectorAll('.profile-friend-wrapper')[0]

  
  
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
  console.log(profileFriendModals)
  console.log('-----------------')
  console.log(firstFriendModalHeightDimension)
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
   console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
  console.log('###@@@@@@##########@@@@@@@@@@@@@##########')
  
/*
    profileFriendModals.forEach((el) => {
      el.style.top = "-"+firstFriendModalHeightDimension.offsetHeight+'px'
    })
  
*/

  
  return (
    <div className="profile-container">
      <div className="profile-top">
        <div className="profile-top-header-image-container">
          {foundUser.thumbnail_link ? (
            <>
              <img
                className="profile-top-header-thumbnail"
                src={foundUser.thumbnail_link}
                alt="profileThumbnail"
              ></img>
            </>
          ) : (
            <>
              <div className="profile-top-header-gradiant"></div>
            </>
          )}

          {foundUser.id === cookieUserInfos.id ? (
            <>
              <div className="profile-top-thumbnail-input-container">
                <label className="thumbnail-label" for="thumbnailUpload">
                  <img src={cameraIcon} alt="uploadProfileImage" />
                  <span>Ajouter une photo de couverture</span>{" "}
                </label>
                <input
                  className="thumbnail-input"
                  type="file"
                  name="thumbnailUpload"
                  id="thumbnailUpload"
                  onChange={(e) => submitThumbnail(e)}
                ></input>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="profile-top-options">
          <div className="profile-top-avatar-container">
            <div className="avatar-image-container">
              {foundUser.avatar_link !== null ? (
                <>
                  <img src={foundUser.avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
            </div>

            {foundUser.id === cookieUserInfos.id ? (
              <>
                <div className="profile-top-avatar-input-container">
                  <label className="avatar-label" for="avatarUpload">
                    <img src={cameraIcon} alt="uploadProfileAvatar" />
                  </label>
                  <input
                    className="avatar-input"
                    type="file"
                    name="avatarUpload"
                    id="avatarUpload"
                    onChange={(e) => submitAvatar(e)}
                  ></input>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="profile-top-informations">
            <div className="profile-username">{foundUser.username}</div>
            <div className="profile-nb-of-friends">
              {selectedFilteredFriendlist.length} amis{" "}
            </div>
            <div className="profile-friends-avatars">
              {selectedFilteredFriendlist && selectedFilteredFriendlist.length > 0 ? (
                <>
                  {selectedFilteredFriendlist.map((friend) => (
                    <div className="future-friend-avatar" onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)}>
                      <ModalProfileFriend friend={friend} length={selectedFilteredFriendlist.length} />
                      <div className="future-friend-round-effect">
                        {friend.owner_avatar_link === null ||
                        friend.owner_avatar_link === "" ? (
                          <>
                            <img src={defaultProfile} />
                          </>
                        ) : (
                          <>
                            <img src={friend.owner_avatar_link} />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="profile-top-buttons">
            {foundUser.id === cookieUserInfos.id ? (
              <>
                <button for="updateProfile">
                  <img src={blackPenIcon} alt="updateProfile"></img>
                  <span onClick={openModalModifyProfil}>Modifier le profil</span>
                </button>
              </>
            ) : (
              <>
                {isAlreadyFriend ? (
                  <>
                    <div className="profile-user-interactions">
                      <button
                        onClick={(e) => handleRemoveFromFriendlist(e)}
                        data-btn-remove-friend-request-id={foundUser.id}
                        id={foundUser.id}
                      >
                        retirer des amis
                      </button>
                      <button>message</button>
                    </div>
                  </>
                ) : (
                  <>
                    {currentUser.sent_invitations &&
                    currentUser.sent_invitations.find(
                      (el) => el.receiver_id === foundUser.id
                    ) ? (
                      <>
                        <div className="profile-user-interactions">
                          <button
                            onClick={(e) => handleCancelFriendRequest(e)}
                            data-btn-cancel-friend-request-id={foundUser.id}
                          >
                            annuler l'invitation
                          </button>
                          <button>message</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="profile-user-interactions">
                          <button onClick={(e)=>addToFriendsList(e)}>ajouter</button>
                          <span>condition 3</span>
                          <button>message</button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="profile-navbar-container">
          <div className="profile-navbar">
            <div className="profile-navbar-navigation">
              <div className="profile-navbar-option publications" onClick={(e)=>setBottomContent("publications")}><p>Publications<div className="profile-blue-line-container"><div className="profile-blue-line"></div></div></p></div>
              <div className="profile-navbar-option amis" onClick={(e)=>setBottomContent("amis")}><p>Amis<div className="profile-blue-line-container"><div className="profile-blue-line"></div></div></p></div>
              <div className="profile-navbar-option photos" onClick={(e)=>setBottomContent("photos")}><p>Photos<div className="profile-blue-line-container"><div className="profile-blue-line"></div></div></p></div>
            </div>
            {/*
             <div className="profile-navbar-dropdown-menu">
            <img src={dotsMenuIcon} alt="profile-dropdown-menu"/>
          </div>
            */}
          </div>
        </div>
      </div>

      {bottomContent === "publications" ?
        <div className="profile-bottom">
        <div className="profile-bottom-left">
          { filteredPhotosList.length > 0 ?  (
            <>
                <div className="profile-photos-container">
                <div className="ppc-photos-reader profile">
                  <div className="ppc-photo-unit profile"><img src={filteredPhotosList[currentPhotoId].image_link} /></div>
                  <div className="ppc-previous-btn profile" onClick={setPreviousPhoto}><img src={chevronIcon}/></div>
                  <div className="ppc-next-btn profile" onClick={setNextPhoto}><img src={chevronIcon} /></div>
                  <div className="ppc-close-btn profile" onClick={closePhotosReader}><img src={crossIcon}/></div>
                </div>
                <div className="profile-photos-header">
                  <h3>Photos</h3>
                    <p onClick={(e) => setBottomContent("photos")}>Toutes les photos</p>
                </div>
                <div className="profile-photos">
                  {filteredPhotosList.map((post, index) => (
                    <>
                      <div className="future-user-photo">
                        <img id={index} src={post.image_link} alt="userImage" onClick={(e)=>openPhotosReader(e)}/>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {selectedFilteredFriendlist.length > 0 ? (
            <>
              <div className="profile-friends-container">
                <div className="profile-friends-header">
                  <div className="profile-friends-header-top">
                    <div className="profile-friends-header-title">Amis</div>
                    <div className="profile-friends-header-right" onClick={(e) => setBottomContent("amis")}>
                      Tous les amis
                    </div>
                  </div>
                  <div className="profile-friends-header-nbfriends">
                    {selectedUserWithCM.length } amis
                  </div>
                </div>
                <div className="profile-friends-content">
                  {selectedFilteredFriendlist.map((friend) => (
                    <>
                      <div className="profile-friend-unit" onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)}>
                      <ModalProfileFriend2 friend={friend} length={selectedFilteredFriendlist.length} />
                        <div className="profile-friend-wrapper">
                          {friend.owner_avatar_link === null ||
                          friend.owner_avatar_link === "" ? (
                            <>
                              <img src={defaultProfile} />
                            </>
                          ) : (
                            <>
                              <img src={friend.owner_avatar_link} />
                            </>
                          )}
                          <span>{friend.owner_username}</span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="profile-bottom-right">
 

          <PostsListProfile username={userName} currentUser={currentUser} foundUser={foundUser} profile={true} />
        </div>
      </div>
        : bottomContent === "amis" ?
          <>
            {selectedUserWithCM.length > 0 ?
                       <ProfileFriendsContent friendlist={selectedUserWithCM} setBottomContent={setBottomContent} />
              :
              <><p className="error-profile-mid-navbar">Aucun ami</p></>}
        
            </>
          : bottomContent === "photos" ?
            <>
              {photoList.length > 0 ?
                <ProfilePhotosContent photos={photoList} />
                :
                <><p className="error-profile-mid-navbar">Aucune photo</p></>
              }
              
            
              </>
        :
        <></>
      }
      
    </div>
  );
};

export default Profile;
