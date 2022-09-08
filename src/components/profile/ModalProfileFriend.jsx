import defaultProfile from "../../assets/images/defaultProfile.jpg";

import { useNavigate } from "react-router-dom";
const ModalProfileFriend = (props) => {
  const allModalsContainers = document.querySelectorAll(
    ".pbc-friendlist-container"
  );
  const allModals = document.querySelectorAll(
    ".modal-profile-text-modal-friendlist"
  );
  allModals.forEach((el) => {
    el.style.display = "none";
  });
  allModalsContainers.forEach((el) => {
    el.style.display = "none";
  });

  const navigate = useNavigate();
  const navigateToProfile = (e) => {
    props.setBottomContent('publications')
    navigate(`/${e.currentTarget.id.split("-")[0]}`);
  };

  const navigateToProfile2 = (e) => {
    console.log(e.currentTarget.name);
    navigate(`/${e.currentTarget.name}`);
  };

  const openUserFriendlistModal = (e) => {
    const modalElem = document.querySelector(
      `.modal-profile-text-modal-friendlist.id-${e.target.id.split("-")[1]}`
    );
    modalElem.style.display = "flex";
  };

  const closeUserFriendlistModal = (e) => {
    const modalElem = document.querySelector(
      `.modal-profile-text-modal-friendlist.id-${e.target.id.split("-")[1]}`
    );
    allModalsContainers.forEach((el) => {
      el.style.display = "none";
    });
    allModals.forEach((el) => {
      el.style.display = "none";
    });
  };

  return (
    <div className={`modal-profile-friend  id-${props.friend.owner_id}`}>
      <div className="modal-profile-avatar-container">
        {props.friend.owner_avatar_link !== null ? (
          <>
            <img
              id="modal-profile-avatar-img"
              name={props.friend.owner_username}
              onClick={(e) => navigateToProfile2(e)}
              src={props.friend.owner_avatar_link}
              alt="avatarImage"
            ></img>
          </>
        ) : (
          <>
            <img
              id="modal-profile-avatar-img"
              name={props.friend.owner_username}
              onClick={(e) => navigateToProfile2(e)}
              src={defaultProfile}
              alt="avatarImage"
            ></img>
          </>
        )}
      </div>
      <div className="modal-profile-text">
        <h4
          id={props.friend.owner_username}
          onClick={(e) => navigateToProfile(e)}
        >
          {props.friend.owner_username}
        </h4>

        {props.friend.users.length == 1 ? (
          <>
            <p
              id={props.friend.owner_username + "-" + props.friend.owner_id}
              onMouseLeave={(e) => closeUserFriendlistModal(e)}
              onMouseEnter={(e) => openUserFriendlistModal(e)}
            >
              {props.friend.users.length} amis en commun
              <div
                className={`modal-profile-text-modal-friendlist id-${props.friend.owner_id}`}
                id={props.friend.owner_id}
              >
                {props.friend.users.map((user,index) => (
                  <div
                    id={user.username}
                    className="modal-profile-text-modal-user"
                    onClick={(e) => navigateToProfile(e)}
                    key={index}
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            </p>
          </>
        ) : props.friend.users.length > 1 ? (
          <>
            <p
              id={props.friend.owner_username + "-" + props.friend.owner_id}
              onMouseLeave={(e) => closeUserFriendlistModal(e)}
              onMouseEnter={(e) => openUserFriendlistModal(e)}
            >
              {props.friend.users.length} ami en commun
              <div
                className={`modal-profile-text-modal-friendlist id-${props.friend.owner_id}`}
                id={props.friend.owner_id}
              >
                {props.friend.users.map((user,index) => (
                  <div
                    id={user.username}
                    className="modal-profile-text-modal-user"
                    onClick={(e) => navigateToProfile(e)}
                    key={index}
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            </p>
          </>
        ) : props.friend.users.length === 0 ? (
          <p className="modal-profile-empty">Aucun ami en commmun</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ModalProfileFriend;
