import {useEffect} from 'react'
import "../../Styles/home/friendlist.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFriendList,
  getFriendListStatus,
  getCurrentUserFriendlist,
  selectCurrentUser
} from "../../redux/features/users/usersSlice";
import Cookies from 'js-cookie';
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import Friend from "../home/Friend"
const Friendlist = () => {
  const dispatch = useDispatch()
  const friendlist = useSelector(selectFriendList);
  const friendlistStatus = useSelector(getFriendListStatus);
  const author = JSON.parse(Cookies.get('user'))
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    dispatch(getCurrentUserFriendlist(author.id)).unwrap()
  },[])


  let filteredFriendlist = friendlist.filter((friend) => {


    return (currentUser.last_seen - 30) < friend.friend.last_seen
 
 
  })

  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log(friendlist)
  console.log(filteredFriendlist);
  console.log(currentUser)
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");


 

  


  return (
    <div className="friendlist-wrapper">
      <div className="friendlist-container">
        <div className="friendlist-header">Contacts</div>
        <div className="friendlist-list">
          {filteredFriendlist !== undefined && filteredFriendlist.length > 0 ?
            <>
              {filteredFriendlist.map((el) => (
                <Friend el={el} />
                
              ))}
  
            </>
            :
            <>
              {currentUser.friendships !== undefined && currentUser.friendships.length === 0 ?
                <p className="friendlist-list-nofriends">Vous n'avez aucun ami pour l'instant.</p>
                :
                <p className="friendlist-list-nofriends">Aucun contact en ligne au cours des 30 dernières minutes.</p>
              }  
            
            </>
            }
                    
        </div>
      </div>
    </div>
  );
};

export default Friendlist;
