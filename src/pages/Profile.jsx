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
import { getPostsStatus } from "../redux/features/posts/postsSlice";
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
} from "../redux/features/users/usersSlice";
import cameraIcon from "../assets/icons/cameraIcon.png";
import blackPenIcon from "../assets/icons/blackPenIcon.png";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import PostList from "../components/posts/PostsList";
import AddNewPost from "../components/posts/AddNewPost";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import {
  getUserByUsername,
  getProfileStatus,
  selectProfileUser,
} from "../redux/features/profile/profileSlice";

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

  useEffect(() => {
    // TRIGGERS ONLY ONCE
    dispatch(getUserByUsername(userName)).unwrap();
    dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
  }, []);

  useEffect(() => {
    // TRIGGERS WHEN NAVIGATES TO
    dispatch(getUserByUsername(userName)).unwrap();
    dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
  },[userName])

  useEffect(() => {
    // ONCE WE GOT PAGE/PROFILE USER.ID
    if (foundUser.id !== undefined) {
      dispatch(getSelectedUserFriendList(foundUser.id)).unwrap();
    }
  }, [profileStatus]);

  useEffect(() => {
    // REFRESH COMPONENT WHENEVER IMAGE IS UPLOADED
    //dispatch(getUserPostImages(foundUser.id))
    dispatch(getUserByUsername(userName)).unwrap();
  }, [postsStatus, imageUploadStatus, dispatch]);

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

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getUserByUsername(userName)).unwrap();
    dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    if (foundUser.id !== undefined) {
      dispatch(getSelectedUserFriendList(foundUser.id)).unwrap();
    }
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

  const addToFriendsList = () => {
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
        friendship1: friendship1,
        friendship2: friendship2,
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
              {selectedFriendlist.length} amis{" "}
            </div>
            <div className="profile-friends-avatars">
              {selectedFriendlist && selectedFriendlist.length > 0 ? (
                <>
                  {selectedFriendlist.map((friend) => (
                    <div className="future-friend-avatar">
                      <div className="future-friend-round-effect">
                        {friend.friend.avatar_link === null ||
                        friend.friend.avatar_link === "" ? (
                          <>
                            <img src={defaultProfile} />
                          </>
                        ) : (
                          <>
                            <img src={friend.friend.avatar_link} />
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
                  <span>Modifier le profil</span>
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
                          <button onClick={addToFriendsList}>ajouter</button>
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
              <div className="profile-navbar-option">Publications</div>
              <div className="profile-navbar-option">A propos</div>
              <div className="profile-navbar-option">Amis</div>
              <div className="profile-navbar-option">Photos</div>
              <div className="profile-navbar-option">Vidéos</div>
            </div>
            {/*
             <div className="profile-navbar-dropdown-menu">
            <img src={dotsMenuIcon} alt="profile-dropdown-menu"/>
          </div>
            */}
          </div>
        </div>
      </div>

      <div className="profile-bottom">
        <div className="profile-bottom-left">
          {foundUser.posts && foundUser.posts.length > 0 ? (
            <>
              <div className="profile-photos-container">
                <div className="profile-photos-header">
                  <h3>Photos</h3>
                  <p>Toutes les photos</p>
                </div>
                <div className="profile-photos">
                  {foundUser.posts.map((post) => (
                    <>
                      <div className="future-user-photo">
                        <img src={post.image_link} alt="userImage" />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {selectedFriendlist.length > 0 ? (
            <>
              <div className="profile-friends-container">
                <div className="profile-friends-header">
                  <div className="profile-friends-header-top">
                    <div className="profile-friends-header-title">Amis</div>
                    <div className="profile-friends-header-right">
                      Tous les amis
                    </div>
                  </div>
                  <div className="profile-friends-header-nbfriends">
                    79 amis
                  </div>
                </div>
                <div className="profile-friends-content">
                  {selectedFriendlist.map((friend) => (
                    <>
                      <div className="profile-friend-unit">
                        <div className="profile-friend-wrapper">
                          {friend.friend.avatar_link === null ||
                          friend.friend.avatar_link === "" ? (
                            <>
                              <img src={defaultProfile} />
                            </>
                          ) : (
                            <>
                              <img src={friend.friend.avatar_link} />
                            </>
                          )}
                          <span>{friend.friend.username}</span>
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
          <AddNewPost currentUser={currentUser} />

          <PostList currentUser={currentUser} foundUser={foundUser} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
