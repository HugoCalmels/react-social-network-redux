import {useEffect} from 'react'
import "../../Styles/home/friendlist.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFriendList,
  getFriendListStatus,
  getCurrentUserFriendlist
} from "../../redux/features/users/usersSlice";
import Cookies from 'js-cookie';
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import Friend from "../home/Friend"
const Friendlist = () => {
  const dispatch = useDispatch()
  const friendlist = useSelector(selectFriendList);
  const friendlistStatus = useSelector(getFriendListStatus);
  const author = JSON.parse(Cookies.get('user'))

  useEffect(() => {
    dispatch(getCurrentUserFriendlist(author.id)).unwrap()
  },[])



  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log(friendlist);
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");
  console.log("@@@@@ FRIENDLIST @@@@@@@@@@");

  


  return (
    <div className="friendlist-wrapper">
      <div className="friendlist-container">
        <div className="friendlist-header">Contacts</div>
        <div className="friendlist-list">
          {friendlist !== undefined && friendlist.length > 0 ?
            <>
              {friendlist.map((el) => (
                <Friend el={el} />
                
              ))}
  
            </>
            : ''}
              
        </div>
      </div>
    </div>
  );
};

export default Friendlist;
