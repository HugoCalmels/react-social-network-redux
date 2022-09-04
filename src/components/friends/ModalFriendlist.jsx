import { useNavigate } from "react-router-dom";
const ModalFriendlist = (props) => {

  const navigate = useNavigate()

  const navigateToProfile = (e) => {
    console.log(e.currentTarget.id)
    navigate(`/${e.currentTarget.id}`)
  }

 
  return (
    <div className="modal-friendlist-container" >
      {props.friendlist.map((user) => (
        <div id={user.username} onClick={(e)=>navigateToProfile(e)} className="modal-friendlist-username">{user.username}</div>
      ))}
    </div>
  )
}

export default ModalFriendlist