import defaultProfile from "../../../../assets/images/defaultProfile.jpg";
const BottomLeftProfileFriends = (props) => {
  return (
    <div className="profile-friends-container">
      <div className="profile-friends-header">
        <div className="profile-friends-header-top">
          <div className="profile-friends-header-title">Amis</div>
          <div
            className="profile-friends-header-right"
            onClick={(e) => props.setBottomContent("amis")}
          >
            Tous les amis
          </div>
        </div>
        <div className="profile-friends-header-nbfriends">
          {props.selectedUserWithCM.length} amis
        </div>
      </div>
      <div className="profile-friends-content">
        {props.selectedFilteredFriendlist.map((friend,index) => (
    
            <div className="profile-friend-unit" key={index}>
              <div className="profile-friend-wrapper">
                {friend.owner_avatar_link === null ||
                friend.owner_avatar_link === "" ? (
                  <>
                    <img
                      onClick={() =>
                        props.navigateToUsernamesProfile(friend.owner_username)
                      }
                        src={defaultProfile}
                        alt={friend.owner_username}
                    />
                  </>
                ) : (
                  <>
                    <img
                      onClick={() =>
                        props.navigateToUsernamesProfile(friend.owner_username)
                      }
                        src={friend.owner_avatar_link}
                        alt={friend.owner_username}
                    />
                  </>
                )}
                <span
                  onClick={() =>
                    props.navigateToUsernamesProfile(friend.owner_username)
                  }
                >
                  {friend.owner_username}
                </span>
              </div>
            </div>
        
        ))}
      </div>
    </div>
  );
};

export default BottomLeftProfileFriends;
