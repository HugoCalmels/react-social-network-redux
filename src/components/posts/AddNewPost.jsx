// react
import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../redux/features/posts/postsSlice"
//import { selectAllUsers } from '../users/usersSlice'

const AddNewPost = () => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle';

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
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <section>
    <h2>Add a new Post</h2>
    <form>
      <label htmlFor="postTitle">Post Title:</label>
      <input
        type="text"
        name="postTitle"
        value={title}
        onChange={onTitleChanged}
      />
      <label htmlFor="postContent">Content:</label>
      <textarea 
        name="postContent"
        value={content}
        onChange={onContentChanged}
      />
      <button type="button" onClick={tryToCreatePost} disabled={!canSave}>send</button>
    </form>
  </section>
)
}


export default AddNewPost