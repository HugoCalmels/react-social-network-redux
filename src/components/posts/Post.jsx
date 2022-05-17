import { useEffect, useState } from 'react'
// redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/posts/postsSlice"
// components
import UpdatePost from './UpdatePost'


const Post = (props) => {

  const [showUpdatePost, setShowUpdatePost] = useState(false)

  const dispatch = useDispatch()

  const tryToDeletePost = () => {
    dispatch(deletePost({ id: props.post.id }))
  }

  useEffect(() => {

  }, [showUpdatePost])

  const tryToUpdatePost = () => {
    console.log('test')
    if (showUpdatePost === false)
      setShowUpdatePost(true)
    else
      setShowUpdatePost(false)
  }

  // ------- WORKING ON HERE ---------- //



  return (
    <>
      <div className="post">
        <h3>{props.post.title}</h3>
        <h3>{props.post.id}</h3>
        <p>{props.post.content}</p>
        <p>by {props.post.author}</p>
        <button onClick={tryToDeletePost}>delete post</button>
        <button onClick={tryToUpdatePost}>update post</button>
      </div>
      {/* RELATED TO UPDATE POST, ITS A MODAL */}
      {showUpdatePost ? <UpdatePost post={props.post}/> : <></>}
    </>
  )
}

export default Post