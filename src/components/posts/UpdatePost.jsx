// react
import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/features/posts/postsSlice"
//import { selectAllUsers } from '../users/usersSlice'

const UpdatePost = (props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const canSave = Boolean(content) && addRequestStatus === 'idle';



  const tryToUpdatePost = () => {
   
    if (canSave) {
      
      try {
        setAddRequestStatus('pending')
        let id = props.post.id
        let author = props.post.author
        let user_id = props.post.user_id
        dispatch(updatePost({ title, content, id, author, user_id})).unwrap()
        setTitle('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
        let updatePostElements = document.querySelectorAll('.update-post')
        let divToUpdate = [...updatePostElements].filter(el => el.id == props.post.id)
    
        divToUpdate[0].style.display = "none"
        let divOverlay = document.querySelector('.overlay-update-post');
    divOverlay.style.display = "none"
    document.body.style.overflow = "visible"
      }
    }
  }
  const method1 = () => {

  }

  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')
  console.log(props)
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')
  console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')

  const method2 = () => {
    let updatePostElements = document.querySelectorAll('.update-post')
    let divToUpdate = [...updatePostElements].filter(el => el.id == props.post.id)

    divToUpdate[0].style.display = "none"

    let divOverlay = document.querySelector('.overlay-update-post');
    divOverlay.style.display = "none"
    document.body.style.overflow = "visible"
  }

  return (
    <>
    <div className='update-post' id={props.post.id}>
      <h1>UPDATE POST</h1>
      <input
        type="text"
        placeholder={props.post.title}
        value={title}
        onChange={onTitleChanged}
      >
      </input>
      <textarea
        placeholder={props.post.content}
        value={content}
        onChange={onContentChanged}
      >
      </textarea>
      <button onClick={tryToUpdatePost}>validate</button>
      <button onClick={method2}>cancel</button>
    </div>
    <div className="overlay-update-post"></div>
    </>
  )
}

export default UpdatePost