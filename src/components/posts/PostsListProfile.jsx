// react
import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getPostsStatus,
  selectAllPosts,
  getAllPostsFromSelectedUser
} from "../../redux/features/posts/postsSlice";
import {
  selectCurrentUser,
  getCurrentUserFriendlist,
  selectSelectedFriendList

} from "../../redux/features/users/usersSlice";
import {
  selectRefreshCompStatus

} from "../../redux/features/profile/profileSlice";
// components
import Post from "./Post";
// others
import "../../Styles/posts/Index.scss";
import Cookies from "js-cookie";
import "../../Styles/posts/postList.scss";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import FakePost from "./FakePost";
import LoaderBackground from "../../components/LoaderBackground"
import { useLocation } from "react-router-dom";

const PostsListProfile = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [contentSaved, setContentSaved] = useState("");


  const refreshStatus = useSelector(selectRefreshCompStatus)


  const selectedFriendlist = useSelector(selectSelectedFriendList);
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);

  // ------------ WORKING ON HERE --------------- //

  const postsStatus = useSelector(getPostsStatus);
  const posts = useSelector(selectAllPosts);
  let removeLastPost = false;

  const [page, setPage] = useState(0)


  // to grab last state

  useEffect(() => {

    if (postsStatus === "idle") {
      console.log("FIRED");
      dispatch(getAllPostsFromSelectedUser({ username: props.username, page:page }));
      //props.setGetRefreshFromPostList(props.getRefreshFromPostList+1)
      //dispatch(getAllImagesPostsFromUser())
    }
  }, [postsStatus, dispatch]);



  const getImage = async () => {
    const response = await fetch("http://localhost:3000/api/v1/latest");
    const data = response.json();

    return data;
  };


 



  let content;
  if (postsStatus === "loading") {
    content = <p>" Loading ... "</p>;
  } else if (postsStatus === "succeeded") {
    let filteredPosts = posts.filter(
      (post) => post.has_to_be_displayed === false //&&listOfFriendlistUsersIds.includes(post.user_id)
    );
    let renderedPosts = filteredPosts;

    renderedPosts.sort(function (a, b) {
      return b.id - a.id;
    });
    content = renderedPosts;
  } else if (postsStatus === "error") {
    content = <p>Error</p>;
  }

  const openAddNewPostModal = () => {
    let divAddNewPostModal = document.querySelector(".add-new-post");
    divAddNewPostModal.style.display = "block";
    let divOverlay = document.querySelector(".overlay-add-new-post");
    divOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    divOverlay.addEventListener("click", () => {
      divOverlay.style.display = "none";
      divAddNewPostModal.style.display = "none";
      document.body.style.overflow = "visible";
    });
  };

  let fakepost = <FakePost />

  if (
    content &&
    content.length !== undefined &&
    props.foundUser &&
    props.foundUser.id !== undefined
  ) {

    content = content.filter((post) => {
      return post.user_id === props.foundUser.id;
    });
    fakepost = ''
    
  }
  

 

  const postListContent = () => {
    
    return (
      <>
      <div className="posts-list">
     
        

      {props.profile !== undefined && props.profile === true ?
              <></>
              :
              <div className="btn-open-modal-add-post">
              <div className="btn-open-modal-add-post-container">
                <div className="btn-open-modal-add-post-avatar">
                  {(props.currentUser &&
                    props.currentUser.avatar_link === null) ||
                  props.currentUser.avatar_link === "" ||
                  (props.currentUser &&
                    props.currentUser.avatar_link === undefined) ? (
                    <>
                      <img src={defaultProfile} />
                    </>
                  ) : (
                    <>
                      <img src={props.currentUser.avatar_link} />
                    </>
                  )}
            </div>
            <div className="btn-open-modal-add-post-btn">
                  <button onClick={openAddNewPostModal}>
                    {contentSaved ||
                      "Quoi de neuf, " + cookieUserInfos.name + " ?"}
                  </button>
                  <div className="btn-open-modal-add-post-syled-bar"></div>
            </div>
            
            {props.profile !== undefined && props.profile === true ?
              <></>
              :
             <></>
            }
                
            
              </div>
            </div>
            }
          
       
        

        {content && content.length > 0
          ? content.map((post) =>
              post ? (
                <>
                  <Post
                    post={post}
                    key={post.id}
                    content={content}
                    removeLastPost={removeLastPost}
                  />
                </>
              ) : (
                ""
              )
            )
          : <>{fakepost}</>}
      </div>

      <div className="overlay-add-new-post"></div>
      <div className="main-overlay"></div>
    </>
    )
  }




  return (
    <>
  
        <>{postListContent()}</>


    
 
    </>
  );
};

export default PostsListProfile;
