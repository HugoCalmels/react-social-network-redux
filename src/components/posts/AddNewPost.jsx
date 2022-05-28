// react
import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../redux/features/posts/postsSlice"
//import { selectAllUsers } from '../users/usersSlice'
import Cookies from 'js-cookie';

const AddNewPost = (props) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

    
  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 

  // const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = ((e) => {
    setContent(e.target.value)
    props.setContentSaved(e.target.value)
    if (content.length === 0) {
      //setContent("Quoi de neuf, "+cookieUserInfos.name+" ?")
      props.setContentSaved("Quoi de neuf, "+cookieUserInfos.name+" ?")
    }
  })

  const canSave = Boolean(content) && addRequestStatus === 'idle';

  const tryToCreatePost = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(addNewPost({ title, content })).unwrap()
        setTitle('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        closeModal()
        setAddRequestStatus('idle')
      }
    }
  }



  const closeModal = () => {
    let divAddNewPostModal = document.querySelector('.add-new-post');
    divAddNewPostModal.style.display = "none"
    console.log('GNIEEEEEEEE ?')
    let divOverlay = document.querySelector('.overlay-add-new-post');
    divOverlay.style.display = "none"
    document.body.style.overflow = "visible"
    
  }
  return (
    <div className="add-new-post">
      <h2>Add a new Post</h2>
      <button onClick={closeModal}>X</button>
    <form>
      <label htmlFor="postContent">Content:</label>
        <textarea 
        placeholder={"Quoi de neuf, "+cookieUserInfos.name+"?"}
        name="postContent"
        value={content}
        onChange={onContentChanged}
        />
        
        <button type="button" onClick={tryToCreatePost} disabled={!canSave}>send</button>
    
    </form>
  </div>
)
}


export default AddNewPost