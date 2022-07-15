import defaultProfile from "../../assets/images/defaultProfile.jpg"
import { useSelector, useDispatch } from "react-redux";
import {
  selectFriendList,
  getFriendListStatus,
  getCurrentUserFriendlist
} from "../../redux/features/users/usersSlice";
const AllFriends = (props) => {

  const dispatch = useDispatch()
  const friendlist = useSelector(selectFriendList);


  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log(friendlist)
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  return (
    <div className="friends-page-content-wrapper all-friends">
      <div className="friends-page-content-header">{props.menuSelected}</div>
      
      <div className="friends-page-content-grid">

        {friendlist.length > 0 ?
          <>
            {friendlist.map((friend) => (
              <div className="friends-page-content-card">
              <div className="friends-page-content-card-image">
              {friend.friend.avatar_link !== null ? (
                <>
                  <img src={friend.friend.avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
              </div>
              <div className="friends-page-content-content">
                <div className="friends-page-content-informations">
                    <div className="friends-page-content-username">{friend.friend.username}</div>
                  <div className="friends-page-content-small-friendlist">X X X</div>
                </div>
                <div className="friends-page-content-btns">
                  <div className="friends-page-content-add-btn"><button>Ajouter</button></div>
                  <div className="friends-page-content-remove-btn"><button>Supprimer</button></div>
                </div>
              </div>
                </div>
            ))}
          
            </>
          :
          'you dont have any friends lmao'}
        

        
        
        </div>

    </div>
  )
}

export default AllFriends