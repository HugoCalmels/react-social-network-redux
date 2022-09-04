import { useEffect, useState } from "react"

import chevronIcon from "../../assets/icons/chevronIcon.png"
import crossIcon from "../../assets/icons/crossIcon.png"
const ProfilePhotosContent = (props) => {

  const photosLength = props.photos.length

  let photoReader = ''
  
  const [currentPhotoId, setCurrentPhotoId] = useState(0)

  photoReader = document.querySelector('.ppc-photos-reader')
  let eventTracked = false;
  useEffect(() => {

      let allPhotos = document.querySelectorAll('.ppc-photo')
      allPhotos.forEach((el) => {
        el.style.height = el.offsetWidth+'px'
      })
      photoReader = document.querySelector('.ppc-photos-reader')
 
  }, [eventTracked]);
  eventTracked = true;



  const setPreviousPhoto = () => {
    if (currentPhotoId < 1) {
      setCurrentPhotoId(props.photos.length - 1)
    } else {
      setCurrentPhotoId(currentPhotoId - 1)
    }
  }

  const setNextPhoto = () => {
    if (currentPhotoId > props.photos.length - 2) {
      setCurrentPhotoId(0)
    } else {
      setCurrentPhotoId(currentPhotoId + 1)
    }
  }
  

  const closePhotosReader = () => {
    photoReader.style.display = "none"
  }

  const openPhotosReader = (e) => {
    setCurrentPhotoId(parseInt(e.currentTarget.id))
    photoReader.style.display = "flex"
  }

  return (
    <div className="ppc-wrapper">
      <div className="ppc-photos-reader">
        <div className="ppc-photo-unit"><img src={props.photos[currentPhotoId].image_link} /></div>
        <div className="ppc-previous-btn" onClick={setPreviousPhoto}><img src={chevronIcon}/></div>
        <div className="ppc-next-btn" onClick={setNextPhoto}><img src={chevronIcon} /></div>
        <div className="ppc-close-btn" onClick={closePhotosReader}><img src={crossIcon}/></div>
      </div>
    <div className="ppc-container">
      <div className="ppc-header">Photos</div>
      <div className="ppc-grid">
        {props.photos.map((photo, index) => (
          <div className="ppc-photo">
            <img id={index} className="ppc-photo-img" src={photo.image_link} onClick={(e)=>openPhotosReader(e)} />
          </div>
        ))}
      </div>
      </div>
      </div>
  )
}


export default ProfilePhotosContent