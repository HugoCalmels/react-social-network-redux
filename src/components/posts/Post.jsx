import { useEffect, useState } from "react";
// redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/posts/postsSlice";
import { addNewLike } from "../../redux/features/posts/postsSlice";
import { removeLike } from "../../redux/features/posts/postsSlice";
// components
import UpdatePost from "./UpdatePost";
import Cookies from "js-cookie";
import CommentsList from "./Comments/CommentsList";

import dotsMenuIconGrey from "../../assets/icons/dotsMenuIconGrey.png";
import pencilIcon from "../../assets/icons/pencilIcon.png";
import trashIcon from "../../assets/icons/trashIcon.png";
import closeIcon from "../../assets/icons/closeIcon.png";
import rightCurvedArrow2 from "../../assets/icons/rightCurvedArrow2.png";
import commentsIcon from "../../assets/icons/commentsIcon.png";
import {
  selectSelectedFriendList,
  selectSelectedUserCommonFriends,
  selectCurrentUser,
} from "../../redux/features/users/usersSlice";
import thumbsUpIcon2 from "../../assets/icons/thumbsUpIcon2.png";
import {
  getUpdatedStatus,
  getCurrentPost,
} from "../../redux/features/posts/postsSlice";
import { useSelector } from "react-redux";
import "../../Styles/posts/post.scss";
import defaultProfile from "../../assets/images/defaultProfile.jpg";


