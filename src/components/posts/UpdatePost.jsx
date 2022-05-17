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
  const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle';

  const tryToUpdatePost = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(updatePost({ title, content, props })).unwrap()
        setTitle('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  const method1 = () => {

  }

  const method2 = () => {
    
  }

  return (
    <div className="update-post">
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
  )
}

export default UpdatePost