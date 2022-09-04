import defaultProfile from "../../assets/images/defaultProfile.jpg"
import { useNavigate } from "react-router-dom";
const ModalLittlePerson = (props) => {

  const navigate = useNavigate()
  
  const navigateToProfile = (e) => {
    console.log(e.currentTarget.id)
    navigate(`/${e.currentTarget.id}`)
  }

  return (
    <>
 

      {props.order === "first" ?
        <div className="modal-little-person-container first">
            {props.friend.avatar_link !== null ? (
                               <div className="little-person-image-container">
              <img id={props.friend.username} onClick={(e)=>navigateToProfile(e)} src={props.friend.avatar_link} alt="avatarImage"></img>
                              </div>
                          ) : (
                             <div className="little-person-image-container">
                              <img id={props.friend.username} onClick={(e)=>navigateToProfile(e)} src={defaultProfile} alt="avatarImage"></img>
                              </div>
                    )}
          <div className="little-person-text-container">
            <h4 id={props.friend.username} onClick={(e)=>navigateToProfile(e)}>{props.friend.username}</h4>
            {props.length > 1 ?
              <p>{props.length} amis en commun</p>
              :
              <p>{props.length} ami en commun</p>
            }
       
          </div>
         </div>
        :
        <div className="modal-little-person-container last">
            {props.friend.avatar_link !== null ? (
                               <div className="little-person-image-container">
                              <img id={props.friend.username} onClick={(e)=>navigateToProfile(e)} src={props.friend.avatar_link} alt="avatarImage"></img>
                              </div>
                          ) : (
                             <div className="little-person-image-container">
                              <img id={props.friend.username} onClick={(e)=>navigateToProfile(e)} src={defaultProfile} alt="avatarImage"></img>
                              </div>
                    )}
          <div className="little-person-text-container">
            <h4 id={props.friend.username} onClick={(e)=>navigateToProfile(e)}>{props.friend.username}</h4>
            {props.length > 1 ?
              <p>{props.length} amis en commun</p>
              :
              <p>{props.length} ami en commun</p>
            }
       
          </div>
         </div>
      }
    </>
  )
}

export default ModalLittlePerson