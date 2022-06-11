import {useState} from 'react'
import AddNewComment from "./AddNewComment"
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/features/posts/postsSlice"
import dotsMenuIconGrey from '../../../assets/icons/dotsMenuIconGrey.png';
import pencilIcon from '../../../assets/icons/pencilIcon.png';
import trashIcon from '../../../assets/icons/trashIcon.png';
import closeIcon from '../../../assets/icons/closeIcon.png';

const CommentsList = (props) => {

  const userId = JSON.parse(Cookies.get('user')).id;
  const dispatch = useDispatch()

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const canSave = addRequestStatus === 'idle';
  const handleDelete = (e) => {
    e.preventDefault();
    if (canSave) {
      
      try {
        setAddRequestStatus('pending')
        dispatch(deleteComment({ comment_id: e.target.value, post: props.post })).unwrap()
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const addCustomHover = (e) => {
      e.target.classList.toggle('active-hover')
  }

  const removeCustomHover = (e) => {
    e.target.classList.remove('active-hover')
  }
  let overlay = document.querySelector('.main-overlay')

  const toggleModal = (e) => {
    const test5 = e.target.dataset.commentBtnId

    let foundModal = document.querySelectorAll(`[data-comment-modal-id='${test5}']`)
    foundModal[0].classList.toggle('active')
    overlay.style.display = 'block'
  overlay.addEventListener('click', () => {
    console.log('clicke on overlay')
    foundModal[0].classList.remove('active')
    overlay.style.display = 'none'
  })

  }

  const openModifyComment = (e) => {
    e.preventDefault()
    //data-comment-update-id

    console.log(e.dataset)
    const id = e.target.id
    console.log(id)

    let foundUpdateModal = document.querySelectorAll(`[data-comment-update-id='${id}']`)
    console.log(foundUpdateModal)
    foundUpdateModal[0].classList.toggle('active')

    let foundRealModal = document.querySelectorAll(`[data-comment-real-id='${id}']`)
    console.log(foundRealModal)
    foundRealModal[0].classList.toggle('inactive')

    let foundModal = document.querySelectorAll(`[data-comment-modal-id='${id}']`)
    foundModal[0].classList.remove('active')
    // En fait ya meme plus de bouton d'options ... faudrait changer pas mal pour arriver à ça

    let btnOpenMenu = document.querySelectorAll(`[data-comment-menu-wrapper-id='${id}']`)
    btnOpenMenu[0].classList.toggle('inactive')

    overlay.style.display = 'none'
  }


  const closeUpdateCommentModal = (e) => {
    e.preventDefault()
    const id = e.currentTarget.id

    let foundUpdateModal = document.querySelectorAll(`[data-comment-update-id='${id}']`)
    console.log(foundUpdateModal)
    foundUpdateModal[0].classList.remove('active')

    let foundRealModal = document.querySelectorAll(`[data-comment-real-id='${id}']`)
    console.log(foundRealModal)
    foundRealModal[0].classList.remove('inactive')

    let btnOpenMenu = document.querySelectorAll(`[data-comment-menu-wrapper-id='${id}']`)
    btnOpenMenu[0].classList.remove('inactive')

    resetUpdateInput(id)
  }


  const resetUpdateInput = (id) => {
    let input = document.querySelectorAll(`[data-comment-input-update='${id}']`)

    input[0].value = ''
  }



  return (
    <>
      <AddNewComment post={props.post} />


           
      <div className="post-comments-list">
      {props.post.comments.length !== 0 ? props.post.comments.map(comment => (
    
       
        userId === comment.user_id || userId === props.post.id ? (
          
        
    
 
          <div className="comment-row">
              <div className="add-new-comment-avatar">

          </div>
          <div className="comment-row-update-container" data-comment-update-id={comment.id}>
              <input
                data-comment-input-update={comment.id}
                id={comment.id}
                placeholder={comment.content}
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    closeUpdateCommentModal(e)
                  }
           
                }}
              />
              <p>Appuyez sur &#xC9;chap pour <span id={comment.id} onClick={(e)=>closeUpdateCommentModal(e)}>annuler.</span></p>
              {/* onChange={(e) => setContent(e.target.value)} onKeyPress={(e)=>createComment(e)} */}

          </div>
            <div className="comment-row-container" data-comment-real-id={comment.id}>
              <div className="comment-row-author">hugo</div>
              <div className="comment-row-content">{comment.content}</div>
              </div>
         
              
    
            <div className="comment-menu-wrapper" data-comment-menu-wrapper-id={comment.id}>
              <img src={dotsMenuIconGrey} alt="comment options" />
              <div className="comment-menu-hidden-hover"
                
                onClick={(e) => toggleModal(e)}
                onMouseOut={(e) => removeCustomHover(e)}
                onMouseOver={(e) => addCustomHover(e)}
                data-comment-btn-id={comment.id}>
              </div>
       


              <div className="comment-menu-hidden" data-comment-modal-id={comment.id}>
            
                
                {props.post.user_id == userId ? 
                <>
                  <div onClick={(e)=>openModifyComment(e)} className="comment-menu-btn update" ><p id={comment.id}>Modifier la publication</p></div>
                    <div onClick={''} className="comment-menu-btn delete"><p>Supprimer la publication</p></div>
                    
              </>
            
              :
         
          
                <div className="comment-menu-btn hide" >
                  
           
                  <p>Masquer la publication</p>
                  </div>
            
              
              }
           
                </div>



            
            </div>
            {/*<button onClick={(e)=>handleDelete(e)} value={comment.id}>delete</button>
            <button>update</button>*/}
          
            </div>
     
           
        )
          : (
     
         

            <div className="comment-row">
              <li>{comment.content}</li>
              </div>
        
        
          )
      
        
     
      )) : ''}
              </div>
    </>
  )
}

export default CommentsList