import {useEffect} from 'react'
import defaultProfile from "../../assets/images/defaultProfile.jpg"
import { useSelector, useDispatch } from "react-redux";
import {
  selectFriendList,
  getFriendListStatus,
  getCurrentUserFriendlist,
  getCurrentUserCommonFriends,
  selectCurrentUserCommonFriends,
  removeSomeoneFromFriendlist
} from "../../redux/features/users/usersSlice";
import ModalLittlePerson from "./ModalLittlePerson"
import ModalFriendlist from "./ModalFriendlist"
const AllFriends = () => {

  const dispatch = useDispatch()
  //const friendlist = useSelector(selectFriendList);
  const commonFriendships = useSelector(selectCurrentUserCommonFriends)
  const friendlist = useSelector(selectFriendList);

  const status = useSelector(getFriendListStatus)

  useEffect(() => {
    dispatch(getCurrentUserCommonFriends()).unwrap()
  }, [])
  
  useEffect(() => {
    dispatch(getCurrentUserCommonFriends()).unwrap()
  },[status])
  /*
  useEffect(() => {
    console.log('use effect triggered')
    console.log(commonFriendships2)
    console.log('use effect triggered')
    console.log('use effect triggered')
    console.log('use effect triggered')
  },[commonFriendships2])
*/

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log(commonFriendships)
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

  const handleRemoveFromFriendlist = (e) => {
    e.preventDefault()
    let friendship1 = e.target.id.split(',')[0]
    let friendship2 = e.target.id.split(',')[1]


    dispatch(
      removeSomeoneFromFriendlist({
        friendship1: friendship1,
        friendship2: friendship2,
      })
    ).unwrap();

  };

  const alertMessage = () => {
    alert("Fonctionnalité en développement")
  }

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
    <div className="friends-page-content-grid all-friends">
      

        {commonFriendships.length > 0 ?
          <>
          {commonFriendships.map((friend) => (
              
              <div className="friends-page-content-card" >
              <div className="friends-page-content-card-image">
              {friend.owner_avatar_link !== null ? (
                <>
                  <img src={friend.owner_avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
              </div>
              <div className="friends-page-content-content">
                <div className="friends-page-content-informations">
                    <div className="friends-page-content-username">{friend.owner_username}</div>
                  <div className="friends-page-content-small-friendlist">
                  {friend.users.length > 0 ?
                      <>
                        <div className="friends-page-content-small-friendlist-avatars-container">
                     
                
                     {friend.users[0] && friend.users[0].avatar_link !== null ? (
                           <div onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar first" id={`friend-${friend.owner_id}-first`}>
                              <ModalLittlePerson order="first" friend={friend.users[0]} length={friend.users.length} />
                           <img src={friend.users[0].avatar_link} alt="avatarImage"></img>
                           </div>
                       ) : (
                         <div   onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar first" id={`friend-${friend.owner_id}-first`}>
                           <ModalLittlePerson order="first" friend={friend.users[0]} length={friend.users.length}/>
                           <img src={defaultProfile} alt="avatarImage"></img>
                           </div>
                 )}
                 
                     {friend.users.length > 1 ?
                     <>
                            {friend.users[1] && friend.users[1].avatar_link !== null ? (
                             <div onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar last" id={`friend-${friend.owner_id}-last`}>
                             <ModalLittlePerson order="last" friend={friend.users[1]} length={friend.users.length}/>
                                  <img src={friend.users[1].avatar_link} alt="avatarImage"></img>
                             </div>
                         ) : (
                           <div onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)} className="friends-page-content-small-friendlists-avatar last" id={`friend-${friend.owner_id}-last`}>
                             <ModalLittlePerson order="last" friend={friend.users[1]} length={friend.users.length}/>
                                    <img src={defaultProfile} alt="avatarImage"></img>
                             </div>
                         )}
                         </>
                       :
                       <></>
                     }
            
               
       
               </div>
                        <div className="friends-page-content-small-friendlist-text" onMouseEnter={(e)=>openModalnAssociatedFriendlist(e)} onMouseLeave={(e)=>closeModalnAssociatedFriendlist(e)}>
                          <ModalFriendlist friendlist={friend.users} />
                          <p>{friend.users.length} ami{friend.users.length > 1 ? <span>s</span> : <></>}&nbsp;en commun</p>
                        </div>
                      </>
                      :
                      <></>
                    }
                  
                 </div>
        
                </div>
                <div className="friends-page-content-btns">
                  <div className="friends-page-content-add-btn" onClick={alertMessage}><button>Message</button></div>
                    <div className="friends-page-content-remove-btn"  onClick={(e) => handleRemoveFromFriendlist(e)}><button id={friend.invitation}>Supprimer</button></div>
                </div>
              </div>
                </div>
            ))}
          
            </>
          :
          <div className="no-friends">Vous n'avez aucun ami pour l'instant.</div>}
        

        
        
        </div>
  )
}


export default AllFriends