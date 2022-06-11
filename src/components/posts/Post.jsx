import { useEffect, useState } from 'react'
// redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/posts/postsSlice"
// components
import UpdatePost from './UpdatePost'
import Cookies from 'js-cookie';
import CommentsList from './Comments/CommentsList'

import dotsMenuIconGrey from '../../assets/icons/dotsMenuIconGrey.png';
import pencilIcon from '../../assets/icons/pencilIcon.png';
import trashIcon from '../../assets/icons/trashIcon.png';
import closeIcon from '../../assets/icons/closeIcon.png';
import rightCurvedArrow2 from '../../assets/icons/rightCurvedArrow2.png';
import commentsIcon from '../../assets/icons/commentsIcon.png';
import thumbsUpIcon2 from '../../assets/icons/thumbsUpIcon2.png';
const Post = (props) => {

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [showUpdatePost, setShowUpdatePost] = useState(false)

  const dispatch = useDispatch()

  const tryToDeletePost = (e) => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending')
        dispatch(deletePost({ id: props.post.id }))
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
    
  }

  useEffect(() => {

  }, [showUpdatePost])

  const openUpdatePost = () => {
    let updatePostElements = document.querySelectorAll('.update-post')
    let divToUpdate = [...updatePostElements].filter(el => el.id == props.post.id)

    divToUpdate[0].style.display = "block"

    let divOverlay = document.querySelector('.overlay-update-post');
    divOverlay.style.display = "block"
    document.body.style.overflow = "hidden"
    divOverlay.addEventListener('click', () => {
      divOverlay.style.display = "none"
      divToUpdate[0].style.display = "none"
      document.body.style.overflow = "visible"
    })
  }

  // ------- WORKING ON HERE ---------- //
  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 
  // test user id & co

  let overlay = document.querySelector('.main-overlay')

  const openOptionsModal = (e) => {
    e.preventDefault()
    console.log(props.post.id)

    overlay.style.display = "block"
    let hiddenModal = document.querySelectorAll(`[data-option-modal-id='${props.post.id}']`)[0]
    hiddenModal.classList.toggle('active')
    console.log(hiddenModal)

    overlay.addEventListener('click', () => {
      
      hiddenModal.classList.remove('active')
      overlay.style.display = "none"
    })

    let wrapper = document.querySelectorAll(`[data-wrapper-id='${props.post.id}']`)[0]
    wrapper.addEventListener('click', () => {
      hiddenModal.classList.remove('active')
      overlay.style.display = "none"
    })
    //document.querySelectorAll(`[data-option-modal-id=${props.post.id}]`)
    //const testeee = console.log('RECUPERATION DE LELEM PAR LE DATASET')
    //console.log(testeee)
    console.log('RECUPERATION DE LELEM PAR LE DATASET')
  }

  // regex to year ^\d{4}
  /*
  const regexToObtainYear = /^\d{4}/ 
  const postYear = props.post.created_at.match(regexToObtainYear)
  console.log('test regex 1')
  console.log('year'+postYear[0])
  console.log('test regex 1')
  */
  
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  console.log('?????????????????????????????????')
  console.log('?????????????????????????????????')
  console.log(props.post)
  console.log(props.post.created_at)
  console.log('?????????????????????????????????')
  console.log('?????????????????????????????????')

 
  const reworkedCreatedAt = props.post.created_at.split(/[-T]+/)
  
  console.log(reworkedCreatedAt)
  //const year = reworkedCreatedAt[0]

  const monthInNumbersWithZero = reworkedCreatedAt[2]
  const month = monthInNumbersWithZero.split('').filter((el) => el !== '0').join('')

  const dayInNumbersWithZero = reworkedCreatedAt[1]
  const dayInNumbers = dayInNumbersWithZero.split('').filter((el) => el !== '0').join('')
  console.log(dayInNumbers)
  const day = monthNames[parseInt(dayInNumbers) - 1]
  console.log(day)
  const hour = reworkedCreatedAt[3].substring(0, 5)
  console.log(hour)
  const day2 = parseInt(reworkedCreatedAt[2])



   



  return (
    <>
      <div className="post-wrapper" data-wrapper-id={props.post.id}>

        <div className="post-header">
          <div className="post-author-avatar">
     
          </div>
          <div className="post-author-infos">
            <div className="post-author">{props.post.author}</div>
            <div className="post-created-at">{day2} {day}, {hour} </div>
          </div>

          
          <div className="post-author-options">
            <div className="post-author-options-btn" onClick={(e) => openOptionsModal(e)}
            >
              <img src={dotsMenuIconGrey} alt="post-menu-options"/>
            </div>
          </div>

          <div className="post-author-options-modal-container" data-option-modal-id={props.post.id}>
                {props.post.user_id == cookieUserInfos.id ? 
                <>
                  <div onClick={openUpdatePost} className="post-author-options-btn-update"><img src={pencilIcon} alt="modify post"/><p>Modifier la publication</p></div>
                    <div onClick={((e)=>tryToDeletePost(e))} className="post-author-options-btn-delete"><img src={trashIcon} alt="modify post"/><p>Supprimer la publication</p></div>
                    
              </>
            
              :
              <div className="post-author-options-btn-hide-wrapper">
              <button className="post-author-options-btn-hide">
                <div className="post-author-options-btn-hide-container" >
                  <img src={closeIcon} alt=" modify post" />
                  </div>
                  <p>Masquer la publication</p>
              
                </button>
                </div>
              }

                </div>
        </div>
        <div className="post-content">
          <span>{props.post.content}</span>
          <div className="post-content-image">
          <img src={props.post.image_link}/>
            </div>
            </div>
      

          <div className="post-comments-header">
            <div className="post-comments-likes-count">
              0 likes
            </div>
            <div className="post-comments-comments-count">
            {props.post.comments.length} commentaires
            </div>
          </div>

          <div className="post-comments-options">
            <div className="post-comments-option like"><img src={thumbsUpIcon2} alt="thumps up" /><span>J'aime</span></div>
            <div className="post-comments-option comment"><img src={commentsIcon} alt="comment" /><span>Commenter</span></div>
            <div className="post-comments-option share"><img src={rightCurvedArrow2} alt="share" /><span>Partager</span></div>
          </div>

          <div className="post-comments-content">
            <CommentsList post={props.post}/>
          </div>
        
      



      </div>


      {/* RELATED TO UPDATE POST, ITS A MODAL */}
      <UpdatePost post={props.post}/>
    </>
  )
}

export default Post