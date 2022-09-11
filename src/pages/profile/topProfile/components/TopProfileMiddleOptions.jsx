import defaultProfile from "../../../../assets/images/defaultProfile.jpg";
import Cookies from "js-cookie";
import cameraIcon from "../../../../assets/icons/cameraIcon.png";

import blackPenIcon from "../../../../assets/icons/blackPenIcon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createAvatar,
  addSomeoneToFriendList,
} from "../../../../redux/features/users/usersSlice";
import { selectSelectedUserCommonFriends } from "../../../../redux/features/users/usersSlice";
import ModalProfileFriend from "../../../../components/profile/ModalProfileFriend";
import imageCompression from 'browser-image-compression';

const TopProfileMiddleOptions = (props) => {
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);
  const dispatch = useDispatch();
  const selectedUserWithCM = useSelector(selectSelectedUserCommonFriends);
  let miniModalsList = document.querySelectorAll(
    ".modal-profile-text-modal-friendlist.profile"
  );
  let selectedFilteredFriendlist = [];

  if (selectedUserWithCM.length > 0) {
    selectedFilteredFriendlist = selectedUserWithCM.slice(0, 9);
  }

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log(selectedUserWithCM)
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')


  const submitAvatar = (e) => {
    e.preventDefault();
    resizeImageFunction(e.currentTarget.files[0]).then((imageFile) => {
      try {
        const data = new FormData();
        data.append("avatar[image]", imageFile);
        data.append("avatar[user_id]", props.foundUser.id);
        dispatch(
          createAvatar({ formDataUser: data, user: props.foundUser })
        ).unwrap();
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    
    })
    
  };

  const openModalnAssociated = (e) => {
    if (e.currentTarget.id === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none";
      });
    }
    let test = e.currentTarget.querySelector(".modal-profile-friend");
    test.style.display = "flex";
  };

  const closeModalnAssociated = (e) => {
    if (e.currentTarget.id === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none";
      });
    }

    let test = e.currentTarget.querySelector(".modal-profile-friend");

    test.style.display = "none";
  };

  const openModalModifyProfil = () => {
    alert("Fonctionnalité en développement");
  };
  const openMessenger = () => {
    alert("Fonctionnalité en développement");
  };

  const addToFriendsList = (e) => {
    e.preventDefault();
    try {
      dispatch(
        addSomeoneToFriendList({
          user_id: cookieUserInfos.id,
          receiver_id: props.foundUser.id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const resizeImageFunction = async (file) => {
    const options = {
      maxSizeMB: .05,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(file, options);
    return compressedFile
  }


  return (
    <div className="profile-top-options">
      <div className="profile-top-avatar-container">
        <div className="avatar-image-container">
          {props.foundUser.avatar_link !== null ? (
            <>
              <img src={props.foundUser.avatar_link} alt="avatarImage"></img>
            </>
          ) : (
            <>
              <img src={defaultProfile} alt="avatarImage"></img>
            </>
          )}
        </div>

        {props.foundUser.id === cookieUserInfos.id ? (
          <>
            <div className="profile-top-avatar-input-container">
              <label className="avatar-label" htmlFor="avatarUpload">
                <img src={cameraIcon} alt="uploadProfileAvatar" />
              </label>
              <input
                className="avatar-input"
                type="file"
                name="avatarUpload"
                id="avatarUpload"
                onChange={(e) => submitAvatar(e)}
              ></input>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="profile-top-informations">
        <div className="profile-username">{props.foundUser.username}</div>
        <div className="profile-nb-of-friends">
          {selectedUserWithCM.length} amis{" "}
        </div>
        <div className="profile-friends-avatars">
          {selectedFilteredFriendlist &&
          selectedFilteredFriendlist.length > 0 ? (
            <>
              {selectedFilteredFriendlist.map((friend,index) => (
                <div
                  className="future-friend-avatar"
                  onMouseEnter={(e) => openModalnAssociated(e)}
                  onMouseLeave={(e) => closeModalnAssociated(e)}
                  key={index}
                >
                  <ModalProfileFriend
                    friend={friend}
                    length={selectedFilteredFriendlist.length}
                    setBottomContent={props.setBottomContent}
                  />
                  <div className="future-friend-round-effect" >
                    {friend.owner_avatar_link === null ||
                    friend.owner_avatar_link === "" ? (
                      <>
                        <img src={defaultProfile} alt="friend"/>
                      </>
                    ) : (
                      <>
                        <img src={friend.owner_avatar_link} alt="friend"/>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="profile-top-buttons">
        {props.foundUser.id === cookieUserInfos.id ? (
          <>
            <button html="updateProfile">
              <img src={blackPenIcon} alt="updateProfile"></img>
              <span onClick={openModalModifyProfil}>Modifier le profil</span>
            </button>
          </>
        ) : (
          <>
            {props.isAlreadyFriend ? (
              <>
                <div className="profile-user-interactions">
                  <button
                    className="profile-uib gray"
                    onClick={(e) => props.handleRemoveFromFriendlist(e)}
                    data-btn-remove-friend-request-id={props.foundUser.id}
                    id={props.foundUser.id}
                  >
                    Retirer des amis
                  </button>

                  <button onClick={openMessenger} className="profile-uib blue">
                    Message
                  </button>
                </div>
              </>
            ) : (
              <>
                {props.currentUser.sent_invitations &&
                props.currentUser.sent_invitations.find(
                  (el) => el.receiver_id === props.foundUser.id
                ) ? (
                  <>
                    <div className="profile-user-interactions">
                      <button
                        className="profile-uib gray"
                        onClick={(e) => props.handleCancelFriendRequest(e)}
                        data-btn-cancel-friend-request-id={props.foundUser.id}
                      >
                        Annuler l'invitation
                      </button>

                      <button
                        onClick={openMessenger}
                        className="profile-uib blue"
                      >
                        Message
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="profile-user-interactions">
                      <button
                        className="profile-uib gray"
                        onClick={(e) => addToFriendsList(e)}
                      >
                        Ajouter aux amis
                      </button>

                      <button
                        onClick={openMessenger}
                        className="profile-uib blue"
                      >
                        Message
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopProfileMiddleOptions;
