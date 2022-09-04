
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAllUsernames,
  selectCurrentUserInvitationsList,
  sendInvitationConfirmation,
  refuseInvitation,
  getCurrentUserNavbarStatus
 
} from "../../redux/features/users/usersSlice";
import defaultProfile from "../../assets/images/defaultProfile.jpg"
import Cookies from "js-cookie";
import { useEffect } from "react";
const Invitations = () => {
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);
  const currentUserInvitationsList = useSelector(
    selectCurrentUserInvitationsList
  );
  const dispatch = useDispatch()

  const status = useSelector(getCurrentUserNavbarStatus)

  useEffect(() => {
    
  },[status ])

  const confirmInvitation = (e) => {
    e.preventDefault();
    try {
      dispatch(
        sendInvitationConfirmation({
          invit_id: e.currentTarget.id.split(",")[0],
          user_id: cookieUserInfos.id,
          friend_id: e.currentTarget.id.split(",")[1],
        })
      ).unwrap();
    } catch (e) {}
  };

  const handleRefuseInvitation = (e) => {
    try {
      dispatch(refuseInvitation(e.currentTarget.id));
    } catch (e) {
      console.log(e);
    }
  };

  console.log('////////')
  console.log(currentUserInvitationsList)
  console.log('////////')
  

  
  return (
    <div className="friends-page-content-grid all-friends">

        {currentUserInvitationsList.length > 0 ?
          <>
            {currentUserInvitationsList.map((invitation) => (
              <div className="friends-page-content-card">
              <div className="friends-page-content-card-image">
              {invitation.sender.avatar_link !== null ? (
                <>
                  <img src={invitation.sender.avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
              </div>
              <div className="friends-page-content-content">
                <div className="friends-page-content-informations">
                    <div className="friends-page-content-username">{invitation.sender.username}</div>
   
                </div>
                <div className="friends-page-content-btns">
                    <div className="friends-page-content-add-btn"id={`${invitation.id},${invitation.sender_id}`} onClick={(e) => confirmInvitation(e)}><button>Accepter</button></div>
                  <div className="friends-page-content-remove-btn"id={`${invitation.id}`}  onClick={(e) => handleRefuseInvitation(e)}><button>Refuser</button></div>
                </div>
              </div>
                </div>
            ))}
          
            </>
          :
          <div className="no-friends">Vous n'avez aucune invitation.</div>}
        

        
        
        </div>
  )
}

export default Invitations