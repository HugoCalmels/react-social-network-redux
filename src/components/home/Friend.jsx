import defaultProfile from "../../assets/images/defaultProfile.jpg";
import { useNavigate } from "react-router-dom";
const Friend = (props) => {
  const navigate = useNavigate();

  const navigateToProfile = (e) => {
    navigate(`/${e.currentTarget.id}`);
  };

  return (
    <>
      <div
        id={props.el.friend.username}
        className="friendlist-friend"
        onClick={(e) => navigateToProfile(e)}
      >
        <div className="friendlist-friend-avatar">
          {props.el.friend.avatar_link !== null ? (
            <>
              <img src={props.el.friend.avatar_link} alt="avatarImage"></img>

              <div className="friendlist-friend-lastseen-container">
                <div className="friendlist-friend-lastseen"></div>
              </div>
            </>
          ) : (
            <>
              <img src={defaultProfile} alt="avatarImage"></img>
              <div className="friendlist-friend-lastseen-container">
                <div className="friendlist-friend-lastseen"></div>
              </div>
            </>
          )}
        </div>
        <div className="friendlist-friend-username">
          {props.el.friend.username}
        </div>
      </div>
    </>
  );
};

export default Friend;
