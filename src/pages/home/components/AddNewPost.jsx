// react
import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../../redux/features/posts/postsSlice";
// libs
import Cookies from "js-cookie";
// style & images
import closeIcon from "../../../assets/icons/closeIcon.png";
import photoUpload from "../../../assets/icons/photoUpload.png";
import "../../../Styles/posts/addNewPost.scss";
import { selectCurrentUser } from "../../../redux/features/users/usersSlice";
import defaultProfile from "../../../assets/images/defaultProfile.jpg";

const AddNewPost = (props) => {
  // déclaration des états
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [contentTextarea, setContentTextarea] = useState("");
  const [lastImage, setLastImage] = useState("");
  const [latestImage, setLatestImage] = useState("");
  const [customFontSize, setCustomFontSize] = useState(false);
  const [pickedFontSize, setPickedFontSize] = useState(1);
  const currentUser = useSelector(selectCurrentUser);
  // déclaration des variables
  const canSave = Boolean(contentTextarea) && addRequestStatus === "idle";
  const textareaResizable = document.querySelector(".add-post-textarea");
  const customImageElement = document.querySelector(".custom-image");
  const sendBtnElement = document.querySelector(".label-post-send-btn");
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);

  const onContentChanged = (e) => {
    // sauvegarde le contenu pour l'afficher sur le bouton de la Pagelist
    setContent(e.target.value);
    props.setContentSaved(e.target.value);
    if (content.length === 0) {
      //setContent("Quoi de neuf, "+cookieUserInfos.name+" ?")
      props.setContentSaved("Quoi de neuf, " + cookieUserInfos.name + " ?");
    }
  };

  const submitNewPost = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const formData = new FormData();
        formData.append("post[content]", e.target.content.value);
        formData.append("post[image]", latestImage);
        formData.append("post[has_to_be_displayed]", false);
        setAddRequestStatus("pending");
        dispatch(addNewPost({newPost:formData})).unwrap();
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        customImageElement.style.opacity = 0;
        setLatestImage("");
        setLastImage("");
        setContentTextarea("");
        textareaResizable.style.fontSize = "1.5rem";
        closeModal();
        setAddRequestStatus("idle");
      }
    }
  };

  const closeModal = () => {
    let divAddNewPostModal = document.querySelector(".add-new-post");
    divAddNewPostModal.style.display = "none";
    let divOverlay = document.querySelector(".overlay-add-new-post");
    divOverlay.style.display = "none";
    document.body.style.overflow = "visible";
  };

  const renderImage = (e) => {
    // relatif a l'ajout d'image dans le textarea ( rien à voir avec le back-end )

    e.preventDefault();
    resizeImageFunction(e.target.files[0]).then((data) => {
      setLatestImage(data);
      const reader = new FileReader();
      reader.onload = function () {
        setLastImage(reader.result);
        setCustomFontSize(true);
        e.target.value = "";
      };
      reader.readAsDataURL(data);
    });
  };

  const resizeImageFunction = async (file) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  };

  const resizeTextarea = (e) => {
    // fonction pour changer la fontsize & la heigth du textarea selon les inputs
    let textareaHeightToNumber;
    let textareaHeight;
    e.preventDefault();
    e.target.style.height = "auto";
    // if ( customThing === 1  )
    // e.target.style.fontSize = "1.5rem"
    // else if ( customThing === 2 )
    if (e.target.style.fontSize !== "") {
      e.target.style.fontSize = "1.5rem";
    }

    textareaHeight = e.target.scrollHeight + "px";
    e.target.style.height = textareaHeight;
    textareaHeightToNumber = textareaHeight.substring(
      0,
      textareaHeight.length - 2
    );
    e.target.style.height = e.target.scrollHeight + "px";

    if (pickedFontSize === 1) {
      e.target.style.fontSize = "1.5rem";
    }
    if (textareaHeightToNumber >= 132 && e.target.style.fontSize == "1.5rem") {
      e.target.style.fontSize = ".9375rem";
      e.target.style.height = e.target.scrollHeight / 2.3 + "px";
      setCustomFontSize(true);
      setPickedFontSize(1);
    } else if (
      textareaHeightToNumber <= 164 &&
      e.target.style.fontSize == ".9375rem"
    ) {
      e.target.style.fontSize = "1.5rem";
      setCustomFontSize(false);
      setPickedFontSize(2);
    } else if (
      textareaHeightToNumber <= 164 &&
      e.target.style.fontSize == "1.5rem"
    ) {
    }

    if (lastImage !== "") {
      e.target.style.fontSize = ".9375rem";
    }
  };

  const RemovePhotoFromInput = (e) => {
    e.preventDefault();
    setLastImage("");
    setLatestImage("");
    setCustomFontSize(false);
    customImageElement.style.opacity = 0;
    textareaResizable.style.fontSize = "1.5rem";
    textareaResizable.style.height = "auto";
    textareaResizable.style.height = textareaResizable.scrollHeight + "px";
  };

  // useEffects
  useEffect(() => {
    if (Boolean(contentTextarea)) {
      sendBtnElement.classList.add("active");
    } else if (sendBtnElement) {
      sendBtnElement.classList.remove("active");
    }
  }, [contentTextarea]);

  useEffect(() => {
    const textareaResizable = document.querySelector(".add-post-textarea");
    if (lastImage !== "") {
      customImageElement.style.opacity = 1;
      textareaResizable.style.fontSize = "1.5rem";
      textareaResizable.style.height = "auto";
      textareaResizable.style.height =
        textareaResizable.scrollHeight / 2.3 + "px";
      textareaResizable.style.fontSize = ".9375rem";
    }
  }, [lastImage]);

  useEffect(() => {}, [customFontSize]);

  return (
    <div className="add-new-post">
      <div className="add-new-post-header">
        <h3>Créer une publication</h3>
        <button onClick={closeModal}>
          <img src={closeIcon} alt="closeModal" />
        </button>
      </div>
      <div className="add-new-post-profile-parameters">
        <div className="uanp-avatar-container">
          {currentUser.avatar_link === null ||
          currentUser.avatar_link === "" ? (
            <>
              <img src={defaultProfile} />
            </>
          ) : (
            <>
              <img src={currentUser.avatar_link} />
            </>
          )}
        </div>
        <div className="uanp-author">{currentUser.username}</div>
      </div>
      <form onSubmit={(e) => submitNewPost(e)}>
        <div className="textarea-container" id="textarea-container">
          <textarea
            className="add-post-textarea"
            //placeholder={"Quoi de neuf, "+cookieUserInfos.name+"?"}
            //type="text"
            rows="1"
            name="content"
            id="content"
            value={contentTextarea}
            onChange={(e) => {
              setContentTextarea(e.target.value);
              //onContentChanged(e)
              resizeTextarea(e);
            }}
          />

          <div className="custom-image">
            <button
              className="btn-close-textarea-image"
              onClick={(e) => RemovePhotoFromInput(e)}
            >
              <img src={closeIcon} alt="removeImage" />
            </button>
            <img src={lastImage} />
          </div>
        </div>

        <div className="add-new-post-options">
          <div className="add-new-post-options-header">
            Ajouter à votre publication
          </div>
          <div className="add-new-post-list-of-options">
            <div className="upload-photo">
              <label htmlFor="image" className="label-file">
                <img src={photoUpload} alt="photoUpload" />
              </label>
              <input
                type="file"
                onChange={(e) => renderImage(e)}
                name="image"
                id="image"
                className="input-file"
              />
            </div>
          </div>
        </div>
        <div className="add-post-send-btn-container">
          <label htmlFor="addPost" className="label-post-send-btn">
            Publier
          </label>
          <button
            type="submit"
            disabled={!canSave}
            className="add-post-send-btn"
            id="addPost"
          ></button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
