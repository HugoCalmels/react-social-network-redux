// redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/posts/postsSlice"

const Post = ({ post }) => {

  const dispatch = useDispatch()

  const tryToDeletePost = () => {
    dispatch(deletePost({ id: post.id }))
  }

  // ------- WORKING ON HERE ---------- //

  const tryToUpdatePost = () => {
    // obvisouly not deletePost...
    dispatch(deletePost({ id: post.id }))
  }

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <h3>{post.id}</h3>
      <p>{post.content}</p>
      <p>by {post.author}</p>
      <button onClick={tryToDeletePost}>delete post</button>
      <button onClick={tryToUpdatePost}>update post</button>
    </div>
  )
}

export default Post