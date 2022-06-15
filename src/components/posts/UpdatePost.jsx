/*

// react
import { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts, getPostsStatus, selectAllPosts } from '../../redux/features/posts/postsSlice'
import "../../Styles/posts/updatePost.scss"
//import { selectAllUsers } from '../users/usersSlice'
*/
// react
import React from "react"
import { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../redux/features/posts/postsSlice";
import { updatePost, updatePostAndImage } from "../../redux/features/posts/postsSlice"
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
  const [imageDidChanged, setImageDidChanged] = useState(false)
  const [preventSaveBtn, setPreventSaveBtn] = useState(false)
  const [noImage, setNoImage] = useState(false)
  const [keepImage, setKeepImage] = useState(false)
  const [imageIsDisplayed, setImageIsDisplayed] = useState(false)
  const [saveState, setSaveState] = useState(false)
  // déclaration des variables
  const canSave = Boolean(contentTextarea) && addRequestStatus === "idle";
  const textareaResizable = document.querySelector(".update-add-post-textarea");
  const customImageElement = document.querySelector(".update-custom-image");
  const sendBtnElement = document.querySelector('.update-label-post-send-btn')
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);

    // what is the use for this .. ?
    let contentReceived;
    if (postUpdateStatus === "loading") {
      contentReceived = <p>" Loading ... "</p>;
    } else if (postUpdateStatus === "succeeded") {

      contentReceived  = postCurrentPost;
    } else if (postUpdateStatus === "error") {
      contentReceived = <p>Error</p>;
    }
  
 

  const onContentChanged = (e) => {
    // sauvegarde le contenu pour l'afficher sur le bouton de la Pagelist
    setContent(e.target.value);
    props.setContentSaved(e.target.value);
    if (content.length === 0) {
      //setContent("Quoi de neuf, "+cookieUserInfos.name+" ?")
      props.setContentSaved("Quoi de neuf, " + cookieUserInfos.name + " ?");
    }
  };

  const submitUpdatePost = (e) => {
    console.log('--------------------------------------')
    console.log('SUBMIT FORM')
    console.log("noImage : " + noImage)

    console.log('imageDidChanged :'+ imageDidChanged)
    console.log('--------------------------------------')
    e.preventDefault();
    if (saveState || canSave) {
      try {
        setAddRequestStatus('pending')
        if (imageDidChanged) {
          if (noImage) {
            console.log('IMAGE IS REMOVED')
            console.log('IMAGE IS REMOVED')
            console.log('IMAGE IS REMOVED ')
            console.log('IMAGE IS REMOVED ')
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: '',
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes
            }
            setLastImage('')
            dispatch(updatePost(post)).unwrap()

            setImageIsDisplayed(false)
            
          } else if (!noImage && !lastImage ) {
            console.log('IMAGE IS REMOVED')
            console.log('IMAGE IS REMOVED')
            console.log('IMAGE IS REMOVED ')
            console.log('IMAGE IS REMOVED ')
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: '',
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes
            }
            setImageIsDisplayed(false)

            dispatch(updatePost( post )).unwrap()
          } else if (!noImage && lastImage) {
          console.log('IMAGE CHANGED // DIFFERENT METHOD TO SUBMIT')
          console.log('IMAGE CHANGED // DIFFERENT METHOD TO SUBMIT')
          console.log('IMAGE CHANGED // DIFFERENT METHOD TO SUBMIT')
          console.log(lastImage)
          console.log(latestImage)
          console.log('IMAGE CHANGED // DIFFERENT METHOD TO SUBMIT')
          // ya qqchose à faire ici après pour les images vides
          console.log(lastImage)
          console.log(latestImage)
          const formData = new FormData();
          console.log('TESTING VALUES')
          console.log(e.target)
          console.log(e.target.contentUpdate.value)
          console.log(latestImage)
          console.log(props)
          formData.append("post[content]", e.target.contentUpdate.value);
          formData.append("post[image]", e.target.imageUpdate.files[0]||latestImage );
          formData.append("post[author]", props.post.author);
          formData.append("post[id]", props.post.id);
          dispatch(updatePostAndImage({ post:formData, id:props.post.id })).unwrap();
            setLastImage(lastImage)

            setImageIsDisplayed(true)
          }
          
        } else {
          if (!noImage) {
            console.log('IMAGE IS REMOVED')
            console.log('IMAGE IS REMOVED')
            console.log('IMAGE IS REMOVED ')
            console.log('IMAGE IS REMOVED ')
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: '',
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes
            }
    
            setLastImage('')
            dispatch(updatePost(post)).unwrap()
            setImageIsDisplayed(false)
          } else {
            let post = {
              id: props.post.id,
              user_id: props.post.user_id,
              content: contentTextarea,
              image_link: props.post.image_link,
              author: props.post.author,
              comments: props.post.comments,
              likes: props.post.likes
            }
  
            dispatch(updatePost(post)).unwrap()
  
            setLastImage(props.post.image_link);
            setImageIsDisplayed(true)
          }
          
        }
        
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        closeModal();
        setAddRequestStatus("idle");
        //customImageElement.style.opacity = 1;
        console.log('*******************************************')
        console.log('THIS IS WHAT I GET WHEN THE REQUEST ENDS')
        console.log(props.post.image_link)
        console.log('*******************************************')
        console.log('============================================')
        console.log('VERY IMPORTANT !! : SETTING NEXT LASTIMAGE ')
        console.log("lastImage:" + lastImage)
        console.log("props:"+props.post.image_link)
        console.log('============================================')
        setLatestImage('');
        //setContentTextarea(props.post.content)
        //setNoImage(false)
        setImageDidChanged(false)
        textareaResizable.style.fontSize = "1.5rem";
        setPreventSaveBtn(true)
        //customImageElement.style.opacity = 1
        setSaveState(true)
      }
    }
  };

  const closeModal = () => {
    let divAddNewPostModal = document.querySelector(".update-post");

    divAddNewPostModal.style.display = "none";
    let divOverlay = document.querySelector(".overlay-update-post");
    divOverlay.style.display = "none";
    document.body.style.overflow = "visible";
  };

  const renderImage = (e) => {

    // relatif a l'ajout d'image dans le textarea ( rien à voir avec le back-end )
    //e.preventDefault();
    setLatestImage(e.target.files[0]);
    setNoImage(false)
    const reader = new FileReader();
    reader.onload = function () {
      setLastImage(reader.result);
      setCustomFontSize(true);
      e.target.value = "";
      setImageDidChanged(true)
      customImageElement.style.opacity = 1
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const resizeTextarea = (e) => {
    // fonction pour changer la fontsize & la heigth du textarea selon les inputs

    let textareaHeightToNumber;
    let textareaHeight;
   // e.style.minHeight = "30px";
   // e.preventDefault();
    e.style.height = "auto";
    // if ( customThing === 1  )
    // e.style.fontSize = "1.5rem"
    // else if ( customThing === 2 )
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
    } else if (
      textareaHeightToNumber <= 164 &&
      e.style.fontSize == "1.5rem"
    ) {
    }

    if (lastImage !== "") {
      e.style.fontSize = ".9375rem";
    }
   
  };

  const RemovePhotoFromInput = (e) => {
    e.preventDefault();
    setLastImage("");
    setLatestImage("");
    setCustomFontSize(false);
    setImageDidChanged(true)
    setNoImage(true)
    customImageElement.style.opacity = 0;
    customImageElement.style.border = '10px solid yellow'
    textareaResizable.style.fontSize = "1.5rem";
    textareaResizable.style.height = "auto";
    textareaResizable.style.height = textareaResizable.scrollHeight + "px";
  };
  useEffect(() => {

    
  }, [submitUpdatePost])
  
  useEffect(() => {
    
    
  }, [imageIsDisplayed])

 



  // useEffects
  useEffect(() => {
    //console.log(contentTextarea)e

    if (Boolean(contentTextarea)) {

      sendBtnElement.classList.add('active')
    }
    else if (sendBtnElement) {
 
      sendBtnElement.classList.remove('active')
    }

/*
    if (lastImage) {
      if (customImageElement !== null) {
        customImageElement.style.opacity = 1
        customImageElement.style.border = '10px solid lightblue'
      }
    } else {
      if (customImageElement !== null) {
        customImageElement.style.opacity = 0
        customImageElement.style.border = '10px solid orange'
      }
    }
    */
  }, [contentTextarea]);

  useEffect(() => {
    
    const textareaResizable = document.querySelector(".update-add-post-textarea");
    
    if (lastImage !== "") {
      //customImageElement.style.opacity = 1;
      //customImageElement.style.border = '10px solid lightgreen'
      textareaResizable.style.fontSize = "1.5rem";
      textareaResizable.style.height = "auto";
      textareaResizable.style.height = textareaResizable.scrollHeight / 2.3 + "px";
      textareaResizable.style.fontSize = ".9375rem";
    }

    if (lastImage === '') {
      setNoImage(true)
      
    }

    console.log('-------------------------------------------------------------')
    /*
    console.log('CONSOLE USEEFFECT LASTIMAGE WHEN DOES THAT SHIT TRIGGERS')
    console.log('post id :' +props.post.id)
    console.log("image link : " +props.post.image_link)
    console.log("custom elem : " + customImageElement)
    console.log("last image:" + lastImage)
    console.log("latestImage : " + latestImage)
    console.log("image did changed:" + imageDidChanged)
    console.log('noImage : '+noImage)
   
    console.log('-------------------------------------------------------------')
    */
    


  }, [lastImage]);

  useEffect(() => {}, [customFontSize]);


  useEffect(() => {

    let customImageElem3  = document.querySelectorAll(`[data-custom-image-id='${props.post.id}']`)
    let customImageElem2 = document.querySelector('.update-custom-image')

    setLatestImage(props.post.image_link);
    setLastImage(props.post.image_link);
    setContentTextarea(props.post.content)
    let variable = document.querySelector('.update-add-post-textarea')
    //variable.style.minHeight = "120px";
    variable.style.minHeight = "120px";


    console.log('0000000000000000000000000000000000000000000000000')
    console.log('hello from useEffect ONCE update')
    console.log(props.post)
    if (props.post.image_link !== null) {
      console.log(props.post.image_link)
    }
    console.log(lastImage)
    console.log(customImageElem3)
    console.log('0000000000000000000000000000000000000000000000000')


    if (props.post.image_link !== null && props.post.image_link === '') {
      console.log('OKE SO IT SHOULD WORK RIGHT ??????????')
      customImageElem3[0].style.opacity = 0
      //customImageElem3.style.border = "10px solid lightgreen"
    } else if (props.post.image_link !== null && props.post.image_link.length > 0) {
      console.log('AYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
      console.log('AYYEE VRAIMENT ??? YA UNE IMAGE VRAIMENT ?? MONTRE LA MOI PUTAIN')
      console.log(props.post)
      console.log(props.post.image_link)
      customImageElem3[0].style.opacity = 1
      //customImageElem2.style.border = "10px solid orange"
    }
 



  }, [])


  useEffect(() => {
    //setLastImage(props.post.image_link)
    //setLastImage(props.post.image_link)
  }, [addRequestStatus,dispatch]);


  useEffect(() => {

      
 
    //setContentTextarea(contentReceived.content)
  }, [contentReceived])

  const fixImage = () => {
    
  }




/*
  if (props.post.image_link && customImageElement && !noImage) {
    customImageElement.style.opacity = 1
  } 
  if (noImage && !imageDidChanged ) {
    customImageElement.style.opacity = 0
  }
  */


 

  

/*
  if (props.post.image_link === '' && customImageElement !== null) {
    customImageElement.style.opacity = 0
    setKeepImage(true)
  } else if (keepImage === true) {
    customImageElement.style.opacity = 1
 }
*/


  /*
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const canSave = addRequestStatus === 'idle';

  const tryToUpdatePost = () => {
    if (canSave) {
      
      try {
        setAddRequestStatus('pending')
        let id = props.post.id
        let author = props.post.author
        dispatch(updatePost({content, id, author, user_id: props.post.user_id})).unwrap()
        setTitle('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
        let updatePostElements = document.querySelectorAll('.update-post')
        let divToUpdate = [...updatePostElements].filter(el => el.id == props.post.id)
    
        divToUpdate[0].style.display = "none"
        let divOverlay = document.querySelector('.overlay-update-post');
    divOverlay.style.display = "none"
    document.body.style.overflow = "visible"
      }
    }
  }
  const method1 = () => {

  }
  const postsStatus = useSelector(getPostsStatus)


  useEffect(() => {
  console.log('HELLLLLO .................?')  
  }, [postsStatus, dispatch])


  const method2 = () => {
    let updatePostElements = document.querySelectorAll('.update-post')
    let divToUpdate = [...updatePostElements].filter(el => el.id == props.post.id)

    divToUpdate[0].style.display = "none"

    let divOverlay = document.querySelector('.overlay-update-post');
    divOverlay.style.display = "none"
    document.body.style.overflow = "visible"
  }
*/
  
  
  return (
    <>
     

      <div className='update-post' id={props.post.id}>
       <div className="update-add-new-post">
      <div className="update-add-new-post-header">
        <h3>Modifier une publication</h3>
        <button onClick={closeModal}>
          <img src={closeIcon} alt="closeModal" />
        </button>
      </div>
      <div className="update-add-new-post-profile-parameters">
        <h5>Photo + Hugo calmels</h5>
      </div>
      <form onSubmit={(e) => submitUpdatePost(e).then(() => fixImage)}>
        <div className="update-textarea-container" id="textarea-container">
          <textarea
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

          <div className="update-custom-image" data-custom-image-id={props.post.id}>
            <button
              className="update-btn-close-textarea-image"
              onClick={(e) => RemovePhotoFromInput(e)}
            >
              <img src={closeIcon} alt="removeImage" />
            </button>
            <img src={lastImage ||props.post.image_link} />
          </div>
        </div>

        <div className="update-add-new-post-options">
          <div className="update-add-new-post-options-header">
            Ajouter à votre publication
          </div>
          <div className="update-add-new-post-list-of-options">
            <div className="update-upload-photo">
              <label for="imageUpdate" className="update-label-file">
                <img src={photoUpload} alt="photoUpload" />
              </label>
              <input
                type="file"
                onChange={(e) => renderImage(e)}
                name="imageUpdate"
                id="imageUpdate"
                className="update-input-file"
              />
            </div>
          </div>
        </div>
        <div className="add-post-send-btn-container">
          <label for="updatePost" className="update-label-post-send-btn">
            Publier
          </label>
          <button
            type="submit"
            disabled={!canSave}
            className="update-add-post-send-btn"
            id="updatePost"
          ></button>
        </div>
      </form>
      </div>
    </div>
    <div className="overlay-update-post"id={props.post.id}></div>

          </>
     
    

  )
}

export default UpdatePost