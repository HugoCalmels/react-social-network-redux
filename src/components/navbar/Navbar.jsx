// react
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import {
  getUserPostImages,
  getImagesStatus,
} from "../../redux/features/images/imagesSlice";
// others
import {
  getPostsImagesStatus,
  getPostsStatus,
} from "../../redux/features/posts/postsSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import {
  selectCurrentUserInvitationsList,
  getCurrentUserInvitationsList,
  getCurrentUser,
  getinvitationsStatus,
  selectInvitationsList,
  addUserToCustomFriendist,
  getFriendListStatus,
  getAllUsers,
  getCurrentStatus,
  selectAllUsers,
  getCurrentUserFriendlist,
  getCurrentUserNavbarStatus,
  selectFriendList,
  selectCurrentUser,
  getUsersStatus,
  sendInvitationConfirmation,
  updateInvitationStatus,
  refuseInvitation,
  markInvitationAsSeen
} from "../../redux/features/users/usersSlice";
import "../../Styles/navbar/index.scss";
import messengerIcon from "../../assets/icons/messengerIcon.png";
import bellIcon from "../../assets/icons/bellIcon.png";
import triangleIcon from "../../assets/icons/triangleIcon.png";
import blueUsersIcon from "../../assets/icons/blueUsersIcon.png";
import blueHouse from "../../assets/icons/blueHouse.png";
import defaultProfile from "../../assets/images/defaultProfile.jpg";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // déclarations DOM
  const hiddenNotifsModal = document.querySelector(
    ".hidden-notifications-modal"
  );
  // déclarations des variables
  const cookieAuth = Cookies.get("isAuth");
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);
  // déclarations de redux
  const imagesStatus2 = useSelector(getPostsImagesStatus);
  const currentStatus = useSelector(getCurrentStatus);
  const user = useSelector(selectCurrentUser);
  const imagesStatus = useSelector(getImagesStatus);
  const usersStatus = useSelector(getUsersStatus);
  const postsStatus = useSelector(getPostsStatus);
  const friendlist = useSelector(selectFriendList);
  const friendlistStatus = useSelector(getFriendListStatus);
  const users = useSelector(selectAllUsers);

  const invitationsList = useSelector(selectInvitationsList);
  const invitationsStatus = useSelector(getinvitationsStatus);

  const currentUserStatus = useSelector(getCurrentStatus);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserInvitationsList = useSelector(
    selectCurrentUserInvitationsList
  );
  const currentUserNavbarStatus = useSelector(getCurrentUserNavbarStatus)

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCurrentUserInvitationsList());
  }, []);


  useEffect(() => {
  }, [friendlistStatus, dispatch]);

  useEffect(() => {}, [currentUser]);

  const openNotificationsModal = () => {};

  useEffect(() => {}, [invitationsList]);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCurrentUserInvitationsList());
  },[currentUserNavbarStatus])

  // ******* FONCTIONS ***********

  const makeLoggout = () => {
    console.log(cookieAuth);
    dispatch(logout());
    navigate("/");
  };
  const redirectToProfile = () => {
    loadUserPostImages();
    navigate(`/${cookieUserInfos.name}`);
  };
  const loadUserPostImages = () => {
    try {
      dispatch(getUserPostImages(cookieUserInfos.id)).unwrap();
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  // At this point I need a list ( with redux ) for all users that invited me.

  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
  console.log(currentUser)
  console.log(currentUserInvitationsList)
  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')

  let invitsNotSeen = []
  invitsNotSeen = currentUserInvitationsList.filter((invit) => {
    if (invit.sender_id !== cookieUserInfos.id){
      return invit.seen === false
    }

  })


  const openModalNotifications = () => {
    if (hiddenNotifsModal !== null) {
      if (hiddenNotifsModal.classList.contains("active")) {
        hiddenNotifsModal.classList.remove("active");
      } else {
        hiddenNotifsModal.classList.toggle("active");
        // mark invitations as "seen", whenever the modal is opened
      
        if (invitsNotSeen.length > 0) {
          invitsNotSeen.forEach((invit) => {
            dispatch(markInvitationAsSeen(invit.id)).unwrap()
          })
        }
    
      }
    }
  };



  const confirmInvitation = (e) => {
    e.preventDefault();
    try {
      dispatch(
        sendInvitationConfirmation({
          invit_id: e.currentTarget.id.split(',')[0],
          user_id: cookieUserInfos.id,
          friend_id: e.currentTarget.id.split(',')[1],
        })
      ).unwrap();
    } catch (e) {}
  };

  const handleRefuseInvitation = (e) => {
    try {
      dispatch(refuseInvitation(e.currentTarget.id))
    } catch (e) {
      console.log(e)
    }
  };

  let nbNotifsDiv = document.querySelector('.navbar-notifications-nb-messages')

  if (nbNotifsDiv !== null && invitsNotSeen.length > 0) {
    nbNotifsDiv.style.display = "flex"
  } else if (nbNotifsDiv !== null){
    nbNotifsDiv.style.display = "none"
  }

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="left-navbar">
          <p>home</p>
          <input type="search"></input>
        </div>
        <div className="middle-navbar">
          <div className="navbar-navigation-option">
            <img src={blueHouse} alt="home"></img>
          </div>
          <div className="navbar-navigation-option">
            <img src={blueUsersIcon} alt="friend"></img>
          </div>
        </div>
        <div className="right-navbar">
          <div className="navbar-btn-option">
            <img src={messengerIcon} alt="messengerIcon"></img>
          </div>
          <div className="navbar-btn-option notifs" onClick={openModalNotifications}>
            <img
              src={bellIcon}
              alt="optionsIcon"
            >
            </img>
           
            <div className="navbar-notifications-nb-messages">{invitsNotSeen.length}</div>
          </div>
          <div className="navbar-btn-option">
            <img src={triangleIcon} alt="bellIcon"></img>
          </div>
        

          <div className="hidden-notifications-modal">
            <div className="hidden-notifications-invitations">
              {currentUserInvitationsList !== undefined ? (
                <>
                  {currentUserInvitationsList.map((user) => (
                   
                    <>
                      {user.sender_id !== cookieUserInfos.id ?
                        <><div className="hidden-notifications-invitation">
                        <div className="hidden-notifications-invitation-user-avatar">
                          {user.sender && user.sender.avatar_link !== null ? (
                            <>
                              <img
                                src={user.sender.avatar_link}
                                alt="user avatar"
                              ></img>
                            </>
                          ) : (
                            <>
                              <img src={defaultProfile} alt="user avatar"></img>
                            </>
                          )}
                        </div>
                        <div className="hidden-notifications-invitation-user-informations">
                          <div className="hidden-notif-invitation-username">
                            <b>{user.sender.username}</b> vous a envoyé une invitation.
                          </div>
                          <div className="hidden-notif-invitation-btns">
                            <button
                              className="hidden-notif-btn accept"
                              id={`${user.id},${user.sender_id}`}
                             
                              onClick={(e) => confirmInvitation(e)}
                            >
                              <div className="hidden-friend-id" id="007"></div>
                              Confirmer
                            </button>
                            <button
                              className="hidden-notif-btn refuse"
                              id={`${user.id}`}
                              onClick={(e)=>handleRefuseInvitation(e)}
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                        : ''}
                      </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="hidden-notifications-custom-hr"></div>
            <div className="hidden-notifications-options-menu"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
