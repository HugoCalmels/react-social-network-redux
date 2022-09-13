import { useState, useEffect } from "react";
import searchIcon from "../../../../assets/icons/searchIcon.png";
import dotsMenuIcon from "../../../../assets/icons/dotsMenuIcon.png";
import defaultProfile from "../../../../assets/images/defaultProfile.jpg";
import crossIcon from "../../../../assets/icons/crossIcon.png";
import { removeSomeoneFromFriendlist } from "../../../../redux/features/users/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProfileFriendsContent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oneModalIsOpened, setOneModalIsOpened] = useState(false);

  const [searchedInput, setSearchedInput] = useState("");

  useEffect(() => {
    document.addEventListener("click", (e) => {
      let allModalsElements = document.querySelectorAll(
        ".modal-profile-friend.friends"
      );
      const pbcModalsElements = document.querySelectorAll(
        ".option-remove-modal-container"
      );
      const btnModalElements = document.querySelectorAll(
        ".btn-option-remove-elem"
      );
      e.preventDefault();

      let id = e.target.id.split("-")[1];
      let foundModal = document.querySelector(
        `.option-remove-modal-container.id${id}`
      );

      if (e.target.id === "pbc-modal") {
      }

      if (e.target.id === "") {
        pbcModalsElements.forEach((el) => {
          el.style.display = "none";
        });
        btnModalElements.forEach((el) => {
          el.style.backgroundColor = "white";
        });
      }

      if (e.target.id.split("-")[0] === "pbcBtn") {
        pbcModalsElements.forEach((el) => {
          el.style.display = "none";
        });

        allModalsElements.forEach((el) => {
          el.style.display = "none";
        });

        if (oneModalIsOpened === false && foundModal.style.display === "none") {
          openFriendModal(e);

          setOneModalIsOpened(true);
        } else if (oneModalIsOpened === true) {
          pbcModalsElements.forEach((el) => {
            el.style.display = "none";
          });

          setOneModalIsOpened(false);
          closeFriendModal(e);
        }
      }
    });
  }, []);

  useEffect(() => {}, [dispatch]);

  const openFriendModal = (e) => {
    let id = e.target.id.split("-")[1];
    let foundModal = document.querySelector(
      `.option-remove-modal-container.id${id}`
    );
    let btn = document.querySelector(`.btn-option-remove-elem.id${id}`);
    btn.style.backgroundColor = "rgba(0, 0, 0, 0.075)";
    foundModal.style.display = "flex";
  };

  const closeFriendModal = (e) => {
    let id = e.target.id.split("-")[1];
    let foundModal = document.querySelector(
      `.option-remove-modal-container.id${id}`
    );
    let btn = document.querySelector(`.btn-option-remove-elem.id${id}`);
    btn.style.backgroundColor = "white";
    foundModal.style.display = "none";
  };

  const hoverElem = (e) => {
    if (e.target.id.split("-")[0] === "pbcBtn") {
      let id = e.target.id.split("-")[1];
      let foundBtn = document.querySelector(`.btn-option-remove-elem.id${id}`);
      foundBtn.style.backgroundColor = "rgba(0, 0, 0, 0.075)";
    }
  };

  const unhoverElem = (e) => {
    if (e.target.id.split("-")[0] === "pbcBtn") {
      let id = e.target.id.split("-")[1];
      let foundBtn = document.querySelector(`.btn-option-remove-elem.id${id}`);
      foundBtn.style.backgroundColor = "white";
    }
  };

  let miniModalsList = document.querySelectorAll(
    ".modal-profile-text-modal-friendlist.profile"
  );

  const handleRemoveFromFriendlist = (e) => {
    e.preventDefault();
    let friendship1 = e.currentTarget.id.split(",")[0];
    let friendship2 = e.currentTarget.id.split(",")[1];

    dispatch(
      removeSomeoneFromFriendlist({
        friendship1: friendship1,
        friendship2: friendship2,
      })
    ).unwrap();
  };

  let usernameFromWindowLocation = window.location.pathname
    .split("/")
    [window.location.pathname.split("/").length - 1].slice(0);

  let filteredFriendlist = props.friendlist;

  if (searchedInput.length > 0) {
    filteredFriendlist = props.friendlist.filter((el) => {
      return el.owner_username.includes(searchedInput);
    });
  }

  const navigateToUsernamesProfile = (username) => {
    window.scrollTo({ top: 0, left: 0 })
    props.setBottomContent("publications");
    navigate(`/${username}`);
  };

  const openFriendlistAssociatedModal = (id) => {
    let modal = document.querySelector(`.pbc-friendlist-container.id${id}`);
    modal.style.display = "flex";
  };

  const closeFriendlistAssociatedModal = (id) => {
    let modal = document.querySelector(`.pbc-friendlist-container.id${id}`);
    modal.style.display = "none";
  };

  return (
    <>
      <div className="profile-friends-component-overlay"></div>
      <div className="pbc-wrapper">
        <div className="profile-bottom-content-friends-content">
          <div className="pbc-searchbar">
            <input
              type="text"
              placeholder="Rechercher"
              onChange={(e) => setSearchedInput(e.target.value)}
            ></input>
            <img id="profile-img-searchbar" src={searchIcon}></img>
          </div>
          <div className="pbc-header">Amis</div>

          <div className="pbc-grid">
            {filteredFriendlist.map((friend,index) => (
              <div className="pbc-friend" key={index}>
                <div className="pbc-friend-avatar">
                  {friend.owner_avatar_link !== null ? (
                    <>
                      <img
                        src={friend.owner_avatar_link}
                        alt="avatarImage"
                        onClick={() =>
                          navigateToUsernamesProfile(friend.owner_username)
                        }
                      ></img>
                    </>
                  ) : (
                    <>
                      <img
                        src={defaultProfile}
                        alt="avatarImage"
                        onClick={() =>
                          navigateToUsernamesProfile(friend.owner_username)
                        }
                      ></img>
                    </>
                  )}
                </div>
                <div className="pbc-friend-infos">
                  <div className="pbc-friend-username">
                    <h4
                      onClick={() =>
                        navigateToUsernamesProfile(friend.owner_username)
                      }
                    >
                      {friend.owner_username}
                    </h4>
                  </div>

                  {friend.users.length === 0 ? (
                    <p className="modal-profile-empty">Aucun ami en commmun</p>
                  ) : friend.users.length === 1 ? (
                    <div className="pbc-friend-friendlist-trigger">
                      <p
                        onMouseEnter={() =>
                          openFriendlistAssociatedModal(friend.id)
                        }
                        onMouseLeave={() =>
                          closeFriendlistAssociatedModal(friend.id)
                        }
                      >
                        {friend.users.length} ami en commun
                        <div
                          className={`pbc-friendlist-container id${friend.id}`}
                        >
                          {friend.users.map((friend,index) => (
                            <div
                              id="modal"
                              className="pbc-friendlist-friend"
                              onClick={() =>
                                navigateToUsernamesProfile(friend.username)
                              }
                              key={index}
                            >
                              {friend.username}
                            </div>
                          ))}
                        </div>
                      </p>
                    </div>
                  ) : friend.users.length > 1 ? (
                    <div className="pbc-friend-friendlist-trigger">
                      <p
                        onMouseEnter={() =>
                          openFriendlistAssociatedModal(friend.id)
                        }
                        onMouseLeave={() =>
                          closeFriendlistAssociatedModal(friend.id)
                        }
                      >
                        {friend.users.length} amis en commun
                        <div
                          className={`pbc-friendlist-container id${friend.id}`}
                        >
                          {friend.users.map((friend,index) => (
                            <div
                              id="modal"
                              className="pbc-friendlist-friend"
                              onClick={() =>
                                navigateToUsernamesProfile(friend.username)
                              }key={index}
                            >
                              {friend.username}
                            </div>
                          ))}
                        </div>
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {usernameFromWindowLocation === props.currentUser.username ? (
                  <div
                    className="pbc-friend-options"
                    id={`pbcFriend-${friend.owner_id}`}
                  >
                    <div
                      className={`btn-option-remove-elem id${friend.owner_id}`}
                      id={`pbcBtn-${friend.owner_id}`}
                      onMouseEnter={(e) => hoverElem(e)}
                      onMouseLeave={(e) => unhoverElem(e)}
                    >
                      <div
                        className={`option-remove-modal-container id${friend.owner_id}`}
                        id="pbc-modal"
                      >
                        <div
                          className="pbc-option remove"
                          id={friend.invitation}
                          onClick={(e) => handleRemoveFromFriendlist(e)}
                        >
                          <div className="pbc-option-icon remove">
                            <img src={crossIcon} />
                          </div>
                          <div className="pbc-option-text">
                            Retirer des amis
                          </div>
                        </div>
                      </div>
                      <img
                        src={dotsMenuIcon}
                        id={`pbcBtn-${friend.owner_id}`}
                      ></img>
                    </div>

                    <div className="pbc-friend-option remove"></div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileFriendsContent;
