import { useEffect } from "react";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  addSomeoneToFriendList,
  getCurrentUserSuggestions,
  selectCurrentUserSuggestions,
  selectCurrentUser,
  getinvitationsStatus,
  getCurrentUser,
} from "../../redux/features/users/usersSlice";
import Cookies from "js-cookie";
import ModalLittlePerson from "./ModalLittlePerson";
import ModalFriendlist from "./ModalFriendlist";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);

  const suggestionsList = useSelector(selectCurrentUserSuggestions);

  const invitationStatus = useSelector(getinvitationsStatus);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUserSuggestions()).unwrap();
  }, []);

  useEffect(() => {
    dispatch(getCurrentUserSuggestions()).unwrap();
    dispatch(getCurrentUser()).unwrap();
  }, [invitationStatus]);

  const addToFriendsList = (e) => {
    e.preventDefault();

    try {
      dispatch(
        addSomeoneToFriendList({
          user_id: cookieUserInfos.id,
          receiver_id: e.currentTarget.id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSuggestion = () => {
    alert("Fonctionnalité en développement ..");
  };

  let filteredSuggestionList = "";
  if (currentUser !== undefined) {
    let usersIds = currentUser.sent_invitations.map((el) => el.receiver_id);
    filteredSuggestionList = suggestionsList.filter(
      (suggestion) => !usersIds.includes(suggestion.owner_id)
    );
  }

  const openModalnAssociated = (e) => {
    let test = e.currentTarget.querySelector(".modal-little-person-container");
    test.style.display = "flex";
  };

  const closeModalnAssociated = (e) => {
    let test = e.currentTarget.querySelector(".modal-little-person-container");

    test.style.display = "none";
  };

  const openModalnAssociatedFriendlist = (e) => {
    e.stopPropagation();

    let test = e.currentTarget.querySelector(".modal-friendlist-container");

    test.style.display = "flex";
  };

  const closeModalnAssociatedFriendlist = (e) => {
    e.stopPropagation();

    let test = e.currentTarget.querySelector(".modal-friendlist-container");

    test.style.display = "none";
  };

  const navigateToUsernamesProfile = (username) => {
    navigate(`/${username}`);
  };

  return (
    <div className="friends-page-content-grid suggestions">
      {filteredSuggestionList.length > 0 ? (
        <>
          {filteredSuggestionList.map((suggestion) => (
            <div className="friends-page-content-card">
              <div className="friends-page-content-card-image">
                {suggestion.owner_avatar_link !== null ? (
                  <>
                    <img
                      src={suggestion.owner_avatar_link}
                      alt="avatarImage"
                      onClick={(e) =>
                        navigateToUsernamesProfile(suggestion.owner_username)
                      }
                      key={suggestion.owner_id}
                    ></img>
                  </>
                ) : (
                  <>
                    <img
                      src={defaultProfile}
                      alt="avatarImage"
                      onClick={(e) =>
                        navigateToUsernamesProfile(suggestion.owner_username)
                      }
                    ></img>
                  </>
                )}
              </div>
              <div className="friends-page-content-content">
                <div className="friends-page-content-informations">
                  <div
                    className="friends-page-content-username"
                    onClick={(e) =>
                      navigateToUsernamesProfile(suggestion.owner_username)
                    }
                  >
                    {suggestion.owner_username}
                  </div>
                  <div className="friends-page-content-small-friendlist">
                    {suggestion.users.length > 0 ? (
                      <>
                        <div className="friends-page-content-small-friendlist-avatars-container">
                          {suggestion.users[0] &&
                          suggestion.users[0].avatar_link !== null ? (
                            <div
       
                              className="friends-page-content-small-friendlists-avatar first"
                              id={`friend-${suggestion.owner_id}-first`}
                            >
                              <ModalLittlePerson
                                order="first"
                                friend={suggestion.users[0]}
                                length={suggestion.users.length}
                              />
                              <img
                                src={suggestion.users[0].avatar_link}
                                alt="avatarImage"
                              ></img>
                            </div>
                          ) : (
                            <div
                              onMouseEnter={(e) => openModalnAssociated(e)}
                              onMouseLeave={(e) => closeModalnAssociated(e)}
                              className="friends-page-content-small-friendlists-avatar first"
                              id={`friend-${suggestion.owner_id}-first`}
                            >
                              <ModalLittlePerson
                                order="first"
                                friend={suggestion.users[0]}
                                length={suggestion.users.length}
                              />
                              <img src={defaultProfile} alt="avatarImage"></img>
                            </div>
                          )}

                          {suggestion.users.length > 1 ? (
                            <>
                              {suggestion.users[1] &&
                              suggestion.users[1].avatar_link !== null ? (
                                <div
                                  onMouseEnter={(e) => openModalnAssociated(e)}
                                  onMouseLeave={(e) => closeModalnAssociated(e)}
                                  className="friends-page-content-small-friendlists-avatar last"
                                  id={`friend-${suggestion.owner_id}-last`}
                                >
                                  <ModalLittlePerson
                                    order="last"
                                    friend={suggestion.users[1]}
                                    length={suggestion.users.length}
                                  />
                                  <img
                                    src={suggestion.users[1].avatar_link}
                                    alt="avatarImage"
                                  ></img>
                                </div>
                              ) : (
                                <div
                                  onMouseEnter={(e) => openModalnAssociated(e)}
                                  onMouseLeave={(e) => closeModalnAssociated(e)}
                                  className="friends-page-content-small-friendlists-avatar last"
                                  id={`friend-${suggestion.owner_id}-last`}
                                >
                                  <ModalLittlePerson
                                    order="last"
                                    friend={suggestion.users[1]}
                                    length={suggestion.users.length}
                                  />
                                  <img
                                    src={defaultProfile}
                                    alt="avatarImage"
                                  ></img>
                                </div>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div
                          className="friends-page-content-small-friendlist-text"
                          onMouseEnter={(e) =>
                            openModalnAssociatedFriendlist(e)
                          }
                          onMouseLeave={(e) =>
                            closeModalnAssociatedFriendlist(e)
                          }
                        >
                          <ModalFriendlist friendlist={suggestion.users} />
                          <p>
                            {suggestion.users.length} ami
                            {suggestion.users.length > 1 ? (
                              <span>s</span>
                            ) : (
                              <></>
                            )}
                            &nbsp;en commun
                          </p>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="friends-page-content-btns">
                  <div
                    className="friends-page-content-add-btn"
                    id={suggestion.owner_id}
                    onClick={(e) => addToFriendsList(e)}
                  >
                    <button>Ajouter</button>
                  </div>
                  <div
                    className="friends-page-content-remove-btn"
                    onClick={deleteSuggestion}
                  >
                    <button>Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-friends">
          Vous n'avez aucune suggestion d'ami(s).
        </div>
      )}
    </div>
  );
};

export default Suggestions;
