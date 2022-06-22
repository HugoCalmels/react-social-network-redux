
import { useState, useEffect } from "react"
import "../Styles/profile/Index.scss"
import { useDispatch, useSelector } from "react-redux";
import { createAvatar, createThumbnail } from "../redux/features/users/usersSlice";
import cameraIcon from "../assets/icons/cameraIcon.png";
import blackPenIcon from "../assets/icons/blackPenIcon.png";
import dotsMenuIcon from "../assets/icons/dotsMenuIcon.png";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import PostList from "../components/posts/PostsList"
import AddNewPost from "../components/posts/AddNewPost";
const Profile = (props) => {
  const dispatch = useDispatch();
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  console.log(props.user.id)
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const submitThumbnail = (e) => {
    console.log('hi')
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("thumbnail[image]", e.currentTarget.files[0])
      data.append("thumbnail[user_id]", props.user.id)
      dispatch(createThumbnail({ formDataUser: data, user: props.user })).unwrap()
    } catch (err) {
      console.error("Failed to save the post", err);
    } finally {
      setAddRequestStatus("idle");
    }
  }

  const submitAvatar = (e) => {
    console.log('ho')
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("avatar[image]", e.currentTarget.files[0])
      data.append("avatar[user_id]", props.user.id)
      dispatch(createAvatar({ formDataUser: data, user: props.user })).unwrap()
    } catch (err) {
      console.error("Failed to save the post", err);
    } finally {
      setAddRequestStatus("idle");
    }
  }




  useEffect(() => {

  }, [addRequestStatus,dispatch]);


 //<h1>{props.user.username}</h1>
  
  // <img className="profile-top-header-thumbnail" src={props.user.thumbnail_link} alt="profileThumbnail"></img>
  return (
   
    <div className="profile-container">

      <div className="profile-top">
        <div className="profile-top-header-image-container">
          {props.user.thumbnail_link ?
            <>
              <img className="profile-top-header-thumbnail" src={props.user.thumbnail_link} alt="profileThumbnail"></img>
            </>
            :
            <>
              <div className="profile-top-header-gradiant"></div>
            </>
          }
   
          
          <div className="profile-top-thumbnail-input-container">
            <label className="thumbnail-label" for="thumbnailUpload"><img src={cameraIcon} alt="uploadProfileImage"/><span>Ajouter une photo de couverture</span> </label>
            <input className="thumbnail-input" type="file" name="thumbnailUpload" id="thumbnailUpload" onChange={(e) => submitThumbnail(e)}></input>

          </div>
     

          
              
   
        </div>
        <div className="profile-top-options">
          <div className="profile-top-avatar-container">
            <div className="avatar-image-container">
              {props.user.avatar_link ? 
                <>
                   <img src={props.user.avatar_link} alt="avatarImage"></img>
                </>
                :
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              }
              
            </div>
          
            <div className="profile-top-avatar-input-container">
              <label className="avatar-label" for="avatarUpload"><img src={cameraIcon} alt="uploadProfileAvatar"/></label>
              <input className="avatar-input" type="file" name="avatarUpload" id="avatarUpload" onChange={(e) => submitAvatar(e)}></input>
            </div>
         
          </div>
          <div className="profile-top-informations">
            <div className="profile-username">{ props.user.username}</div>
            <div className="profile-nb-of-friends">79 amis </div>
            <div className="profile-friends-avatars">
              <div className="future-friend-avatar"></div>
              <div className="future-friend-avatar"></div>
              <div className="future-friend-avatar"></div>
            </div>
          </div>
          <div className="profile-top-buttons">
            <button for="updateProfile"><img src={blackPenIcon} alt="updateProfile"></img><span>Modifier le profil</span></button>
          </div>
        </div>

        <div className="profile-navbar-container">
          <div className="profile-navbar">
            <div className="profile-navbar-navigation">
              <div className="profile-navbar-option">Publications</div>
              <div className="profile-navbar-option">A propos</div>
              <div className="profile-navbar-option">Amis</div>
              <div className="profile-navbar-option">Photos</div>
              <div className="profile-navbar-option">Vidéos</div>
            </div>
          <div className="profile-navbar-dropdown-menu">
            <img src={dotsMenuIcon} alt="profile-dropdown-menu"/>
          </div>
          </div>
        </div>

      </div>

      <div className="profile-bottom">

        <div className="profile-bottom-left">
          <div className="profile-photos-container">
            <div className="profile-photos-header">
              <h3>Photos</h3>
              <p>Toutes les photos</p>
            </div>
            <div className="profile-photos">
              {/* props.user.images[for each]...*/}
              <div className="future-user-photo"></div>
              <div className="future-user-photo"></div>
              <div className="future-user-photo"></div>
              <div className="future-user-photo"></div>
            </div>
          </div>
          <div className="profile-friends-container">
          </div>
        </div>


        <div className="profile-bottom-right">
        <AddNewPost />
          <PostList  />
        </div>
      </div>

      
    </div>

  )
}

export default Profile