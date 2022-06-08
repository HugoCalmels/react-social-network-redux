// react
import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../redux/features/posts/postsSlice"
//import { selectAllUsers } from '../users/usersSlice'
import Cookies from 'js-cookie';
import LatestImage from "./LatestImage"
import { updatePost } from "../../redux/features/posts/postsSlice"
import { useRef } from "react";
import { useEffect } from "react";
import crossIcon from '../../assets/icons/crossIcon.png';
import closeIcon from '../../assets/icons/closeIcon.png';
import photoUpload from '../../assets/icons/photoUpload.png';
const AddNewPost = (props) => {

  const dispatch = useDispatch()

  //const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [contentTextarea, setContentTextarea] = useState('')
  const [lastImage, setLastImage] = useState('')
  const [latestImage, setLatestImage] = useState('')

  const textareaResizable = document.querySelector('.add-post-textarea')
  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 


  const onContentChanged = ((e) => {
    setContent(e.target.value)
    props.setContentSaved(e.target.value)
    if (content.length === 0) {
      //setContent("Quoi de neuf, "+cookieUserInfos.name+" ?")
      props.setContentSaved("Quoi de neuf, "+cookieUserInfos.name+" ?")
    }
  })

  const canSave = addRequestStatus === 'idle';


  const handleSubmit = (e) => {

    e.preventDefault();
    if (canSave) {
      try {
        const formData = new FormData()
        formData.append('post[content]', e.target.content.value)
        formData.append('post[image]', latestImage)
        setAddRequestStatus('pending')
        dispatch(addNewPost(formData)).unwrap()
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        closeModal()
        setAddRequestStatus('idle')
      }
    }
  }

  const closeModal = () => {
    let divAddNewPostModal = document.querySelector('.add-new-post');
    divAddNewPostModal.style.display = "none"
    let divOverlay = document.querySelector('.overlay-add-new-post');
    divOverlay.style.display = "none"
    document.body.style.overflow = "visible"
  }

 
  useEffect(() => {
    //console.log(contentTextarea)
  }, [contentTextarea])
  
  const renderImage = (e) => {
    e.preventDefault()
    setLatestImage(e.target.files[0])
    const reader = new FileReader()
    reader.onload = function () {
      setLastImage(reader.result)
      setCustomFontSize(true)
      e.target.value = ""
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const customImageElement = document.querySelector('.custom-image')

  useEffect(() => {
    const textareaResizable = document.querySelector('.add-post-textarea');
    if (lastImage !== '') {
      customImageElement.style.opacity = 1
      textareaResizable.style.fontSize = "1.5rem"
      textareaResizable.style.height = 'auto';
      textareaResizable.style.height = textareaResizable.scrollHeight/2.3 + "px";
      textareaResizable.style.fontSize = ".9375rem";
    } 
  }, [lastImage])

  const [customFontSize, setCustomFontSize] = useState(false)
  const [customThing, setCustomThing] = useState(1)
  
  const resizeTextarea = (e) => {
    let textareaHeightToNumber
    let textareaHeight
    e.preventDefault()
    e.target.style.height = "auto";
     // if ( customThing === 1  )
     // e.target.style.fontSize = "1.5rem"
      // else if ( customThing === 2 ) 
    if (e.target.style.fontSize !== "") {
      e.target.style.fontSize = "1.5rem"
    }
  
    textareaHeight = e.target.scrollHeight  + "px";
    e.target.style.height = textareaHeight 
    textareaHeightToNumber = textareaHeight.substring(0, textareaHeight.length - 2)
    e.target.style.height = e.target.scrollHeight + 'px'

    if (customThing === 1) {
      e.target.style.fontSize = "1.5rem"
    }
      if (textareaHeightToNumber >= 132 && e.target.style.fontSize == "1.5rem") {
        e.target.style.fontSize = ".9375rem"
        console.log(e.target.scrollHeight)
        e.target.style.height = e.target.scrollHeight/2.5 + "px";
        setCustomFontSize(true)
        setCustomThing(1)
      }
      else if (textareaHeightToNumber <= 164 && e.target.style.fontSize == ".9375rem") {
        e.target.style.fontSize = "1.5rem"
        setCustomFontSize(false)
        setCustomThing(2)
      } else if (textareaHeightToNumber <= 164 && e.target.style.fontSize == "1.5rem") {   
      } 

    if (lastImage !== '') {
      e.target.style.fontSize = ".9375rem"
    }

  }


  const RemovePhotoFromInput = (e) => {
    e.preventDefault()
    console.log('hi')
    setLastImage('')
    setCustomFontSize(false)
    customImageElement.style.opacity = 0
    textareaResizable.style.fontSize = "1.5rem"
    textareaResizable.style.height = 'auto';
    textareaResizable.style.height = textareaResizable.scrollHeight + "px";

  }


  useEffect(() => {
    
  },[customFontSize])
 
  return (
    <div className="add-new-post">
      <div className="add-new-post-header">
        <h3>Créer une publication</h3>
        <button onClick={closeModal}><img src={closeIcon} alt="closeModal"/></button>
      </div>
      <div className="add-new-post-profile-parameters">
        <h5>Photo + Hugo calmels</h5>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="textarea-container" id="textarea-container">
        <textarea className="add-post-textarea"
        //placeholder={"Quoi de neuf, "+cookieUserInfos.name+"?"}
            //type="text"
        rows="1"
        name="content"
          id="content"
          value={contentTextarea}
            onChange={(e) => { 
              setContentTextarea(e.target.value)
              //onContentChanged(e)
              resizeTextarea(e)
            }}
          />

    
        <div className="custom-image" >
          <button className="btn-close-textarea-image"onClick={(e)=>RemovePhotoFromInput(e)}><img src={closeIcon} alt="removeImage"/></button>
          <img src={lastImage}/>
        </div>
        </div>   

        <div className="add-new-post-options">
          <div className="add-new-post-options-header">Ajouter à votre publication</div>
          <div className="add-new-post-list-of-options">
       
            <div className="upload-photo">
            <label for="image" className="label-file" ><img src={photoUpload} alt="photoUpload"/></label>
            <input type="file" onChange={(e) => renderImage(e)} name="image" id="image" className="input-file"/>
            </div>
       
          </div>
  
        </div>
        <div className="add-post-send-btn-container">
        <label for="addPost" className="label-post-send-btn">Publier</label>
        <button type="submit" disabled={!canSave} className="add-post-send-btn" id="addPost"></button>
        </div>
    </form>
    </div>
    
)
}


export default AddNewPost