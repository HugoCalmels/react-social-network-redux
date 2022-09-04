import "../../Styles/friends/friends-content.scss"
import defaultProfile from "../../assets/images/defaultProfile.jpg"
import FriendsContainer from "./FriendsContainer"
const FriendsPageContent = (props) => {
  return (
    <>
      <FriendsContainer menuSelected={props.menuSelected} setMenuSelected={props.setMenuSelected}/>
    </>
  )
}

export default FriendsPageContent