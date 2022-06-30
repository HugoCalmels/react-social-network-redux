// react
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from "../../redux/features/auth/authSlice"
import { getUserPostImages, getImagesStatus } from "../../redux/features/images/imagesSlice"
// others
import { getPostsImagesStatus, getPostsStatus} from "../../redux/features/posts/postsSlice";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import {getFriendListStatus,getAllUsers, getCurrentStatus,selectAllUsers,getCurrentUserFriendlist, getCurrentUser,selectFriendList, selectCurrentUser, getUsersStatus,sendInvitationConfirmation, updateInvitationStatus} from '../../redux/features/users/usersSlice'
import "../../Styles/navbar/index.scss"
import messengerIcon from "../../assets/icons/messengerIcon.png"
import bellIcon from "../../assets/icons/bellIcon.png"
import triangleIcon from "../../assets/icons/triangleIcon.png"
import blueUsersIcon from "../../assets/icons/blueUsersIcon.png"
import blueHouse from "../../assets/icons/blueHouse.png"
import defaultProfile from "../../assets/images/defaultProfile.jpg"

const Navbar = (props) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cookieAuth = Cookies.get('isAuth')
  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 

  const makeLoggout = () => {
    console.log(cookieAuth)
    dispatch(logout())
    navigate('/')
  }
  const redirectToProfile = () => {
    loadUserPostImages()
    navigate(`/${cookieUserInfos.name}`)
  }
  const loadUserPostImages = () => {
    try {
      dispatch(getUserPostImages(cookieUserInfos.id)).unwrap()
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
  const imagesStatus2 = useSelector(getPostsImagesStatus)
  const currentStatus = useSelector(getCurrentStatus)
  const user =  useSelector(selectCurrentUser)
  const imagesStatus = useSelector(getImagesStatus)
  const usersStatus = useSelector(getUsersStatus)
  const postsStatus = useSelector(getPostsStatus)
  const friendlist = useSelector(selectFriendList)
  const friendlistStatus = useSelector(getFriendListStatus)
  const users = useSelector(selectAllUsers)
  useEffect(() => {

    if (usersStatus === "idle") {

      dispatch(getCurrentUser())

    }


  }, [usersStatus, currentStatus, imagesStatus, dispatch])

  useEffect(() => {
      dispatch(getAllUsers())

  }, [friendlistStatus, dispatch])


  let userList = ''
  if (friendlistStatus === 'loading') {
    userList= <p>" Loading ... "</p>;
  } else if (friendlistStatus === 'succeeded') {

    userList= users
  } else if (friendlistStatus === 'error') {
    userList= <p>Error</p>
  }
  useEffect(() => {
    console.log('11111111111111111111111111111111111111111111111')
    console.log(userList)
    console.log('11111111111111111111111111111111111111111111111')
  }, [userList])


  let currentUser = ''
  if (usersStatus === 'loading') {
    currentUser= <p>" Loading ... "</p>;
  } else if (usersStatus === 'succeeded') {

    currentUser= user
  } else if (usersStatus === 'error') {
    currentUser= <p>Error</p>
  }

 

  useEffect(() => {
  },[currentUser])

  const openNotificationsModal = () => {
  }

  let usersListThatInvitedYou = []
  if (currentUser.received_invitations){

    currentUser.received_invitations.forEach((invit) => {
    
      let user = props.userList.filter((user)=>user.id === invit.sender_id)
      usersListThatInvitedYou.push(user)

    })
  }



  const hiddenNotifsModal = document.querySelector('.hidden-notifications-modal')

  const openModalNotifications = () => {

    if (usersListThatInvitedYou[0]) {
      usersListThatInvitedYou[0].forEach((invit) => {
        let foundInvit = invit.sent_invitations.find((el)=>el.receiver_id === cookieUserInfos.id )
        //dispatch(updateInvitationStatus(foundInvit)).unwrap()
      })
    }
    

    if (hiddenNotifsModal.classList.contains('active')) {
      hiddenNotifsModal.classList.remove('active')
    } else {
      hiddenNotifsModal.classList.toggle('active')
    }
  }

  const confirmInvitation = (e) => {

    e.preventDefault()
    let friend = usersListThatInvitedYou[0].filter((list) => {
      return list.sent_invitations.filter((invit)=>invit.id === e.currentTarget.id)
    })

    try {
      dispatch(sendInvitationConfirmation({ invit_id: e.currentTarget.id, user_id:cookieUserInfos.id, friend:friend[0]})).unwrap()
    } catch (e) {
      
    }
  }

  const refuseInvitation = () => {

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
          <div className="navbar-btn-option">
          <img src={bellIcon} alt="bellIcon"></img>
          </div>
          <div className="navbar-btn-option">
            <img src={triangleIcon} onClick={openModalNotifications} alt="optionsIcon"></img>
          </div>

          <div className="hidden-notifications-modal">

            <div className="hidden-notifications-invitations">
              {usersListThatInvitedYou[0] !== undefined && usersListThatInvitedYou[0][0] && usersListThatInvitedYou[0][0].sent_invitations.length !== 0 ?
                <>
                   {usersListThatInvitedYou[0].map((user) => (
                <>
                  <div className="hidden-notifications-invitation">
                    <div className="hidden-notifications-invitation-user-avatar">
                    {user && user.avatar_link !== null  ?
                      <><img src={user.avatar_link} alt="user avatar"></img></>
                      :
                     <><img src={defaultProfile} alt="user avatar"></img></>
                    }
                    </div>
                    <div className="hidden-notifications-invitation-user-informations">
                           <div className="hidden-notif-invitation-username">
                             <b>{user.username}</b> vous a envoyé une invitation.
                           </div>
                           <div className="hidden-notif-invitation-btns">
                          
                             <button className="hidden-notif-btn accept" id={user.sent_invitations.filter((invit) => invit.receiver_id === cookieUserInfos.id)[0].id} onClick={(e) => confirmInvitation(e)}><div className="hidden-friend-id" id='5' ></div>Confirmer</button>
                             <button className="hidden-notif-btn refuse"onClick={refuseInvitation}>Supprimer</button>
                           </div>
                    </div>
                  </div>
                </>
              ))}
                </>
                :
                <>
                </>
              }
             
            </div>

            <div className="hidden-notifications-custom-hr"></div>
            <div className="hidden-notifications-options-menu"></div>
          </div>

        </div>
        </div>
        </nav>

  )
}

export default Navbar