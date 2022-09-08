import React from "react";
import { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import {
  updatePost,
  updatePostAndImageAnyButLast,
} from "../../redux/features/posts/postsSlice";
// libs
import Cookies from "js-cookie";
// style & images
import closeIcon from "../../assets/icons/closeIcon.png";
import photoUpload from "../../assets/icons/photoUpload.png";
import "../../Styles/posts/updatePost.scss";
import {
  getUpdatedStatus,
  getCurrentPost,
} from "../../redux/features/posts/postsSlice";

const UpdatePost = (props) => {
  // déclaration des états
  const dispatch = useDispatch();
  const postUpdateStatus = useSelector(getUpdatedStatus);
  const postCurrentPost = useSelector(getCurrentPost);
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [contentTextarea, setContentTextarea] = useState("");
  const [lastImage, setLastImage] = useState("");
  const [latestImage, setLatestImage] = useState("");
  const [customFontSize, setCustomFontSize] = useState(false);
  const [pickedFontSize, setPickedFontSize] = useState(1);
  const [imageDidChanged, setImageDidChanged] = useState(false);
  const [preventSaveBtn, setPreventSaveBtn] = useState(false);
  const [noImage, setNoImage] = useState(false);
  const [imageIsDisplayed, setImageIsDisplayed] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const [removePost, setRemovePost] = useState(false);
  // déclaration des variables
  const canSave = Boolean(contentTextarea) && addRequestStatus === "idle";

  const customImageElement = document.querySelectorAll(
    `[data-custom-image-id='${props.post.id}']`
  )[0];
  const sendBtnElement = document.querySelectorAll(
    `[data-update-send-btn-id='${props.post.id}']`
  )[0];
  const textareaResizable = document.querySelectorAll(
    `[data-update-post-textarea-id='${props.post.id}']`
  )[0];
  const temporalyImage = document.querySelectorAll(
    `[data-update-temporaly-image-id='${props.post.id}']`
  )[0];

  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);

  let contentReceived;
  if (postUpdateStatus === "loading") {
    contentReceived = <p>" Loading ... "</p>;
  } else if (postUpdateStatus === "succeeded") {
    contentReceived = postCurrentPost;
  } else if (postUpdateStatus === "error") {
    contentReceived = <p>Error</p>;
  }

  const submitUpdatePost = (e) => {
    e.preventDefault();

    if (saveState || canSave) {
      try {
        setAddRequestStatus("pending");

        if (imageDidChanged) {
          if (noImage) {
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: "",
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes,
              has_to_be_displayed: false,
            };
            setLastImage("");
            dispatch(updatePost(post)).unwrap();

            setImageIsDisplayed(false);
          } else if (!noImage && !lastImage) {
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: "",
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes,
              has_to_be_displayed: false,
            };
            setImageIsDisplayed(false);

            dispatch(updatePost(post)).unwrap();
          } else if (!noImage && lastImage) {
            // ya qqchose à faire ici après pour les images vides

            const formData = new FormData();

            formData.append("post[content]", e.target.contentUpdate.value);
            formData.append(
              "post[image]",
              e.target.imageUpdate.files[0] || latestImage
            );
            formData.append("post[author]", props.post.author);
            formData.append("post[id]", props.post.id);
            formData.append("post[has_to_be_displayed]", true);

            dispatch(
              updatePostAndImageAnyButLast({
                post: formData,
                id: props.post.id,
              })
            ).unwrap();
            setRemovePost(true);

            setLastImage(lastImage);

            setImageIsDisplayed(true);
          }
        } else {
          if (!noImage) {
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: "",
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes,
              has_to_be_displayed: false,
            };

            setLastImage("");
            dispatch(updatePost(post)).unwrap();
            setImageIsDisplayed(false);
          } else {
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: props.post.image_link,
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes,
              has_to_be_displayed: false,
            };

            dispatch(updatePost(post)).unwrap();

            setLastImage(props.post.image_link);
            setImageIsDisplayed(true);
          }
        }
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        closeModal();
        setAddRequestStatus("idle");
        setLatestImage("");
        setImageDidChanged(false);
        textareaResizable.style.fontSize = "1.5rem";
        setPreventSaveBtn(true);
        setSaveState(true);
      }
    }
  };

  const closeModal = (e) => {
    let divAddNewPostModal = document.querySelectorAll(
      `[data-update-post-id='${props.post.id}']`
    );
    let divOverlay = document.querySelectorAll(
      `[data-overlay-update-post-id='${props.post.id}']`
    );

    divAddNewPostModal[0].style.display = "none";
    divOverlay[0].style.display = "none";

    document.body.style.overflow = "visible";
  };

  const renderImage = (e) => {
    temporalyImage.style.display = "block";
    setLatestImage(e.target.files[0]);
    setNoImage(false);
    const reader = new FileReader();
    reader.onload = function () {
      setLastImage(reader.result);
      setCustomFontSize(true);
      e.target.value = "";
      setImageDidChanged(true);
      customImageElement.style.opacity = 1;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const resizeTextarea = (e) => {
    // fonction pour changer la fontsize & la heigth du textarea selon les inputs

    let textareaHeightToNumber;
    let textareaHeight;
    e.style.height = "auto";
    if (e.style.fontSize !== "") {
      e.style.fontSize = "1.5rem";
    }

    textareaHeight = e.scrollHeight + "px";
    e.style.height = textareaHeight;
    textareaHeightToNumber = textareaHeight.substring(
      0,
      textareaHeight.length - 2
    );
    e.style.height = e.scrollHeight + "px";

    if (pickedFontSize === 1) {
      e.style.fontSize = "1.5rem";
    }
    if (textareaHeightToNumber >= 132 && e.style.fontSize == "1.5rem") {
      e.style.fontSize = ".9375rem";
      e.style.height = e.scrollHeight / 2.3 + "px";
      setCustomFontSize(true);
      setPickedFontSize(1);
    } else if (
      textareaHeightToNumber <= 164 &&
      e.style.fontSize == ".9375rem"
    ) {
      e.style.fontSize = "1.5rem";
      setCustomFontSize(false);
      setPickedFontSize(2);
      e.style.border = "4px solid blue";
    } else if (textareaHeightToNumber <= 164 && e.style.fontSize == "1.5rem") {
    }

    if (lastImage !== "") {
      e.style.fontSize = ".9375rem";
      if (textareaHeightToNumber >= 132 && textareaHeightToNumber <= 164) {
        e.style.fontSize = "1.5rem";
      } else if (textareaHeightToNumber >= 164) {
        e.style.fontSize = "0.9375rem";
      }
    }
  };

  const RemovePhotoFromInput = (e) => {
    e.preventDefault();
    setLastImage("");
    setLatestImage("");
    setCustomFontSize(false);
    setImageDidChanged(true);
    setNoImage(true);
    customImageElement.style.opacity = 0;
    textareaResizable.style.fontSize = "1.5rem";
    textareaResizable.style.height = "auto";
    textareaResizable.style.height = textareaResizable.scrollHeight + "px";

    temporalyImage.style.display = "none";
  };
  useEffect(() => {}, [submitUpdatePost]);

  useEffect(() => {}, [imageIsDisplayed]);

  useEffect(() => {
  }, [postUpdateStatus]);


  useEffect(() => {


    if (Boolean(contentTextarea)) {
      sendBtnElement.classList.add("active");
    } else if (sendBtnElement) {
      sendBtnElement.classList.remove("active");
    }

  }, [contentTextarea]);

  useEffect(() => {
    const textareaResizable = document.querySelectorAll(
      `[data-update-post-textarea-id='${props.post.id}']`
    )[0];
    if (lastImage !== "") {
      if (
        textareaResizable.scrollHeight >= 132 &&
        textareaResizable.scrollHeight <= 164
      ) {
        textareaResizable.style.fontSize = "1.5rem";
      } else if (textareaResizable.scrollHeight >= 164) {
        textareaResizable.style.fontSize = ".9375rem";
      }

      textareaResizable.style.height = "auto";
      textareaResizable.style.height =
        textareaResizable.scrollHeight / 2.3 + "px";
    }

    if (lastImage === "") {
      setNoImage(true);
    }

  }, [lastImage]);

  useEffect(() => {}, [customFontSize]);

  useEffect(() => {
    let customImageElem3 = document.querySelectorAll(
      `[data-custom-image-id='${props.post.id}']`
    );
    let textareaResizable2 = document.querySelectorAll(
      `[data-update-post-textarea-id='${props.post.id}']`
    )[0];

    setLatestImage(props.post.image_link);
    setLastImage(props.post.image_link);
    setContentTextarea(props.post.content);
    let variable = document.querySelector(".update-add-post-textarea");
    variable.style.minHeight = "120px";

    if (props.post.image_link !== null && props.post.image_link === "") {
      customImageElem3[0].style.opacity = 0;
    } else if (
      props.post.image_link !== null &&
      props.post.image_link.length > 0
    ) {
      customImageElem3[0].style.opacity = 1;
    }

    textareaResizable2.style.height = "auto";
    textareaResizable2.style.minHeight = "120px";

  }, []);

  useEffect(() => {

  }, [addRequestStatus, dispatch]);

  useEffect(() => {

  }, [contentReceived]);



  useEffect(() => {}, [props]);


  return (
    <>
      <div
        className="update-post"
        id={props.post.id}
        data-update-post-id={props.post.id}
      >
        <div className="update-add-new-post">
          <div className="update-add-new-post-header">
            <h3>Modifier une publication</h3>
            <button onClick={closeModal} value={props.post.id}>
              <img src={closeIcon} alt="closeModal" />
            </button>
          </div>
          <div className="update-add-new-post-profile-parameters">
            <div className="uanp-avatar-container">
                {props.post.user.avatar_link === null ||
                    props.post.user.avatar_link === "" ? (
                      <>
                        <img src={defaultProfile} alt="avatar"/>
                      </>
                    ) : (
                      <>
                        <img src={props.post.user.avatar_link} alt="avatar"/>
                      </>
                    )}
            </div>
            <div className="uanp-author">{props.post.user.username}</div>
          </div>
          <form onSubmit={(e) => submitUpdatePost(e)} key={props.post.id}>
            <div className="update-textarea-container" id="textarea-container">
              <textarea
                data-update-post-textarea-id={props.post.id}
                className="update-add-post-textarea"
                //placeholder={props.post.content}
                //type="text"
                rows="1"
                name="contentUpdate"
                id="contentUpdate"
                value={contentTextarea || props.post.content}
                onChange={(e) => {
                  setContentTextarea(e.target.value);
                  //onContentChanged(e)
                  resizeTextarea(e.target);
                }}
              ></textarea>

              <div
                className="update-custom-image"
                data-custom-image-id={props.post.id}
              >
                <button
                  className="update-btn-close-textarea-image"
                  onClick={(e) => RemovePhotoFromInput(e)}
                >
                  <img src={closeIcon} alt="removeImage" />
                </button>
                <img
                  src={lastImage || props.post.image_link}
                  data-update-temporaly-image-id={props.post.id}
                  alt="last image"
                />
              </div>
            </div>

            <div className="update-add-new-post-options">
              <div className="update-add-new-post-options-header">
                Ajouter à votre publication
              </div>
              <div className="update-add-new-post-list-of-options">
                <div className="update-upload-photo">
                  <label
                    htmlFor={`imageUpdate-${props.post.id}`}
                    className="update-label-file"
                  >
                    <img src={photoUpload} alt="photoUpload" />
                  </label>
                  <input
                    type="file"
                    onChange={(e) => renderImage(e)}
                    name="imageUpdate"
                    id={`imageUpdate-${props.post.id}`}
                    className="update-input-file"
                  />
                </div>
              </div>
            </div>
            <div className="add-post-send-btn-container">
              <label
                htmlFor={`updatePost-${props.post.id}`}
                className="update-label-post-send-btn"
                data-update-send-btn-id={props.post.id}
              >
                Publier
              </label>
              <button
                type="submit"
                disabled={!canSave}
                className="update-add-post-send-btn"
                id={`updatePost-${props.post.id}`}
              ></button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="overlay-update-post"
        id={props.post.id}
        data-overlay-update-post-id={props.post.id}
      ></div>
    </>
  );
};

export default UpdatePost;
