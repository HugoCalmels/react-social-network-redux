import { useState } from "react";
import chevronIcon from "../../../../assets/icons/chevronIcon.png";

import crossIcon from "../../../../assets/icons/crossIcon.png";

const BottomLeftProfilePhotos = (props) => {
  let photoReader = "";

  const [currentPhotoId, setCurrentPhotoId] = useState(0);

 
  const setPreviousPhoto = () => {
    if (currentPhotoId < 1) {
      setCurrentPhotoId(props.filteredPhotosList.length - 1);
    } else {
      setCurrentPhotoId(currentPhotoId - 1);
    }
  };

  const setNextPhoto = () => {
    if (currentPhotoId > props.filteredPhotosList.length - 2) {
      setCurrentPhotoId(0);
    } else {
      setCurrentPhotoId(currentPhotoId + 1);
    }
  };

  const closePhotosReader = () => {
    photoReader = document.querySelector(".ppc-photos-reader");
    photoReader.style.display = "none";
  };

  const openPhotosReader = (e) => {
    photoReader = document.querySelector(".ppc-photos-reader");
    setCurrentPhotoId(parseInt(e.currentTarget.id));
    photoReader.style.display = "flex";
  };

  return (
    <>
      {props.filteredPhotosList.length > 0 ? (
        <div className="profile-photos-container">
          <div className="ppc-photos-reader profile">
            <div className="ppc-photo-unit profile">
              <img src={props.filteredPhotosList[currentPhotoId].image_link} />
            </div>
            <div
              className="ppc-previous-btn profile"
              onClick={setPreviousPhoto}
            >
              <img src={chevronIcon} />
            </div>
            <div className="ppc-next-btn profile" onClick={setNextPhoto}>
              <img src={chevronIcon} />
            </div>
            <div className="ppc-close-btn profile" onClick={closePhotosReader}>
              <img src={crossIcon} />
            </div>
          </div>
          <div className="profile-photos-header">
            <h3>Photos</h3>
            <p onClick={(e) => props.setBottomContent("photos")}>
              Toutes les photos
            </p>
          </div>
          <div className="profile-photos">
            {props.filteredPhotosList.map((post, index) => (
          
                <div className="future-user-photo" key={index}>
                  <img
                    id={index}
                    src={post.image_link}
                    alt="userImage"
                    onClick={(e) => openPhotosReader(e)}
                   
                  />
                </div>
            
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BottomLeftProfilePhotos;
