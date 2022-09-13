import React, { Suspense, lazy } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileUser } from "../../../redux/features/profile/profileSlice";
import {
  removeSomeoneFromFriendlist,
  selectCurrentUser,
} from "../../../redux/features/users/usersSlice";

import TopProfileHero from "./components/TopProfileHero"
import TopProfileMiddleOptions from "./components/TopProfileMiddleOptions"
import TopProfileNavigation from "./components/TopProfileNavigation"



const TopProfile = (props) => {
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);
  const foundUser = useSelector(selectProfileUser);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  let friendship1;
  let isAlreadyFriend = false;
  if (
    currentUser.friendships &&
    currentUser.friendships.find((friend) => friend.friend_id === foundUser.id)
  ) {
    isAlreadyFriend = true;
    friendship1 = currentUser.friendships.find(
      (friend) => friend.friend_id === foundUser.id
    );
  }

  let friendship2;
  if (foundUser && foundUser.id) {
    friendship2 = foundUser.friendships.find(
      (friend) => friend.friend_id === cookieUserInfos.id
    );
  }
  const handleRemoveFromFriendlist = (e) => {
    dispatch(
      removeSomeoneFromFriendlist({
        friendship1: friendship1.id,
        friendship2: friendship2.id,
      })
    ).unwrap();
  };

  return (
    <div className="profile-top">

        <TopProfileHero foundUser={foundUser} bottomContent={props.bottomContent}/>

      

        
        <TopProfileMiddleOptions
          foundUser={foundUser}
          isAlreadyFriend={isAlreadyFriend}
          handleRemoveFromFriendlist={handleRemoveFromFriendlist}
          friendship1={friendship1}
          friendship2={friendship2}
          currentUser={currentUser}
          setBottomContent={props.setBottomContent}
        />



        <TopProfileNavigation setBottomContent={props.setBottomContent} />
  
    </div>
  );
};

export default TopProfile;
