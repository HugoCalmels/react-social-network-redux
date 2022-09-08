import AllFriends from "./AllFriends";
import Suggestions from "./Suggestions";
import Invitations from "./Invitations";
const FriendsContainer = (props) => {
  let content = () => {
    if (props.menuSelected === "all-friends") {
      return <AllFriends />;
    } else if (props.menuSelected === "suggestions") {
      return <Suggestions />;
    } else if (props.menuSelected === "invitations") {
      return <Invitations />;
    }
  };

  const capitalize = (e) => {
    return e[0].toUpperCase() + e.slice(1).toLowerCase();
  };

  const menuSelectedContent = (headerText) => {
    if (headerText === "all-friends") {
      return "Tous les amis";
    } else {
      return capitalize(headerText);
    }
  };

  return (
    <div className="friends-page-content-wrapper all-friends">
      <div className="friends-page-content-header">
        {menuSelectedContent(props.menuSelected)}
      </div>

      {content()}
    </div>
  );
};

export default FriendsContainer;
