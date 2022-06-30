
import { useState, useEffect } from "react"
import "../Styles/profile/Index.scss"
import { useDispatch, useSelector } from "react-redux";
import { createAvatar, createThumbnail, addSomeoneToFriendList, cancelFriendRequest , getCurrentInvitation,  getCurrentStatus } from "../redux/features/users/usersSlice";
import { getPostsStatus, getAllImagesPostsFromUser, getPostsImagesStatus, selectAllPostsImages } from "../redux/features/posts/postsSlice";
import { getImagesStatus, getUserPostImages, selectAllImages } from "../redux/features/images/imagesSlice"
import { removeSomeoneFromFriendlist, selectSelectedFriendList, getSelectedUserFriendList,selectFriendList,getUsersStatus, selectAllUsers } from '../redux/features/users/usersSlice'
import cameraIcon from "../assets/icons/cameraIcon.png";
import blackPenIcon from "../assets/icons/blackPenIcon.png";
import dotsMenuIcon from "../assets/icons/dotsMenuIcon.png";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import PostList from "../components/posts/PostsList"
import AddNewPost from "../components/posts/AddNewPost";
import Cookies from 'js-cookie';
const Profile = (props) => {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [profileBtn, setProfileBtn] = useState('SENDABLE')

  // IMAGES
  /*
  const imagesStatus = useSelector(getImagesStatus)
  const images = useSelector(selectAllImages)
  */
  const imagesStatus2 = useSelector(getPostsImagesStatus)
  const postsStatus = useSelector(getPostsStatus)
  const imagesStatus = useSelector(getImagesStatus)
  const posts = useSelector(selectAllImages)
  const posts2 = useSelector(selectAllPostsImages)
  const usersStatus = useSelector(getUsersStatus)
  const users = useSelector(selectAllUsers)
  const currentInvit = useSelector(getCurrentInvitation)
  const currentStatus = useSelector( getCurrentStatus)
  const selectedFriendlist = useSelector(selectSelectedFriendList)
  //const friendlistStatus = useSelector(getFriendListStatus)
  useEffect(() => {
    if (imagesStatus === "idle") {
      dispatch(getUserPostImages(props.user.id))

 
    }


  }, [usersStatus, imagesStatus, postsStatus, imagesStatus2, dispatch])

  useEffect(() => {
    
    dispatch(getSelectedUserFriendList(props.user.id)).unwrap() 
  },[])


 



  let userPosts;
  let reducedPosts
  if (imagesStatus === 'loading') {
    userPosts = <p>" Loading ... "</p>;
  } else if (imagesStatus === 'succeeded') {
    if (posts2 && posts2.length > 0) {
      userPosts = posts2
    } else {

      let sortedPosts = [...posts]
      
      userPosts = sortedPosts.sort(function (a, b) {
        return b.id - a.id;
      })
    }
    let removedNoImagesPost = userPosts.filter((post) => {
      return post.image_link !== null && post.image_link !== ''
    })
    
    reducedPosts = removedNoImagesPost.filter((post,index) => {
      return index < 9
    })
  } else if (imagesStatus === 'error') {
    userPosts = <p>Error</p>
  }



  
  useEffect(() => {
    
  }, [posts])



  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 


  const [getRefreshFromPostList, setGetRefreshFromPostList] = useState(1)

  /*
  useEffect(() => {
    if (imagesStatus === "idle") {
      dispatch(getUserPostImages(props.user.id)).unwrap()
    }
  }, [imagesStatus, dispatch, getRefreshFromPostList])

  let imageList;
  if (imagesStatus === 'loading') {
    imageList = <p>" Loading ... "</p>;
  } else if (imagesStatus === 'succeeded') {

    imageList = images
  } else if (imagesStatus === 'error') {
    imageList = <p>Error</p>
  }

  console.log('LLLL PROFILE LLLL')
  console.log('LLLL PROFILE LLLL')
  console.log(images)
  console.log('LLLL PROFILE LLLL')
  console.log('LLLL PROFILE LLLL')

  
  useEffect(() => {
   
    console.log("INDEX : PROFILECHANGED")
    console.log(imageList)
    console.log("INDEX : PROFILECHANGED")
  }, [imageList])
*/

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


  const addToFriendsList = () => {
    try { 
      dispatch(addSomeoneToFriendList({user_id: cookieUserInfos.id, receiver_id: props.user.id}))
    } catch(e) {

    } finally {

    }
  }

  const handleCancelFriendRequest = (e) => {
    let foundInvitation = props.user.received_invitations.filter((invit)=>invit.sender_id === cookieUserInfos.id)
    
    e.preventDefault()
    let res
    if (currentInvit && currentInvit.id > 0) {
      res = currentInvit.id
    }
    else if (foundInvitation[0] && foundInvitation[0].id > 0) {
      res = foundInvitation[0].id
    }
    try {
      dispatch(cancelFriendRequest(res)).unwrap()
    } catch (e) {
    } finally {
    }
  }

  useEffect(()=>{

  },[profileBtn])

  //props.user.sent

  let invitation 
  let invitationBoolean = false
  if (currentStatus === 'loading') {
  } else if (currentStatus === 'succeeded' ) {
 
    invitation = currentInvit
  } else if (currentStatus === 'error') {
  }


  if (invitation ){ 
    invitationBoolean = true
  } 

  let condition66 


  useEffect(() => {
    let foundInvitation = props.user.received_invitations.filter((invit)=>invit.sender_id === cookieUserInfos.id)
    

    if (currentInvit && currentInvit.receiver_id === props.user.id){
      condition66 = "FRIENDSHIP ACCEPTABLE/CANCELABLE" 
      setProfileBtn('CANCELABLE')
    } else if (foundInvitation[0] && foundInvitation[0].receiver_id === props.user.id && currentInvit !== '') {
      condition66 = "FRIENDSHIP ACCEPTABLE/CANCELABLE"
      setProfileBtn('CANCELABLE')
    } 
    
  }, [currentInvit, props])
  

  let condition

  if (invitation === "") {
    condition = 1
  } else {
    condition = 2
  }

  useEffect(() => {
    
  },[condition66])



 

  let isAlreadyFriend = false
  if (props.friendlist.find((friend) => friend.id === props.user.id)) {
    isAlreadyFriend = true
  }


  let reducedFriendlist = selectedFriendlist.filter((friend, index) => {
    return index < 9
  })
  
  
  
 


  let btnAddPost = document.querySelector('.btn-open-modal-add-post')

  if (props.user.id !== cookieUserInfos.id && btnAddPost !== null) {

    btnAddPost.style.display = 'none'

  }

  const handleRemoveFromFriendlist = (e) => {
   
    let foundFriendship = props.currentUser.friendships.find((friendship) => {
      return friendship.friend_id == e.target.id
    })
 
    dispatch(removeSomeoneFromFriendlist({user_id:cookieUserInfos.id, friend_id: e.target.id, friendship_id: foundFriendship.id})).unwrap()

  }


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
              {props.user.avatar_link !== null ? 
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
            <div className="profile-nb-of-friends">{selectedFriendlist.length} amis </div>
            <div className="profile-friends-avatars">
              {reducedFriendlist.map((friend) => (
                <div className="future-friend-avatar">
                  <div className="future-friend-round-effect">
                   {friend.avatar_link === null || friend.avatar_link === '' ?
                      <>
                        <img src={defaultProfile} />
                      </>
                      :
                      <>
                        <img src={friend.avatar_link } />
                      </>
                    }
                    </div>
                </div>
            ))}

            </div>
          </div>
          <div className="profile-top-buttons">

            {props.user.id === cookieUserInfos.id ?
              <>
                <button for="updateProfile"><img src={blackPenIcon} alt="updateProfile"></img><span>Modifier le profil</span></button>
              </>
              :
              <>
          
                {isAlreadyFriend ?
                  <>
                    <div className="profile-user-interactions">
                          <button onClick={(e) => handleRemoveFromFriendlist(e)} data-btn-remove-friend-request-id={props.user.id} id={props.user.id}>retirer des amis</button>
                          <button>message</button>
                        </div>
                  </>
                  :
                  <>
                    {profileBtn === "CANCELABLE" ?
                  <>
                    <div className="profile-user-interactions">
                          <button onClick={(e) => handleCancelFriendRequest(e)} data-btn-cancel-friend-request-id={props.user.id}>annuler l'invitation</button>
                          <button>message</button>
                        </div>
                  </>
                  :
                  <>
                     <div className="profile-user-interactions">
                          <button onClick={addToFriendsList}>ajouter</button>
                          <span>condition 3</span>
                          <button>message</button>
                        </div>
                  </>
                }
                  </>
                }
                
               
         
        
                    
             
            
             
          
              
              </>
            }
            
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
            {/*
             <div className="profile-navbar-dropdown-menu">
            <img src={dotsMenuIcon} alt="profile-dropdown-menu"/>
          </div>
            */}
         
          </div>
        </div>

      </div>

      <div className="profile-bottom">

        <div className="profile-bottom-left">
    
          {reducedPosts && reducedPosts.length > 0 ?
            <>
              <div className="profile-photos-container">
            <div className="profile-photos-header">
              <h3>Photos</h3>
              <p>Toutes les photos</p>
            </div>
              <div className="profile-photos">
              {reducedPosts.map((post) => (
                <>
                  <div className="future-user-photo">
                    <img src={post.image_link} alt="userImage"/>
                    </div>
                </>
              ))}
            </div>
            </div>
            </>
            : ''}
       
            
        
    
          <div className="profile-friends-container">
            <div className="profile-friends-header">
              <div className="profile-friends-header-top">
                
                <div className="profile-friends-header-title">Amis</div>
                <div className="profile-friends-header-right">Tous les amis</div>
        
              </div>
              <div className="profile-friends-header-nbfriends">79 amis</div>
            </div>
            <div className="profile-friends-content">
              {reducedFriendlist.map((friend) => (
                <>
                  <div className="profile-friend-unit">
                    <div className="profile-friend-wrapper">
                    {friend.avatar_link === null || friend.avatar_link === '' ?
                      <>
                        <img src={defaultProfile} />
                      </>
                      :
                      <>
                        <img src={friend.avatar_link } />
                      </>
                    }
                      <span>{friend.username}</span>
                      </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>


        <div className="profile-bottom-right">
          <AddNewPost currentUser={props.currentUser} />

          <PostList userPosts={userPosts} currentUser={props.currentUser} />
        </div>
      </div>

      
    </div>

  )
}

export default Profile