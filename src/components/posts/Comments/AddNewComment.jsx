import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../../redux/features/posts/postsSlice"


const AddNewComment = (props) => {

  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  useEffect(() => {

  }, [content])
  
  const createComment = (e) => {

   

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      dispatch(addNewComment({content: content, postId: props.post.id})).unwrap()
    }

  }

  return (
    <div className="add-new-comment">
      <div className="add-new-comment-avatar">

      </div>
      <div className="add-new-comment-input">
      <input placeholder="Ecrivez un commentaire"type="text" onChange={(e) => setContent(e.target.value)} onKeyPress={(e)=>createComment(e)}></input>

      </div>


    </div>
  )
}


export default AddNewComment