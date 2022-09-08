import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../../redux/features/posts/postsSlice";
import {
  selectCurrentUser,
} from "../../../redux/features/users/usersSlice";
import defaultProfile from "../../../assets/images/defaultProfile.jpg";


const AddNewComment = (props) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {}, [content]);

  const createComment = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      dispatch(
        addNewComment({ content: content, postId: props.post.id })
      ).unwrap();
      e.target.value = "";
    }
  };
  

  return (
    <div className="add-new-comment">
      <div className="add-new-comment-avatar">
      {currentUser.avatar_link !== null ? (
            <>
              <img src={currentUser.avatar_link} alt="avatarImage"></img>
            </>
          ) : (
            <>
              <img src={defaultProfile} alt="avatarImage"></img>
            </>
          )}
      </div>
      <div className="add-new-comment-input">
        <input
          name={`comment-post-${props.post.id}`}
          placeholder="Ecrivez un commentaire"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => createComment(e)}
        ></input>
      </div>
    </div>
  );
};

export default AddNewComment;
