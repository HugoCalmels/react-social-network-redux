import {useEffect} from 'react'
import defaultProfile from "../../assets/images/defaultProfile.jpg"
import { useSelector, useDispatch } from "react-redux";
import {
  addSomeoneToFriendList,
  getCurrentUserSuggestions,
  selectCurrentUserSuggestions,
  getCurrentInvitation,
  selectInvitationsList,
  selectCurrentUser,
  getinvitationsStatus,
  getCurrentUser
} from "../../redux/features/users/usersSlice";
import Cookies from "js-cookie";
import ModalLittlePerson from "./ModalLittlePerson"
import ModalFriendlist from "./ModalFriendlist"


const Suggestions = () => {

  const dispatch = useDispatch()
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);

  const suggestionsList = useSelector(selectCurrentUserSuggestions)

  const invitationList = useSelector(selectInvitationsList)

  const invitationStatus = useSelector(getinvitationsStatus)

  const currentUser = useSelector(selectCurrentUser)


  console.log('77777777777777777777')
  console.log(suggestionsList)
  console.log(currentUser)
  console.log('77777777777777777777')


  useEffect(() => {
    dispatch(getCurrentUserSuggestions()).unwrap()
    
  }, [])

  useEffect(() => {
    // WHENEVER WE ADD SOMEONE THE COMPONENT REFRESHES
    dispatch(getCurrentUserSuggestions()).unwrap()
    console.log(' ---------- AFTER USE EFFECT ------')
    console.log('--------------------------------')
    console.log('--------------------------------')
    console.log(suggestionsList)
    console.log(currentUser)
    console.log('--------------------------------')
    console.log('--------------------------------')
    console.log('--------------------------------')
    dispatch(getCurrentUser()).unwrap()
    // ACTUALLY MY CURRENTUSER HAS TO BE UPDATED 
  },[invitationStatus])

  const addToFriendsList = (e) => {
    e.preventDefault();

    try {
      dispatch(
        addSomeoneToFriendList({
          user_id: cookieUserInfos.id,
          receiver_id: e.currentTarget.id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  
  console.log('///////////////////////////')
  console.log('///////////////////////////')
  console.log(suggestionsList)
  console.log('///////////////////////////')
  console.log('///////////////////////////')

  const deleteSuggestion = () => {
    alert('Fonctionnalité en développement ..')
  }

  console.log(currentUser)

  let filteredSuggestionList = ''
  if (currentUser !== undefined) {
    let usersIds = currentUser.sent_invitations.map(el=> el.receiver_id)
   filteredSuggestionList = suggestionsList.filter(suggestion => !usersIds.includes(suggestion.owner_id))
  }


  console.log('OOOOOOOOOOOOO')
  console.log('OOOOOOOOOOOOO')
  console.log('OOOOOOOOOOOOO')
  console.log(filteredSuggestionList)
  console.log('OOOOOOOOOOOOO')
  console.log('OOOOOOOOOOOOO')
  console.log('OOOOOOOOOOOOO')


  const openModalnAssociated = (e) => {
    console.log('IN')
    console.log(e.currentTarget.id)

    let test = e.currentTarget.querySelector('.modal-little-person-container')

    test.style.display = "flex"

    console.log(test)

  
    
  }

  const closeModalnAssociated = (e) => {
    console.log('OUT')
    console.log(e.currentTarget)
    let test = e.currentTarget.querySelector('.modal-little-person-container')

    test.style.display = "none"
  }


  const openModalnAssociatedFriendlist = (e) => {
    e.stopPropagation()
    console.log('IN')
    console.log(e.target)

    let test = e.currentTarget.querySelector('.modal-friendlist-container')

    test.style.display = "flex"

    console.log(test)

  
    
  }

  const closeModalnAssociatedFriendlist = (e) => {
    e.stopPropagation()
    console.log('OUT')
    console.log(e.target)
    let test = e.currentTarget.querySelector('.modal-friendlist-container')

    test.style.display = "none"
  }



  return (
    <div className="friends-page-content-grid suggestions">

    {filteredSuggestionList.length > 0 ?
      <>
        {filteredSuggestionList.map((suggestion) => (
          <div className="friends-page-content-card">
          <div className="friends-page-content-card-image">
          {suggestion.owner_avatar_link !== null ? (
            <>
              <img src={suggestion.owner_avatar_link} alt="avatarImage"></img>
            </>
          ) : (
            <>
              <img src={defaultProfile} alt="avatarImage"></img>
            </>
          )}
          </div>
          <div className="friends-page-content-content">
            <div className="friends-page-content-informations">
                <div className="friends-page-content-username">{suggestion.owner_username}</div>
                <div className="friends-page-content-small-friendlist">
                {suggestion.users.length > 0 ?
                      <>
                        <div className="friends-page-content-small-friendlist-avatars-container">
                     
                
                     {suggestion.users[0] && suggestion.users[0].avatar_link !== null ? (
                           <div onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar first" id={`friend-${suggestion.owner_id}-first`}>
                              <ModalLittlePerson order="first" friend={suggestion.users[0]} length={suggestion.users.length} />
                           <img src={suggestion.users[0].avatar_link} alt="avatarImage"></img>
                           </div>
                       ) : (
                         <div   onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar first" id={`friend-${suggestion.owner_id}-first`}>
                           <ModalLittlePerson order="first" friend={suggestion.users[0]} length={suggestion.users.length}/>
                           <img src={defaultProfile} alt="avatarImage"></img>
                           </div>
                 )}
                 
                     {suggestion.users.length > 1 ?
                     <>
                            {suggestion.users[1] && suggestion.users[1].avatar_link !== null ? (
                             <div onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar last" id={`friend-${suggestion.owner_id}-last`}>
                             <ModalLittlePerson order="last" friend={suggestion.users[1]} length={suggestion.users.length}/>
                                  <img src={suggestion.users[1].avatar_link} alt="avatarImage"></img>
                             </div>
                         ) : (
                           <div onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar last" id={`friend-${suggestion.owner_id}-last`}>
                             <ModalLittlePerson order="last" friend={suggestion.users[1]} length={suggestion.users.length}/>
                                    <img src={defaultProfile} alt="avatarImage"></img>
                             </div>
                         )}
                         </>
                       :
                       <></>
                     }
            
               
       
               </div>
                        <div className="friends-page-content-small-friendlist-text" onMouseEnter={(e)=>openModalnAssociatedFriendlist(e)} onMouseLeave={(e)=>closeModalnAssociatedFriendlist(e)}>
                          <ModalFriendlist friendlist={suggestion.users} />
                          <p>{suggestion.users.length} ami{suggestion.users.length > 1 ? <span>s</span> : <></>}&nbsp;en commun</p>
                        </div>
                      </>
                      :
                      <></>
                    }
                    </div>
            </div>
            <div className="friends-page-content-btns">
              <div className="friends-page-content-add-btn" id={suggestion.owner_id} onClick={(e)=>addToFriendsList(e)}><button>Ajouter</button></div>
              <div className="friends-page-content-remove-btn" onClick={deleteSuggestion}><button>Supprimer</button></div>
            </div>
          </div>
            </div>
        ))}
      
        </>
      :
      <div className="no-friends">Vous n'avez aucune suggestion d'ami(s).</div>}
    

    
    
    </div>
  )
}

export default Suggestions