const Post = (props) => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [showUpdatePost, setShowUpdatePost] = useState(false);
  const selectedFriendlist = useSelector(selectSelectedFriendList);
  const selectedUserWithCM = useSelector(selectSelectedUserCommonFriends);
  const dispatch = useDispatch();

  // redux part to make it refresh that component
  const postUpdateStatus = useSelector(getUpdatedStatus);
  const postCurrentPost = useSelector(getCurrentPost);
  const currentUser = useSelector(selectCurrentUser);

  //const currentPost = useSelector(getCurrentPost);
  useEffect(() => {
    if (postUpdateStatus === "idle") {
    }
  }, [postUpdateStatus, dispatch]);

  let content;
  if (postUpdateStatus === "loading") {
    content = <p>" Loading ... "</p>;
  } else if (postUpdateStatus === "succeeded") {
    let renderedPost = postCurrentPost;

    content = renderedPost;
  } else if (postUpdateStatus === "error") {
    content = <p>Error</p>;
  }

  // end redux

  const tryToDeletePost = (e) => {
    if (addRequestStatus === "idle") {
      try {
        setAddRequestStatus("pending");
        dispatch(deletePost({ id: props.post.id }));
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  useEffect(() => {}, [showUpdatePost]);

  const openUpdatePost = () => {
    let updatePostElements = document.querySelectorAll(".update-post");
    let divToUpdate = [...updatePostElements].filter(
      (el) => el.id == props.post.id
    );

    divToUpdate[0].style.display = "block";

    let divOverlay = document.querySelectorAll(
      `[data-overlay-update-post-id='${props.post.id}']`
    )[0];

    divOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    divOverlay.addEventListener("click", () => {
      divOverlay.style.display = "none";
      divToUpdate[0].style.display = "none";
      document.body.style.overflow = "visible";
    });
  };

  // ------- WORKING ON HERE ---------- //
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);
  // test user id & co

  const openOptionsModal = (e) => {
    let overlay = document.querySelector(".main-overlay");
    e.preventDefault();

    overlay.style.display = "block";
    let hiddenModal = document.querySelectorAll(
      `[data-option-modal-id='${props.post.id}']`
    )[0];
    hiddenModal.classList.toggle("active");

    overlay.addEventListener("click", () => {
      hiddenModal.classList.remove("active");
      overlay.style.display = "none";
    });

    let wrapper = document.querySelectorAll(
      `[data-wrapper-id='${props.post.id}']`
    )[0];
    wrapper.addEventListener("click", () => {
      hiddenModal.classList.remove("active");
      overlay.style.display = "none";
    });
  };

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const reworkedCreatedAt = props.post.created_at.split(/[-T]+/);

  //const year = reworkedCreatedAt[0]
  const dayInNumbersWithZero = reworkedCreatedAt[1];
  const dayInNumbers = dayInNumbersWithZero
    .split("")
    .filter((el) => el !== "0")
    .join("");
  const day = monthNames[parseInt(dayInNumbers) - 1];
  const hour = reworkedCreatedAt[3].substring(0, 5);
  const day2 = parseInt(reworkedCreatedAt[2]);

  let testaa = props.post.likes.filter((el) => {
    return el.user_id === cookieUserInfos.id;
  });

  let likeId;
  if (testaa[0]) likeId = testaa[0].id;
  else likeId = "none";

  const focusCommentInput = (e) => {
    let test = document.querySelector(
      `input[name=comment-post-${e.currentTarget.id}]`
    );
    test.focus();
  };

  const hidePost = (e) => {
    e.stopPropagation();
    alert("Fonctionnalité en développement.");
  };
  const sharePost = () => {
    alert("Fonctionnalité en développement.");
  };

  const createLike = (e) => {
    dispatch(
      addNewLike({ post: props.post, userId: cookieUserInfos })
    ).unwrap();
  };

  const unLike = (e) => {
    dispatch(
      removeLike({ post: props.post, like_id: e.currentTarget.id })
    ).unwrap();
  };

  return (
    <>
      <div className="post-wrapper" data-wrapper-id={props.post.id}>
        <div className="post-header">
          <div className="post-author-avatar">
            {props.post.user.avatar_link !== null ? (
              <>
                <img src={props.post.user.avatar_link} alt="avatarImage"></img>
              </>
            ) : (
              <>
                <img src={defaultProfile} alt="avatarImage"></img>
              </>
            )}
          </div>
          <div className="post-author-infos">
            <div className="post-author">
              {props.post.author}
            </div>
            <div className="post-created-at">
              {day2} {day}, {hour}{" "}
            </div>
          </div>

          <div className="post-author-options">
            <div
              className="post-author-options-btn"
              onClick={(e) => openOptionsModal(e)}
            >
              <img src={dotsMenuIconGrey} alt="post-menu-options" />
            </div>
          </div>

          <div
            className="post-author-options-modal-container"
            data-option-modal-id={props.post.id}
          >
            {props.post.user_id == cookieUserInfos.id ? (
              <>
                <div
                  onClick={openUpdatePost}
                  className="post-author-options-btn-update"
                >
                  <img src={pencilIcon} alt="modify post" />
                  <p>Modifier la publication</p>
                </div>
                <div
                  onClick={(e) => tryToDeletePost(e)}
                  className="post-author-options-btn-delete"
                >
                  <img src={trashIcon} alt="modify post" />
                  <p>Supprimer la publication</p>
                </div>
              </>
            ) : (
              <div className="post-author-options-btn-hide-wrapper">
                <button
                  className="post-author-options-btn-hide"
                  onClick={(e) => hidePost(e)}
                >
                  <div className="post-author-options-btn-hide-container">
                    <img src={closeIcon} alt=" modify post" />
                  </div>
                  <p>Masquer la publication</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="post-content">
          <p>{props.post.content}</p>
          <div className="post-content-image">
            {props.post.image_link !== '' && props.post.image_link !== null ?
               <img src={props.post.image_link} alt="post's image" />
              :
              <></>
            }
           
          </div>
        </div>

        <div className="post-comments-header">
          <div className="post-comments-likes-count">
            {props.post.likes.length === 0 ? (
              <>{props.post.likes.length} like(s)</>
            ) : props.post.likes.length === 1 ? (
              <>{props.post.likes.length} like</>
            ) : props.post.likes.length > 1 ? (
              <>{props.post.likes.length} likes</>
            ) : (
              <></>
            )}
          </div>
          <div className="post-comments-comments-count">
            {props.post.comments.length === 0 ? (
              <>{props.post.comments.length} commentaire(s)</>
            ) : props.post.comments.length === 1 ? (
              <>{props.post.comments.length} commentaire</>
            ) : props.post.comments.length > 1 ? (
              <>{props.post.comments.length} commentaires</>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="post-comments-options">
          {props.post.likes.some(
            (like) => like.user_id === cookieUserInfos.id
          ) ? (
            <>
              <div
                className="post-comments-option dislike"
                onClick={(e) => unLike(e)}
                id={likeId}
              >
                <img src={thumbsUpIcon2} alt="thumps up" />
                <span>J'aime pas</span>
              </div>
            </>
          ) : (
            <div
              className="post-comments-option like"
              onClick={(e) => createLike(e)}
              id={props.post.id}
            >
              <img src={thumbsUpIcon2} alt="thumps up" />
              <span>J'aime</span>
            </div>
          )}

          <div
            className="post-comments-option comment"
            id={props.post.id}
            onClick={(e) => focusCommentInput(e)}
          >
            <img src={commentsIcon} alt="comment" />
            <span>Commenter</span>
          </div>
          <div className="post-comments-option share">
            <img src={rightCurvedArrow2} alt="share" />
            <span onClick={sharePost}>Partager</span>
          </div>
        </div>

        <div className="post-comments-content">
          <CommentsList post={props.post} />
        </div>
      </div>

      {/* RELATED TO UPDATE POST, ITS A MODAL */}
      <UpdatePost
        post={props.post}
        content={props.content}
        removeLastPost={props.removeLastPost}
      />
    </>
  );
};

export default Post;
