import "../../Styles/friends/friends-content.scss"
import defaultProfile from "../../assets/images/defaultProfile.jpg"
import AllFriends from "./AllFriends"
const FriendsPageContent = (props) => {
  return (
    <>
      <AllFriends menuSelected={props.menuSelected} setMenuSelected={props.setMenuSelected}/>
    </>
  )
}

export default FriendsPageContent