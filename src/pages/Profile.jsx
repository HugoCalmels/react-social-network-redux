import "../Styles/profile/Index.scss"

const Profile = (props) => {

  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  console.log(props)
  console.log(props.user.username)
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
  console.log("HELOOOOOOOOOOOOOOOOOOO FROMMMMMMMMMMMMMMMMMMMM USERRRRRRRRRRRRR")
 //<h1>{props.user.username}</h1>
  return (
   
    <div className="profile-container">

      <div className="profile-top">
        <div className="profile-top-header-image-container">
        </div>
        <div className="profile-top-options">
          <div className="profile-top-avatar-container">
            <div className="future-image"></div>
          </div>
          <div className="profile-top-informations">
          </div>
          <div className="profile-top-buttons">
          </div>
        </div>
      </div>

      <div className="profile-bottom">
      </div>
      
    </div>

  )
}

export default Profile