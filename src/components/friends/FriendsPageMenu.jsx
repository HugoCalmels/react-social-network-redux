import singleUserBlack from "../../assets/icons/singleUserBlack2.png";
import singleUserWhite from "../../assets/icons/singleUserWhite2.png";
import chevronIcon from "../../assets/icons/chevronIcon.png";
import "../../Styles/friends/friends-menu.scss";
import { useEffect } from "react";
const FriendsPageMenu = (props) => {
  let allFriendsOptionElem = document.querySelector(
    ".friends-page-menu-option.all-friends"
  );
  let invitationsOptionElem = document.querySelector(
    ".friends-page-menu-option.invitations"
  );
  let suggestionsOptionElem = document.querySelector(
    ".friends-page-menu-option.suggestions"
  );

  let allFriendsOptionCircle = document.querySelector(
    ".friends-page-menu-option-avatar.all-friends"
  );
  let invitationsOptionCircle = document.querySelector(
    ".friends-page-menu-option-avatar.invitations"
  );
  let suggestionsOptionCircle = document.querySelector(
    ".friends-page-menu-option-avatar.suggestions"
  );

  let smallIconsAllFriends = document.querySelectorAll(
    ".friends-page-menu-small-icon-line"
  );
  let smallIconInvitations = document.querySelector(
    ".friends-page-menu-small-icon-invitations"
  );
  let smallIconSuggestions = document.querySelector(
    ".friends-page-menu-small-icon-arrow-el"
  );

  useEffect(() => {
    if (allFriendsOptionElem !== null) {
      allFriendsOptionElem.classList.add("clicked");
    }
  }, []);

  const changeMenu = (e) => {
    e.preventDefault();
    props.setMenuSelected(e.currentTarget.id);
  };

  if (
    allFriendsOptionElem !== null &&
    invitationsOptionElem !== null &&
    suggestionsOptionElem !== null
  ) {
    if (props.menuSelected === "all-friends") {
      allFriendsOptionElem.classList.add("clicked");
      invitationsOptionElem.classList.remove("clicked");
      suggestionsOptionElem.classList.remove("clicked");
      allFriendsOptionCircle.style.backgroundColor = "#1877F2";
      invitationsOptionCircle.style.backgroundColor = "#E4E6EB";
      suggestionsOptionCircle.style.backgroundColor = "#E4E6EB";
      smallIconsAllFriends.forEach((el) => {
        el.style.backgroundColor = "white";
      });
      smallIconInvitations.style.color = "black";
      smallIconSuggestions.style.color = "black";
    } else if (props.menuSelected === "invitations") {
      invitationsOptionElem.classList.add("clicked");
      allFriendsOptionElem.classList.remove("clicked");
      suggestionsOptionElem.classList.remove("clicked");
      allFriendsOptionCircle.style.backgroundColor = "#E4E6EB";
      invitationsOptionCircle.style.backgroundColor = "#1877F2";
      suggestionsOptionCircle.style.backgroundColor = "#E4E6EB";
      smallIconsAllFriends.forEach((el) => {
        el.style.backgroundColor = "black";
      });
      smallIconInvitations.style.color = "white";
      smallIconSuggestions.style.color = "black";
    } else if (props.menuSelected === "suggestions") {
      suggestionsOptionElem.classList.add("clicked");
      invitationsOptionElem.classList.remove("clicked");
      allFriendsOptionElem.classList.remove("clicked");
      allFriendsOptionCircle.style.backgroundColor = "#E4E6EB";
      invitationsOptionCircle.style.backgroundColor = "#E4E6EB";
      suggestionsOptionCircle.style.backgroundColor = "#1877F2";
      smallIconsAllFriends.forEach((el) => {
        el.style.backgroundColor = "black";
      });
      smallIconInvitations.style.color = "black";
      smallIconSuggestions.style.color = "white";
    }
  }

  // spe color : #1877F2 // #E4E6EB

  return (
    <div className="friends-page-menu-container">
      <div className="friends-page-menu-header">Amis</div>

      <div className="friends-page-menu-list">
        <div
          className="friends-page-menu-option all-friends"
          id="all-friends"
          onClick={(e) => changeMenu(e)}
        >
          <div className="friends-page-menu-option-avatar all-friends">
            {props.menuSelected === "all-friends" ? (
              <img
                className="friends-page-menu-img-user"
                src={singleUserWhite}
                alt="all friends"
              ></img>
            ) : (
              <img
                className="friends-page-menu-img-user"
                src={singleUserBlack}
                alt="all friends"
              ></img>
            )}
            <div className="friends-page-menu-small-icon-triple-equal">
              <div className="friends-page-menu-small-icon-line"></div>
              <div className="friends-page-menu-small-icon-line"></div>
              <div className="friends-page-menu-small-icon-line"></div>
            </div>
          </div>
          <div className="friends-page-menu-tag all-friends">Tous les amis</div>
          <div className="friends-page-menu-btn">
            <img
              className="friends-page-menu-chevron all-friends"
              src={chevronIcon}
              alt="all friends"
            />
          </div>
        </div>

        <div
          className="friends-page-menu-option invitations"
          id="invitations"
          onClick={(e) => changeMenu(e)}
        >
          <div className="friends-page-menu-option-avatar invitations">
            {props.menuSelected === "invitations" ? (
              <img
                className="friends-page-menu-img-user"
                src={singleUserWhite}
                alt="all friends"
              ></img>
            ) : (
              <img
                className="friends-page-menu-img-user"
                src={singleUserBlack}
                alt="all friends"
              ></img>
            )}
            <div className="friends-page-menu-small-icon-invitations">+</div>
          </div>
          <div className="friends-page-menu-tag invitations">Invitations</div>
          <div className="friends-page-menu-btn">
            <img
              className="friends-page-menu-chevron invitations"
              src={chevronIcon}
              alt="all friends"
            />
          </div>
        </div>

        <div
          className="friends-page-menu-option suggestions"
          id="suggestions"
          onClick={(e) => changeMenu(e)}
        >
          <div className="friends-page-menu-option-avatar suggestions">
            {props.menuSelected === "suggestions" ? (
              <img
                className="friends-page-menu-img-user"
                src={singleUserWhite}
                alt="all friends"
              ></img>
            ) : (
              <img
                className="friends-page-menu-img-user"
                src={singleUserBlack}
                alt="all friends"
              ></img>
            )}

            <div className="friends-page-menu-small-icon-arrow-container">
              <div className="friends-page-menu-small-icon-arrow-el">
                &#8594;
              </div>
            </div>
          </div>
          <div className="friends-page-menu-tag suggestions">Suggestions</div>
          <div className="friends-page-menu-btn">
            <img
              className="friends-page-menu-chevron suggestions"
              src={chevronIcon}
              alt="all friends"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPageMenu;
