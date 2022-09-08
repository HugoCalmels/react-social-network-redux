import "../../Styles/friends/friends-content.scss";
import FriendsContainer from "./FriendsContainer";
const FriendsPageContent = (props) => {
  return (
    <>
      <FriendsContainer
        menuSelected={props.menuSelected}
        setMenuSelected={props.setMenuSelected}
      />
    </>
  );
};

export default FriendsPageContent;
