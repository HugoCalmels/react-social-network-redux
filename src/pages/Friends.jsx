import "../Styles/friends/index.scss";
import FriendsPageMenu from "../components/friends/FriendsPageMenu.jsx";
import FriendsPageContent from "../components/friends/FriendsPageContent.jsx";
import { useEffect, useState } from "react";
import bigPlusIcon from "../assets/icons/bigPlusIcon.png";

const Friends = () => {
  const [menuSelected, setMenuSelected] = useState("all-friends");

  const openResponsiveMenuModal = () => {
    let menuModal = document.querySelector(".friends-page-menu-container");

    menuModal.classList.toggle("active");
  };

  useEffect(() => {
    let menuModal = document.querySelector(".friends-page-menu-container");
    menuModal.classList.remove("active");
  }, [menuSelected]);

  return (
    <div className="friends-page-wrapper">
      <div className="resp-menu-friends-btn" onClick={openResponsiveMenuModal}>
        <img src={bigPlusIcon} />
      </div>
      <FriendsPageMenu
        setMenuSelected={setMenuSelected}
        menuSelected={menuSelected}
      />
      <FriendsPageContent
        setMenuSelected={setMenuSelected}
        menuSelected={menuSelected}
      />
    </div>
  );
};

export default Friends;
