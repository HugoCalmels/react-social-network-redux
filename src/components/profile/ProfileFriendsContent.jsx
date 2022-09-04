import {useState, useEffect} from 'react'
import searchIcon from "../../assets/icons/searchIcon.png"
import dotsMenuIcon from "../../assets/icons/dotsMenuIcon.png"
import defaultProfile from "../../assets/images/defaultProfile.jpg"
import crossIcon from "../../assets/icons/crossIcon.png";
import ModalProfileFriend3 from "./ModalProfileFriend3";
import {
  removeSomeoneFromFriendlist,

} from "../../redux/features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
const ProfileFriendsContent = (props) => {
  console.log(props.friendlist)
  const dispatch = useDispatch();

  const [oneModalIsOpened, setOneModalIsOpened] = useState(false)

  const [searchedInput, setSearchedInput] = useState('')


  //const overlay = document.querySelector()

  const listenTheMouseClicks = (e) => {
    
  }

  useEffect(() => {

    document.addEventListener('click', (e) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(e.target.id)
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  let allModalsElements = document.querySelectorAll('.modal-profile-friend.friends')
      const pbcModalsElements = document.querySelectorAll('.option-remove-modal-container')
      const btnModalElements = document.querySelectorAll('.btn-option-remove-elem')
      console.log('////////////////////////////////////////////////////////////')
      e.preventDefault()

      let id = e.target.id.split('-')[1]
      let foundModal = document.querySelector(`.option-remove-modal-container.id${id}`)
      
      if (e.target.id === "pbc-modal") {

       }

      if (e.target.id === "") {
       
        pbcModalsElements.forEach((el) => {
          el.style.display = "none"
          console.log(el.style.display)
        })
        btnModalElements.forEach((el) => {
          el.style.backgroundColor = "white"
        })
   
      }
    
      if (e.target.id.split('-')[0] === "pbcBtn") {
        pbcModalsElements.forEach((el) => {
          el.style.display = "none"
          console.log(el.style.display)
        })
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log(allModalsElements)
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        allModalsElements.forEach((el) => {
          el.style.display = "none"
          console.log(el)
        })
        console.log('+++++++++++++++++++++++')
        console.log(oneModalIsOpened)
        console.log(foundModal.style.display)
        console.log('+++++++++++++++++++++++')
        if (oneModalIsOpened === false && foundModal.style.display === "none") {

          console.log("WE TRYING 1")
          openFriendModal(e)
         
          setOneModalIsOpened(true)


       
          
        } else if (oneModalIsOpened === true) {
          console.log("WE TRYING")
          pbcModalsElements.forEach((el) => {
            el.style.display = "none"
       
          })
          console.log("WHEN THE FUCK DO I TRIGGER THIS TO FALSE ???????????")
          console.log("WHEN THE FUCK DO I TRIGGER THIS TO FALSE ???????????")
          console.log("WHEN THE FUCK DO I TRIGGER THIS TO FALSE ???????????")
          console.log("WHEN THE FUCK DO I TRIGGER THIS TO FALSE ???????????")
          console.log("WHEN THE FUCK DO I TRIGGER THIS TO FALSE ???????????")
          console.log("WHEN THE FUCK DO I TRIGGER THIS TO FALSE ???????????")
          setOneModalIsOpened(false)
          closeFriendModal(e)
        }
  
      }
      console.log('////////////////////////////////////////////////////////////')
    })

    
  },[])


  useEffect(() => {
    console.log('THIS SHOULD TRIGGER WHENEVER I REMOV ESOMEONE FROM FL')
    console.log('THIS SHOULD TRIGGER WHENEVER I REMOV ESOMEONE FROM FL')
    console.log('THIS SHOULD TRIGGER WHENEVER I REMOV ESOMEONE FROM FL')
    console.log('THIS SHOULD TRIGGER WHENEVER I REMOV ESOMEONE FROM FL')
    console.log('THIS SHOULD TRIGGER WHENEVER I REMOV ESOMEONE FROM FL')
  },[dispatch])

 

  const openFriendModal = (e) => {

    let id = e.target.id.split('-')[1]
    let foundModal = document.querySelector(`.option-remove-modal-container.id${id}`)
    let btn = document.querySelector(`.btn-option-remove-elem.id${id}`)
    btn.style.backgroundColor = "rgba(0, 0, 0, 0.075)"
    foundModal.style.display ="flex"
  }

  const closeFriendModal = (e) => {
    let id = e.target.id.split('-')[1]
    let foundModal = document.querySelector(`.option-remove-modal-container.id${id}`)
    let btn = document.querySelector(`.btn-option-remove-elem.id${id}`)
    btn.style.backgroundColor = "white"
    foundModal.style.display ="none"
  }

  const hoverElem = (e) => {
    if (e.target.id.split('-')[0] === 'pbcBtn') {
      let id = e.target.id.split('-')[1]
      let foundBtn = document.querySelector(`.btn-option-remove-elem.id${id}`)
      foundBtn.style.backgroundColor = "rgba(0, 0, 0, 0.075)"
    }


  }
  
  const unhoverElem = (e) => {
    if (e.target.id.split('-')[0] === 'pbcBtn') {
      console.log(e.target.id)
      console.log('ENTER')
  
      let id = e.target.id.split('-')[1]
      let foundBtn = document.querySelector(`.btn-option-remove-elem.id${id}`)
      foundBtn.style.backgroundColor = "white"
    }

  }

  let miniModalsList = document.querySelectorAll('.modal-profile-text-modal-friendlist.profile')

  const handleRemoveFromFriendlist = (e) => {
    // GROS PROBLEME QUI ME DONNE ENVIE DE CREER UNE NOUVELLE REQUETE BACKEND
    // PARCE QUE MA REQUETE ACTUELLE DE COMMONFRIENDSHIPS ELLE MARCHE QUE SUR CURRENT USER.
    // LA JAI BESOIN DE LA LANCER EN FONCTION DE LURL
    e.preventDefault()
    let friendship1 = e.currentTarget.id.split(',')[0]
    let friendship2 = e.currentTarget.id.split(',')[1]


    dispatch(

   
      removeSomeoneFromFriendlist({
        friendship1: friendship1,
        friendship2: friendship2,
      })
    ).unwrap();



  };


  const openModalnAssociated = (e) => {


    if (e.currentTarget.id === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none"
      })
    }

    console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    console.log(e.currentTarget)
      console.log('555555555555555555555555555555555555555555555')
        console.log('555555555555555555555555555555555555555555555')
        console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')


    let test = e.currentTarget.querySelector('.modal-profile-friend.friends')

    test.style.display = "flex"

    console.log(test)

  
    
  }

  const closeModalnAssociated = (e) => {
    if (e.currentTarget.id === null) {
      miniModalsList.forEach((el) => {
        el.style.display = "none"
      })
    }

    console.log('OUT')
    console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    console.log(e.currentTarget)
      console.log('555555555555555555555555555555555555555555555')
        console.log('555555555555555555555555555555555555555555555')
        console.log('555555555555555555555555555555555555555555555')
    console.log('555555555555555555555555555555555555555555555')
    let test = e.currentTarget.querySelector('.modal-profile-friend')

    test.style.display = "none"
  }

  let filteredFriendlist = props.friendlist


  if (searchedInput.length > 0) {
    filteredFriendlist = props.friendlist.filter((el) => {
      console.log('22222222222222222222')
      console.log('22222222222222222222')
      console.log(el.owner_username)
      console.log(searchedInput)
      console.log('22222222222222222222')
      console.log('22222222222222222222')
      return el.owner_username.includes(searchedInput)
    })
      
    }



  console.log('11111111111111111111111111111111111111111111111111')
  console.log('11111111111111111111111111111111111111111111111111')
  console.log('11111111111111111111111111111111111111111111111111')
  console.log(filteredFriendlist)
  console.log(searchedInput.length)
  console.log('11111111111111111111111111111111111111111111111111')
  console.log('11111111111111111111111111111111111111111111111111')
  console.log('11111111111111111111111111111111111111111111111111')



  return (
    <>
    <div className="profile-friends-component-overlay" ></div>
    <div className="profile-bottom-content-friends-content">

      <div className="pbc-searchbar">
        <input type="text" placeholder="Rechercher" onChange={(e)=>setSearchedInput(e.target.value)}></input>
        <img id="profile-img-searchbar" src={searchIcon}></img>
      </div>
      <div className="pbc-header">Amis</div>
      
      <div className="pbc-grid">  
        {filteredFriendlist.map((friend) => (
          <div className="pbc-friend"  onMouseEnter={(e)=>openModalnAssociated(e)} onMouseLeave={(e)=>closeModalnAssociated(e)}>
            <ModalProfileFriend3 friend={friend} length={filteredFriendlist.length} setBottomContent={props.setBottomContent} />
            <div className="pbc-friend-avatar">
            {friend.owner_avatar_link !== null ? (
                <>
                  <img src={friend.owner_avatar_link} alt="avatarImage"></img>
                </>
              ) : (
                <>
                  <img src={defaultProfile} alt="avatarImage"></img>
                </>
              )}
            </div>
            <div className="pbc-friend-username">
              <h4>{friend.owner_username}</h4>
            </div>
            <div className="pbc-friend-options"  id={`pbcFriend-${friend.owner_id}`}>
              <div className={`btn-option-remove-elem id${friend.owner_id}`} id={`pbcBtn-${friend.owner_id}`} onMouseEnter={(e)=>hoverElem(e)}onMouseLeave={(e)=>unhoverElem(e)}>
                <div className={`option-remove-modal-container id${friend.owner_id}`} id="pbc-modal">
                  <div className="pbc-option remove" id={friend.invitation} onClick={(e) => handleRemoveFromFriendlist(e)}>
                    <div className="pbc-option-icon remove" ><img src={crossIcon}/></div>
                    <div className="pbc-option-text">Retirer des amis</div>
                  </div>
                </div>
                <img src={dotsMenuIcon} id={`pbcBtn-${friend.owner_id}`} ></img>
              </div>
             
              <div className="pbc-friend-option remove"></div>
            </div>
          </div>
          ))}
      </div>
      </div>
      </>
  )
}


export default ProfileFriendsContent