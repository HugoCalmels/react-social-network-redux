import { useEffect } from "react";
import "../../Styles/home/friendlist.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFriendList,
  getCurrentUserFriendlist,
  selectCurrentUser,
  getCurrentUserNavbarStatus
} from "../../redux/features/users/usersSlice";
import Cookies from "js-cookie";

import Friend from "../home/Friend";
const Friendlist = () => {
  const dispatch = useDispatch();
  const friendlist = useSelector(selectFriendList);
  const invitationsStatus = useSelector(getCurrentUserNavbarStatus)
  const author = JSON.parse(Cookies.get("user"));
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    dispatch(getCurrentUserFriendlist(author.id)).unwrap();
  }, []);

  useEffect(() => {
    if (invitationsStatus === "succeeded") {
      dispatch(getCurrentUserFriendlist(author.id)).unwrap();
    }
  },[invitationsStatus])

  let filteredFriendlist = friendlist.filter((friend) => {
    return currentUser.last_seen - 30 < friend.friend.last_seen;
  });

  return (
    <div className="friendlist-wrapper">
      <div className="friendlist-container">
        <div className="friendlist-header">Contacts</div>
        <div className="friendlist-list">
          {filteredFriendlist !== undefined && filteredFriendlist.length > 0 ? (
            <>
              {filteredFriendlist.map((el, index) => (
                <Friend el={el} key={index} />
              ))}
            </>
          ) : (
            <>
              {currentUser.friendships !== undefined &&
              currentUser.friendships.length === 0 ? (
                <p className="friendlist-list-nofriends">
                  Vous n'avez aucun ami pour l'instant.
                </p>
              ) : (
                <p className="friendlist-list-nofriends">
                  Aucun contact en ligne au cours des 30 dernières minutes.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friendlist;
