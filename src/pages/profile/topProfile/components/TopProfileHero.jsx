import { useEffect, useState } from "react";
import { createThumbnail } from "../../../../redux/features/users/usersSlice";
import { useDispatch } from "react-redux";
import cameraIcon from "../../../../assets/icons/cameraIcon.png";
import Cookies from "js-cookie";
import imageCompression from "browser-image-compression";
const TopProfileHero = (props) => {
  const dispatch = useDispatch();
  const cookieUser = Cookies.get("user");
  const cookieUserInfos = JSON.parse(cookieUser);

  // j'arrive pas refresh les inputs type change pour l'instant.
  // la meilleure solution serait de les détruire
  // et d'en créer deux, en jsx cette fois ci

  const submitThumbnail = (e) => {
    try {
      resizeImageFunction(e.currentTarget.files[0]).then((imageFile) => {
        const data = new FormData();
        data.append("thumbnail[image]", imageFile);
        data.append("thumbnail[user_id]", props.foundUser.id);
        dispatch(
          createThumbnail({ formDataUser: data, user: props.foundUser })
        ).unwrap();
      });
    } catch (err) {
      console.error("Failed to save the post", err);
    }
    e.target.value = "";
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

  return (
    <div className="profile-top-header-image-container">
      {props.foundUser.thumbnail_link ? (
        <>
          <img
            className="profile-top-header-thumbnail"
            src={props.foundUser.thumbnail_link}
            alt="profileThumbnail"
          ></img>
        </>
      ) : (
        <>
          <div className="profile-top-header-gradiant"></div>
        </>
      )}

      {props.foundUser.id === cookieUserInfos.id ? (
        <>
          <div className="resp-profile-top-thumbnail-input-container">
            <label
              className="thumbnail-label"
              htmlFor={`thumbnailUploadResp id-${props.foundUser.id}`}
            >
              <img src={cameraIcon} alt="uploadProfileImage" />
            </label>
            <input
              className="thumbnail-input"
              type="file"
              name="thumbnailUpload"
              id={`thumbnailUploadResp id-${props.foundUser.id}`}
              onInput={(e) => submitThumbnail(e)}
            ></input>
          </div>
          <div className="profile-top-thumbnail-input-container">
            <label
              className="thumbnail-label"
              htmlFor={`thumbnailUpload id-${props.foundUser.id}`}
            >
              <img src={cameraIcon} alt="uploadProfileImage" />
              <span>Ajouter une photo de couverture</span>{" "}
            </label>
            <input
              className="thumbnail-input"
              type="file"
              name="thumbnailUpload"
              id={`thumbnailUpload id-${props.foundUser.id}`}
              onInput={(e) => submitThumbnail(e)}
            ></input>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TopProfileHero;
