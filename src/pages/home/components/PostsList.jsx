// react
import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import {
  getAllPosts,
  getPostsStatus,
  selectAllPosts,
  getNextPage,
  selectPageStatus,
  selectChangePostStatus,
  selectNewEntryStatus,
  getAgainAllPosts,
} from "../../../redux/features/posts/postsSlice";
import {
  selectCurrentUser,
  getCurrentUserFriendlist,
  selectSelectedFriendList,
} from "../../../redux/features/users/usersSlice";
import {
  selectRefreshCompStatus,
  refreshComp,
} from "../../../redux/features/profile/profileSlice";
// components
import Post from "../../../components/posts/Post";
// others
import "../../../Styles/posts/Index.scss";
import Cookies from "js-cookie";
import "../../../Styles/posts/postList.scss";
import defaultProfile from "../../../assets/images/defaultProfile.jpg";
import FakePost from "../../../components/posts/FakePost";
import LoaderBackground from "../../../components/LoaderBackground";
import { useLocation } from "react-router-dom";

const PostsList = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [contentSaved, setContentSaved] = useState("");
  const pageStatus = useSelector(selectPageStatus);
  const changePostStatus = useSelector(selectChangePostStatus);

  let loaded = false;

  let fakepost = "";

  const refreshStatus = useSelector(selectRefreshCompStatus);

  const selectedFriendlist = useSelector(selectSelectedFriendList);
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);

  // ------------ WORKING ON HERE --------------- //

  const postsStatus = useSelector(getPostsStatus);
  const posts = useSelector(selectAllPosts);
  let removeLastPost = false;

  const newEntryStatus = useSelector(selectNewEntryStatus);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const navigateFromAnotherPageStatus = useSelector(selectRefreshCompStatus);

  useEffect(() => {
    dispatch(getAllPosts({ page: 1 }));
  }, []);

  let content;
  if (postsStatus === "loading") {
    content = <p>" Loading ... "</p>;
  } else if (postsStatus === "succeeded" && posts.length > 0) {
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

  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 100) {
      setTimeout(() => {
        setPage(page + 1);
      }, [200]);
    }
  });

  useEffect(() => {
    dispatch(getNextPage({ page: page }));
  }, [page]);

  if (
    (posts.length === 0 && postsStatus === "succeeded") ||
    pageStatus === "succeeded"
  ) {
    fakepost = <FakePost />;
  }

  const postListContent = () => {
    return (
      <>
        <div className="posts-list">
          {props.profile !== undefined && props.profile === true ? (
            <></>
          ) : (
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

                {props.profile !== undefined && props.profile === true ? (
                  <></>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}

          {data.length === 0 ? (
            <>
              {content && content.length > 0 ? (
                content.map((post,index) =>
         
                      <Post
                        post={post}
                        key={index}
                        content={content}
                        removeLastPost={removeLastPost}
      
                      />
               
                
                )
              ) : (
                <>{fakepost}</>
              )}
            </>
          ) : (
            <>
              {content && content.length > 0 ? (
                  content.map((post,index) =>
              
                
                      <Post
                        post={post}
                        key={index}
                        content={content}
                        removeLastPost={removeLastPost}
   
                      />
              
                )
              ) : (
                <>
                  <FakePost />
                </>
              )}
            </>
          )}
        </div>

        <div className="overlay-add-new-post"></div>
        <div className="main-overlay"></div>
      </>
    );
  };

  return (
    <>{loaded === true ? <LoaderBackground /> : <>{postListContent()}</>}</>
  );
};

export default PostsList;
