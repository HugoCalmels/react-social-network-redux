import { useState, useEffect } from "react";
import AddNewComment from "./AddNewComment";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  updateComment,

} from "../../../redux/features/posts/postsSlice";
import dotsMenuIconGrey from "../../../assets/icons/dotsMenuIconGrey.png";
import defaultProfile from "../../../assets/images/defaultProfile.jpg";

const CommentsList = (props) => {
  const userId = JSON.parse(Cookies.get("user")).id;
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [lastComment, setLastComment] = useState("");

  const addCustomHover = (e) => {
    e.target.classList.toggle("active-hover");
  };

  const removeCustomHover = (e) => {
    e.target.classList.remove("active-hover");
  };

  const toggleModal = (e) => {
    let overlay = document.querySelector(".main-overlay");
    const test5 = e.target.dataset.commentBtnId;

    let foundModal = document.querySelectorAll(
      `[data-comment-modal-id='${test5}']`
    );
    foundModal[0].classList.toggle("active");
    overlay.style.display = "block";
    overlay.addEventListener("click", () => {
      foundModal[0].classList.remove("active");
      overlay.style.display = "none";
    });
  };

  const openModifyComment = (e) => {
    let overlay = document.querySelector(".main-overlay");
    e.preventDefault();
    //data-comment-update-id

    const id = e.target.id;

    let foundUpdateModal = document.querySelectorAll(
      `[data-comment-update-id='${id}']`
    );

    foundUpdateModal[0].classList.toggle("active");

    let foundRealModal = document.querySelectorAll(
      `[data-comment-real-id='${id}']`
    );

    foundRealModal[0].classList.toggle("inactive");

    let foundModal = document.querySelectorAll(
      `[data-comment-modal-id='${id}']`
    );
    foundModal[0].classList.remove("active");
    // En fait ya meme plus de bouton d'options ... faudrait changer pas mal pour arriver à ça

    let btnOpenMenu = document.querySelectorAll(
      `[data-comment-menu-wrapper-id='${id}']`
    );
    btnOpenMenu[0].classList.toggle("inactive");

    overlay.style.display = "none";
  };

  const closeUpdateCommentModal = (e, commentContent) => {
    e.preventDefault();
    const id = e.currentTarget.id;

    let foundUpdateModal = document.querySelectorAll(
      `[data-comment-update-id='${id}']`
    );

    foundUpdateModal[0].classList.remove("active");

    let foundRealModal = document.querySelectorAll(
      `[data-comment-real-id='${id}']`
    );

    foundRealModal[0].classList.remove("inactive");

    let btnOpenMenu = document.querySelectorAll(
      `[data-comment-menu-wrapper-id='${id}']`
    );
    btnOpenMenu[0].classList.remove("inactive");

    resetUpdateInput(id, commentContent);
  };

  const resetUpdateInput = (id, commentContent) => {
    let input = document.querySelectorAll(
      `[data-comment-input-update='${id}']`
    );

    input[0].defaultValue = commentContent;
  };

  const tryToUpdateComment = (e, commentContent) => {
    setLastComment(e);
    dispatch(
      updateComment({
        comment_id: e.currentTarget.id,
        post: props.post,
        comment_content: e.target.value,
      })
    ).unwrap();
    closeUpdateCommentModal(e, commentContent);
  };

  const destroyComment = (e, id) => {
    let overlay = document.querySelector(".main-overlay");

    dispatch(
      deleteComment({ comment_id: e.target.id, post: props.post })
    ).unwrap();
    overlay.style.display = "none";
    let elem = document.querySelector(`.post-comments-list.id${id}`);
    let modals = elem.querySelectorAll(".comment-menu-hidden");
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
  };

  const hideComment = () => {
    alert("Fonctionnalité en développement.");
  };

  return (
    <>
      <AddNewComment post={props.post} />

      <div className={`post-comments-list id${props.post.id}`}>
        {props.post.comments.length !== 0
          ? props.post.comments.map((comment,index) =>
              userId === comment.user_id ? (
                <div className="comment-row" key={index}>
                  <div className="add-new-comment-avatar">
                    {comment.user.avatar_link !== null ? (
                      <>
                        <img
                          src={comment.user.avatar_link}
                          alt="avatarImage"
                        ></img>
                      </>
                    ) : (
                      <>
                        <img src={defaultProfile} alt="avatarImage"></img>
                      </>
                    )}
                  </div>
                  <div
                    className="comment-row-update-container"
                    data-comment-update-id={comment.id}
                  >
                    <input
                      data-comment-input-update={comment.id}
                      id={comment.id}
                      //placeholder={comment.content}
                      type="text"
                      defaultValue={comment.content}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          closeUpdateCommentModal(e, comment.content);
                        }
                        if (e.key === "Enter") {
                          tryToUpdateComment(e, comment.content);
                        }
                      }}
                    />
                    <p>
                      Appuyez sur &#xC9;chap pour{" "}
                      <span
                        id={comment.id}
                        onClick={(e) =>
                          closeUpdateCommentModal(e, comment.content)
                        }
                      >
                        annuler.
                      </span>
                    </p>
                  </div>
                  <div
                    className="comment-row-container"
                    data-comment-real-id={comment.id}
                  >
                    <div className="comment-row-author">{comment.author}</div>
                    <div className="comment-row-content">{comment.content}</div>
                  </div>

                  <div
                    className="comment-menu-wrapper"
                    data-comment-menu-wrapper-id={comment.id}
                  >
                    <img src={dotsMenuIconGrey} alt="comment options" />
                    <div
                      className="comment-menu-hidden-hover"
                      onClick={(e) => toggleModal(e)}
                      onMouseOut={(e) => removeCustomHover(e)}
                      onMouseOver={(e) => addCustomHover(e)}
                      data-comment-btn-id={comment.id}
                    ></div>

                    <div
                      className="comment-menu-hidden"
                      data-comment-modal-id={comment.id}
                    >
                      {comment.user_id == userId ? (
                        <>
                          <div
                            onClick={(e) => openModifyComment(e)}
                            className="comment-menu-btn update"
                          >
                            <p id={comment.id}>Modifier la publication</p>
                          </div>
                          <div
                            onClick={(e) => destroyComment(e, props.post.id)}
                            className="comment-menu-btn delete"
                          >
                            <p id={comment.id}>Supprimer la publication</p>
                          </div>
                        </>
                      ) : (
                        <div className="comment-menu-btn hide">
                          <p onClick={hideComment}>Masquer la publication</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="comment-row">
                  <div className="add-new-comment-avatar">
                    {comment.user.avatar_link !== null ? (
                      <>
                        <img
                          src={comment.user.avatar_link}
                          alt="avatarImage"
                        ></img>
                      </>
                    ) : (
                      <>
                        <img src={defaultProfile} alt="avatarImage"></img>
                      </>
                    )}
                  </div>
                  <div
                    className="comment-row-container"
                    data-comment-real-id={comment.id}
                  >
                    <div className="comment-row-author">{comment.author}</div>
                    <div className="comment-row-content">{comment.content}</div>
                  </div>
                  <div
                    className="comment-menu-wrapper"
                    data-comment-menu-wrapper-id={comment.id}
                  >
                    <img src={dotsMenuIconGrey} alt="comment options" />
                    <div
                      className="comment-menu-hidden-hover"
                      onClick={(e) => toggleModal(e)}
                      onMouseOut={(e) => removeCustomHover(e)}
                      onMouseOver={(e) => addCustomHover(e)}
                      data-comment-btn-id={comment.id}
                    ></div>

                    <div
                      className="comment-menu-hidden"
                      data-comment-modal-id={comment.id}
                    >
                      {comment.user_id == userId ? (
                        <>
                          <div
                            onClick={(e) => openModifyComment(e)}
                            className="comment-menu-btn update"
                          >
                            <p id={comment.id}>Modifier la publication</p>
                          </div>
                          <div
                            onClick={(e) => destroyComment(e)}
                            className="comment-menu-btn delete"
                          >
                            <p id={comment.id}>Supprimer la publication</p>
                          </div>
                        </>
                      ) : (
                        <div className="comment-menu-btn hide">
                          <p>Masquer la publication</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
    </>
  );
};

export default CommentsList;
