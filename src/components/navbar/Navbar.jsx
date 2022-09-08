// react
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  logout,
  getUserErrorStatus,
} from "../../redux/features/auth/authSlice";
import { getUserPostImages } from "../../redux/features/images/imagesSlice";
// others

import Cookies from "js-cookie";
import { useEffect } from "react";
import {
  getAllUsernames,
  selectCurrentUserInvitationsList,
  getCurrentUserInvitationsList,
  getCurrentUser,
  getCurrentUserFriendlist,
  getCurrentUserNavbarStatus,
  selectFriendList,
  selectCurrentUser,
  sendInvitationConfirmation,
  refuseInvitation,
  markInvitationAsSeen,
  selectAllUsernamesList,
  updateCurrentUserLastSeen,
} from "../../redux/features/users/usersSlice";
import "../../Styles/navbar/index.scss";
import messengerIcon from "../../assets/icons/messengerIcon.png";
import bellIcon from "../../assets/icons/bellIcon.png";
import blueUsersIcon from "../../assets/icons/blueUsersIcon.png";
import blueHouse from "../../assets/icons/blueHouse.png";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import clonebookIcon from "../../assets/svgs/clonebookIcon.svg";
import searchIcon from "../../assets/icons/searchIcon.png";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.png";
import clockIcon from "../../assets/icons/clockIcon.png";
import crossIcon from "../../assets/icons/crossIcon.png";
import doorIcon from "../../assets/icons/doorIcon.png";
import houseIconGray from "../../assets/icons/houseIconGray.png";
import usersGroupGray from "../../assets/icons/usersGroupGray.png";
import { refreshComp } from "../../redux/features/profile/profileSlice";
import hamburgerMenuIcon from "../../assets/icons/hamburgerMenuIcon.png";

