import defaultProfile from "../../assets/images/defaultProfile.jpg";
import ModalFriendlist from "../../components/friends/ModalFriendlist"

import { useNavigate } from "react-router-dom";
const ModalProfileFriend3 = (props) => {
  
  
  let miniModalsList = document.querySelectorAll('.modal-profile-text-modal-friendlist.profile')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

  const allModals = document.querySelectorAll('.modal-profile-text-modal-friendlist')

  allModals.forEach((el) => {
    el.style.display = "none"
  })

  
  const navigate = useNavigate()
  
  const navigateToProfile = (e) => {
    console.log(e.currentTarget.id)
    props.setBottomContent("publications")
    navigate(`/${e.currentTarget.id.split('-')[0]}`)
  }

  const navigateToProfile2 = (e) => {
    console.log(e.currentTarget.name)
    props.setBottomContent("publications")
    navigate(`/${e.currentTarget.name}`)
  }


  //let modalsList = document.querySelectorAll('.')


  const openUserFriendlistModal = (e) => {
    const modalElem = document.querySelector(`.modal-profile-text-modal-friendlist.friends.id-${e.target.id.split('-')[1]}`)
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log(e.target.id)
    console.log(modalElem)
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')

 
   

    if (modalElem !== null) {
    modalElem.style.display ="flex"
    }
    
    if (modalElem === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none"
      })
    }
    /*
    console.log(e.currentTarget)
    console.log(e.target)
    console.log('AAAAAAAAAAAAAAA')
    let res = e.currentTarget.querySelector('.modal-profile-text-modal-friendlist')
    let res2 = e.target.querySelector('.modal-profile-text-modal-friendlist')
    console.log(res)
    console.log(res2)
    console.log('AAAAAAAAAAAAAAA')
    res.style.display ="flex"
    */
  }

  const closeUserFriendlistModal = (e) => {

    const modalElem = document.querySelector(`.modal-profile-text-modal-friendlist.friends.id-${e.target.id.split('-')[1]}`)
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log(e.target.id)
    console.log(modalElem)
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    console.log('AAAAAAAAAAAAAAA')
    if (modalElem !== null) {
      modalElem.style.display ="none"

    }

    if (modalElem === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none"
      })
    }


    /*
    console.log(e.currentTarget)
    console.log(e.target)
    console.log('AAAAAAAAAAAAAAA')
    let res = e.currentTarget.querySelector('.modal-profile-text-modal-friendlist')
    let res2 = e.target.querySelector('.modal-profile-text-modal-friendlist')
    console.log(res)
    console.log(res2)
    console.log('AAAAAAAAAAAAAAA')
    res.style.display ="flex"
    */
  }



  return (
    <div className={`modal-profile-friend friends  id-${props.friend.owner_id}`}>
      <div className="modal-profile-avatar-container">
        {props.friend.owner_avatar_link !== null ? (
                <>
                  <img id="modal-profile-avatar-img" name={props.friend.owner_username} onClick={(e) => navigateToProfile2(e)} src={props.friend.owner_avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img id="modal-profile-avatar-img"name={props.friend.owner_username}  onClick={(e) => navigateToProfile2(e)} src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
      </div>
      <div className="modal-profile-text" >
        <h4 id={props.friend.owner_username}onClick={(e) => navigateToProfile(e)}>{props.friend.owner_username}</h4>
       
          {props.friend.users.length == 1 ?
                 <>
            <p id={props.friend.owner_username} onMouseLeave={(e) => closeUserFriendlistModal(e)} onMouseEnter={(e) => openUserFriendlistModal(e)} >{props.friend.users.length} amis en commun
            <div className={`modal-profile-text-modal-friendlist friends id-${props.friend.owner_id}`} id={props.friend.owner_id} >
            {props.friend.users.map((user) => (
              <div    className="modal-profile-text-modal-user"id={user.username} onClick={(e) => navigateToProfile(e)}>{user.username}</div>
                  ))}
              </div>
            </p>
              
          </>
            : props.friend.users.length > 1 ?
            <>
              <p id={props.friend.owner_username +"-"+ props.friend.owner_id} onMouseLeave={(e) => closeUserFriendlistModal(e)} onMouseEnter={(e) => openUserFriendlistModal(e)} >{props.friend.users.length} ami en commun
              <div className={`modal-profile-text-modal-friendlist friends id-${props.friend.owner_id}`} id={props.friend.owner_id} >
            {props.friend.users.map((user) => (
              <div id={user.username} className="modal-profile-text-modal-user" onClick={(e) => navigateToProfile(e)}>{user.username}</div>
                  ))}
              </div>
              </p>
        
              </>
            :
            <></>
            }

       

      </div>
    </div>
  )
}

export default ModalProfileFriend3