const Navbar = (props) => {
  const date = new Date();

  let timeMinutes = date.getMinutes();
  let timeHours = date.getHours();
  let timeDays = date.getDate();

  let timeInMinutesSinceStartOfThisMonth =
    timeMinutes + timeHours * 60 + (timeDays - 1) * 24 * 60;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getUserErrorStatus);
  let currentPage34 = null || error;
  // declrations des états
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsFromFriendlist, setSearchResultsFromFriendlist] =
    useState([]);
  const [searchedForCurrentUser, setSearchedForCurrentUser] = useState(false);
  const [inputLengthEqualToZero, setInputLengthEqualToZero] = useState(true);
  const [arrayOfResearches, setArrayOfResearches] = useState(
    JSON.parse(localStorage.getItem("researches")) || []
  );

  // déclarations DOM
  const hiddenNotifsModal = document.querySelector(
    ".hidden-notifications-modal"
  );
  const middleNavbarOptions = document.querySelectorAll(
    ".navbar-navigation-option"
  );
  // déclarations des variables
  const cookieAuth = Cookies.get("isAuth");
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);
  // déclarations de redux

  const usernamesList = useSelector(selectAllUsernamesList);

  const currentUser = useSelector(selectCurrentUser);
  const currentUserInvitationsList = useSelector(
    selectCurrentUserInvitationsList
  );
  const currentUserNavbarStatus = useSelector(getCurrentUserNavbarStatus);
  const friendlist = useSelector(selectFriendList);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCurrentUserInvitationsList());
    dispatch(getAllUsernames());
    dispatch(getCurrentUserFriendlist(cookieUserInfos.id)).unwrap();
    dispatch(
      updateCurrentUserLastSeen(timeInMinutesSinceStartOfThisMonth)
    ).unwrap();
    if (currentPage34 !== null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCurrentUserInvitationsList());
  }, [currentUserNavbarStatus]);

  // ******* FONCTIONS ***********

  const makeLoggout = () => {

    dispatch(logout());
    navigate("/");
  };

  // At this point I need a list ( with redux ) for all users that invited me.

  let invitsNotSeen = [];
  invitsNotSeen = currentUserInvitationsList.filter((invit) => {
    if (invit.sender_id !== cookieUserInfos.id) {
      return invit.seen === false;
    }
  });

  const openModalNotifications = () => {
    if (hiddenNotifsModal !== null) {
      if (hiddenNotifsModal.classList.contains("active")) {
        hiddenNotifsModal.classList.remove("active");
        mainOverlayElem2.style.display = "none";
      } else {
        hiddenNotifsModal.classList.toggle("active");
        mainOverlayElem2.style.display = "block";
        // mark invitations as "seen", whenever the modal is opened

        if (invitsNotSeen.length > 0) {
          invitsNotSeen.forEach((invit) => {
            dispatch(markInvitationAsSeen(invit.id)).unwrap();
          });
        }
      }
    }
  };

  const confirmInvitation = (e) => {
    e.preventDefault();
    try {
      dispatch(
        sendInvitationConfirmation({
          invit_id: e.currentTarget.id.split(",")[0],
          user_id: cookieUserInfos.id,
          friend_id: e.currentTarget.id.split(",")[1],
        })
      ).unwrap();
    } catch (e) {}
  };

  const handleRefuseInvitation = (e) => {
    try {
      dispatch(refuseInvitation(e.currentTarget.id));
    } catch (e) {
      console.log(e);
    }
  };

  let nbNotifsDiv = document.querySelector(".navbar-notifications-nb-messages");

  if (nbNotifsDiv !== null && invitsNotSeen.length > 0) {
    nbNotifsDiv.style.display = "flex";
  } else if (nbNotifsDiv !== null) {
    nbNotifsDiv.style.display = "none";
  }

  const searchForUsers = (e) => {
    e.preventDefault();
    let input = e.target.value.toLowerCase();

    let res = usernamesList.filter((el) => {
      if (el !== currentUser.username) return el.toLowerCase().includes(input);
    });
    let res2 = friendlist.filter((el) => {
      return el.friend.username.toLowerCase().includes(input);
    });
    let resBis = res.filter((el1) => {
      if (res2.length > 0) {
        res2.filter((el2) => {
          if (el1 !== el2.friend.username) {
            return el1;
          }
        });
      } else {
        return el1;
      }
    });

    if (currentUser.username.includes(input)) {
      setSearchedForCurrentUser(true);
    } else {
      setSearchedForCurrentUser(false);
    }

    if (input.length > 0) {
      setSearchResults(resBis);
      setSearchResultsFromFriendlist(res2);
      setInputLengthEqualToZero(false);
    } else {
      setSearchResults([]);
      setSearchResultsFromFriendlist([]);
      setSearchedForCurrentUser(false);
      setInputLengthEqualToZero(true);
    }
  };

  const imgSearchIconElem = document.querySelector("#img-searchbar-input");
  const inputSearchElem = document.querySelector("#input-searchbar-main");
  const mainOverlayElem = document.querySelector(".main-overlay-2");
  const mainOverlayElem2 = document.querySelector(".main-overlay-3");
  const modalSearchbarElem = document.querySelector(".searchbar-modal");
  const leftArrowIconElem = document.querySelector("#cancel-searchbar-btn");
  const clonebookIconElem = document.querySelector("#clonebook-home-icon");
  const searchBarContainer = document.querySelector(".left-navbar-container");

  const animateSearchBar = (answer) => {
    imgSearchIconElem.style.display = "none";
    inputSearchElem.style.left = "12px";
    clonebookIconElem.style.display = "none";
    leftArrowIconElem.style.display = "flex";
    openSearchbarModal();
    hiddenInput.style.display = "flex"

  };

  let hiddenInput = document.querySelector('.left-navbar-input-container')

  const animateSearchBarBackward = () => {
    imgSearchIconElem.style.display = "block";
    inputSearchElem.style.left = "40px";
    clonebookIconElem.style.display = "flex";
    leftArrowIconElem.style.display = "none";
   //let hiddenInput = document.querySelector('.left-navbar-input-container')
    //hiddenInput.style.display = "flex"

 
    if (window.matchMedia("(min-width: 900px)").matches) {
      /* La largeur minimum de l'affichage est 600 px inclus */
    } else {
      hiddenInput.style.display = "none"
    }
 
  };

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      let hiddenInput = document.querySelector('.left-navbar-input-container')
      if (e.target.innerWidth < 900) {
        hiddenInput.style.display = "none"
      } else {
        hiddenInput.style.display = "flex"
      }
    })
  },[])

  
 


  

  const closeSearchbarModal = () => {
    modalSearchbarElem.style.display = "none";
    mainOverlayElem.style.display = "none";
    searchBarContainer.classList.remove("opened");
    animateSearchBarBackward();
    //let hiddenInput = document.querySelector('.left-navbar-input-container')
    //hidden.style.display = "flex"

  };

  const openSearchbarModal = () => {

    modalSearchbarElem.style.display = "block";
    mainOverlayElem.style.display = "block";
    searchBarContainer.classList.add("opened");

  };

  const openMessenger = () => {
    alert("fonctionnalité en développement..");
  };

  const redirectToFriendPage = (e) => {
    e.preventDefault();
    navigate(`/${e.currentTarget.id}`);
    closeSearchbarModal();
    inputSearchElem.value = "";

    //arrayOfResearches.push(e.currentTarget.id)

    setArrayOfResearches(
      [...arrayOfResearches, e.currentTarget.id].filter(unique)
    );

    setSearchResults([]);
    setSearchResultsFromFriendlist([]);
    setInputLengthEqualToZero(true);
    setSearchedForCurrentUser(false);

    localStorage.setItem("researches", JSON.stringify(arrayOfResearches));
  };

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const removeFromLocalResearches = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let res = arrayOfResearches.filter((el) => {
      return el !== e.currentTarget.id;
    });

    localStorage.setItem("researches", JSON.stringify(res));
    setArrayOfResearches(res);
  };

  const navbarRightOptionSelfProfileIMG = document.querySelector(
    "#rightbar-profile-avatar-img"
  );
  const navbarRightOptionLogoutIMG = document.querySelector(
    ".rightbar-profile-logout"
  );

  const navbarRightProfileHiddenModal = document.querySelector(
    ".navbar-rightbar-profile"
  );

  const changeImageOpacityLogout = () => {

    navbarRightOptionLogoutIMG.style.backgroundColor = "rgba(0,0,0,0.125)";
  };

  const changeBackOpacityLogout = () => {
    navbarRightOptionLogoutIMG.style.backgroundColor = "#E4E6EB";
  };

  const triggerNavbarRightOptions = (e) => {
    e.stopPropagation();
    if (navbarRightProfileHiddenModal !== null) {
      if (navbarRightProfileHiddenModal.classList.contains("active")) {
        navbarRightProfileHiddenModal.classList.remove("active");
        mainOverlayElem2.style.display = "none";
      } else {
        navbarRightProfileHiddenModal.classList.toggle("active");
        mainOverlayElem2.style.display = "block";
        // mark invitations as "seen", whenever the modal is opened

        if (invitsNotSeen.length > 0) {
          invitsNotSeen.forEach((invit) => {
            dispatch(markInvitationAsSeen(invit.id)).unwrap();
          });
        }
      }
    }
  };

  const navigateToCurrentUserProfile = () => {
    navigate(`/${currentUser.username}`);
    navbarRightProfileHiddenModal.classList.remove("active");
    mainOverlayElem2.style.display = "none";
  };

  const closeRightbarProfileModal = () => {
    navbarRightProfileHiddenModal.classList.remove("active");
    hiddenNotifsModal.classList.remove("active");
    mainOverlayElem2.style.display = "none";
  };

  let currentPage2 = "";

  if (window.location.pathname == "/" && middleNavbarOptions.length > 0) {
    currentPage2 = "home";
    middleNavbarOptions[0].classList.add("inactive");
    middleNavbarOptions[1].classList.remove("inactive");
  } else if (
    window.location.pathname.includes("friends") &&
    middleNavbarOptions.length > 0
  ) {
    currentPage2 = "friends";
    middleNavbarOptions[1].classList.add("inactive");
    middleNavbarOptions[0].classList.remove("inactive");
  } else {
    currentPage2 = "";
  }

  const navigateToCurrentUserFriends = () => {
    navigate(`/${currentUser.username}/friends`);
  };

  const navigateToHomePage = () => {
    dispatch(refreshComp()).unwrap();
    navigate("/");
  };


  const navigateToUserFriendlist = () => {
    let cookieUser = Cookies.get("user");
  
    let cookieUserInfos = JSON.parse(cookieUser);

   navigate(`/${cookieUserInfos.name}/friends`)
  }

  let responsiveMenuElem = document.querySelector('.mnhh-responsive-menu')

  const triggerResponsiveMenu = (e) => {
    e.stopPropagation()
    responsiveMenuElem.classList.toggle('active')
  }

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="main-overlay-2" onClick={closeSearchbarModal}></div>
        <div
          className="main-overlay-3"
          onClick={closeRightbarProfileModal}
        ></div>

        <div className="left-navbar">
          <div className="left-navbar-container">
            {/*start searchbar modal*/}
            <div className="searchbar-modal">
              {inputLengthEqualToZero === true ? (
                <div className="local-researches-container">
                  {arrayOfResearches.length === 0 ? (
                    <div className="no-local-researches">
                      Aucune recherche récente
                    </div>
                  ) : (
                    <div className="researchs-inventory">
                      <div className="researchs-inventory-header">
                        Recherches récentes
                      </div>
                      {arrayOfResearches.map((research,index) => (
                        <div
                          className="local-researched"
                          onClick={(e) => redirectToFriendPage(e)}
                          id={research}
                          key={index}
                        >
                          <div className="local-researched-avatar">
                            <img src={clockIcon} alt="researched" />
                          </div>
                          <div className="local-researched-username">
                            {research}
                          </div>
                          <div
                            className="researchs-inventory-destroy-btn"
                            id={research}
                            onClick={(e) => removeFromLocalResearches(e)}
                          >
                            <img src={crossIcon} alt="destroy local research" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="searchbar-modal-friendlist-finder-container">
                {searchedForCurrentUser === true ? (
                  <div
                    className="searchbar-modal-friend"
                    onClick={(e) => redirectToFriendPage(e)}
                    id={currentUser.username}
                  >
                    <div className="searchbar-user-avatar">
                      {currentUser.avatar_link !== null ? (
                        <>
                          <img
                            src={currentUser.avatar_link}
                            alt="avatarImage"
                          ></img>
                        </>
                      ) : (
                        <>
                          <img src={defaultProfile} alt="avatarImage"></img>
                        </>
                      )}
                    </div>
                    <div className="searchbar-user-infos">
                      <div className="searchbar-user-name">
                        {currentUser.username}
                      </div>
                      <div className="searchbar-user-status">Vous</div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {searchResultsFromFriendlist.map((user,index) => (
                  <div
                    className="searchbar-modal-friend"
                    onClick={(e) => redirectToFriendPage(e)}
                    id={user.friend.username}
                    key={index}
                  >
                    <div className="searchbar-user-avatar">
                      {user.friend.avatar_link !== null ? (
                        <>
                          <img
                            src={user.friend.avatar_link}
                            alt="avatarImage"
                          ></img>
                        </>
                      ) : (
                        <>
                          <img src={defaultProfile} alt="avatarImage"></img>
                        </>
                      )}
                    </div>
                    <div className="searchbar-user-infos">
                      <div className="searchbar-user-name">
                        {user.friend.username}
                      </div>
                      <div className="searchbar-user-status">Ami(e)</div>
                    </div>
                  </div>
                ))}
                {searchResults.map((user,index) => (
                  <div
                    className="searchbar-modal-friend "
                    onClick={(e) => redirectToFriendPage(e)}
                    id={user}
                    key={index}
                  >
                    <div className="searchbar-user-searched">
                      <img src={searchIcon} alt="searched user icon" />
                    </div>
                    <div className="searchbar-user-infos spe">
                      <div className="searchbar-user-name spe">{user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*end searchbar modal*/}
            <div
              className="left-navbar-home-icon"
              id="clonebook-home-icon"
              onClick={navigateToHomePage}
            >
              <img src={clonebookIcon} alt="home icon"/>
            </div>
            <div
              className="left-navbar-home-cancel-btn"
              onClick={closeSearchbarModal}
              id="cancel-searchbar-btn"
            >
              <img
                src={leftArrowIcon}
                alt="cancel"
                onClick={closeSearchbarModal}
              ></img>
            </div>

            <div className="left-navbar-input-container-resp" onClick={animateSearchBar}>
            <img src={searchIcon} id="img-searchbar-input" alt="search" />
            </div>
            <div
              className="left-navbar-input-container"
              onClick={animateSearchBar}
            >
              <img src={searchIcon} id="img-searchbar-input" alt="search"/>
              <input
                id="input-searchbar-main"
                autoComplete="off"
                type="text"
                onChange={(e) => searchForUsers(e)}
                placeholder="Rechercher sur Clonebook"
              ></input>
            </div>
          </div>
        </div>

        <div className="middle-navbar-hidden-hamburger-menu" onClick={(e)=>triggerResponsiveMenu(e)}>
          <img src={hamburgerMenuIcon} />
          <div className="mnhh-responsive-menu">
          <div className="resp-left-side-bar-user-profile "onClick={navigateToCurrentUserProfile}>
                    <div className="resp-left-side-bar-profile-avatar">
                    {currentUser.avatar_link !== null ? (
                  <>
                    <img src={currentUser.avatar_link} alt="avatarImage"></img>
                  </>
                ) : (
                  <>
                    <img src={defaultProfile} alt="avatarImage"></img>
                  </>
                )}
                    </div>
                    <div className="resp-left-side-bar-profile-username">{currentUser.username}</div>
                  </div>   
                  <div className="resp-left-side-bar-user-friendlist" onClick={navigateToUserFriendlist}>
                    <div className="resp-left-side-bar-user-friendlist-icon" ><img src={blueUsersIcon} alt="friends"/></div>
                    <div className="resp-left-side-bar-user-friendlist-tag" >Amis</div>
            </div>
          </div>
        </div>
        <div className="middle-navbar">
          <div
            className="navbar-navigation-option"
            onClick={navigateToHomePage}
          >
            {currentPage2 == "home" ? (
              <>
                <img src={blueHouse} alt="home"></img>
                <span id="nav-friends-span"></span>
              </>
            ) : (
              <img src={houseIconGray} alt="home"></img>
            )}
          </div>
          <div
            className="navbar-navigation-option"
            onClick={navigateToCurrentUserFriends}
          >
            {currentPage2 == "friends" ? (
              <>
                <img src={blueUsersIcon} alt="friends"></img>
                <span id="nav-friends-span"></span>
              </>
            ) : (
              <img src={usersGroupGray} alt="home"></img>
            )}
          </div>
        </div>

          <div className="right-navbar">
            <div className="navbar-btn-option" onClick={openMessenger}>
              <img src={messengerIcon} alt="messengerIcon"></img>
            </div>
            <div
              className="navbar-btn-option notifs"
              onClick={openModalNotifications}
            >
              <img src={bellIcon} alt="optionsIcon"></img>

              <div className="navbar-notifications-nb-messages">
                {invitsNotSeen.length}
              </div>
            </div>
            <div
              className="navbar-btn-option-profile"
              onClick={(e) => triggerNavbarRightOptions(e)}
            >
              {currentUser.avatar_link !== null ? (
                <>
                  <img src={currentUser.avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
            </div>

            <div className="navbar-rightbar-profile">
              <div
                className="rightbar-profile-user"
                onClick={navigateToCurrentUserProfile}
              >
                <div className="rightbar-profile-user-avatar">
                  {currentUser.avatar_link !== null ? (
                    <>
                      <img
                        id="rightbar-profile-avatar-img"
                        src={currentUser.avatar_link}
                        alt="avatarImage"
                      ></img>
                    </>
                  ) : (
                    <>
                      <img
                        id="rightbar-profile-avatar-img"
                        src={defaultProfile}
                        alt="avatarImage"
                      ></img>
                    </>
                  )}
                </div>
                <div className="rightbar-profile-username">
                  {currentUser.username}
                </div>
              </div>
              <div
                className="rightbar-profile-options"
                onMouseOver={changeImageOpacityLogout}
                onMouseOut={changeBackOpacityLogout}
                onClick={makeLoggout}
              >
                <div className="rightbar-profile-logout">
                  <img
                    id="rightbar-profile-logout-img"
                    src={doorIcon}
                    alt="logout"
                  />
                </div>
                <p>Se déconnecter</p>
              </div>
            </div>

            <div className="hidden-notifications-modal">
              <div className="hidden-notifications-invitations">
                <div className="hidden-notifications-header">Notifications</div>
                {currentUserInvitationsList !== undefined &&
                currentUserInvitationsList.length > 0 ? (
                  <>
                    {currentUserInvitationsList.map((user,index) => (
                      <>
                        {user.sender_id !== cookieUserInfos.id ? (
                          <>
                            <div className="hidden-notifications-invitation" key={index}>
                              <div className="hidden-notifications-invitation-user-avatar">
                                {user.sender &&
                                user.sender.avatar_link !== null ? (
                                  <>
                                    <img
                                      src={user.sender.avatar_link}
                                      alt="user avatar"
                                    ></img>
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={defaultProfile}
                                      alt="user avatar"
                                    ></img>
                                  </>
                                )}
                              </div>
                              <div className="hidden-notifications-invitation-user-informations" >
                                <div className="hidden-notif-invitation-username">
                                  <b>{user.sender.username}</b> vous a envoyé
                                  une invitation.
                                </div>
                                <div className="hidden-notif-invitation-btns">
                                  <button
                                    className="hidden-notif-btn accept"
                                    id={`${user.id},${user.sender_id}`}
                                    onClick={(e) => confirmInvitation(e)}
                                  >
                                    <div
                                      className="hidden-friend-id"
                                      id="007"
                                    ></div>
                                    Confirmer
                                  </button>
                                  <button
                                    className="hidden-notif-btn refuse"
                                    id={`${user.id}`}
                                    onClick={(e) => handleRefuseInvitation(e)}
                                  >
                                    Supprimer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="modal-notifications-zero">
                      Vous n'avez aucune notification.
                    </div>
                  </>
                )}
              </div>

              <div className="hidden-notifications-custom-hr"></div>
              <div className="hidden-notifications-options-menu"></div>
            </div>
          </div>
   
      </div>
    </nav>
  );
};

export default Navbar;
