// react
import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPostsFromSelectUser,
  getPostsStatus,
  selectAllPosts,
  getNextPageFromSelectedUser,
} from "../../../../redux/features/posts/postsSlice";

// components
import Post from "../../../../components/posts/Post";
// others
import "../../../../Styles/posts/Index.scss";
import "../../../../Styles/posts/postList.scss";
import FakePost from "../../../../components/posts/FakePost";

const PostsList = (props) => {
  const dispatch = useDispatch();
  let fakepost = "";

  const postsStatus = useSelector(getPostsStatus);
  const posts = useSelector(selectAllPosts);
  let removeLastPost = false;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllPostsFromSelectUser({ page: 1, username: props.username }));
  }, []);

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

  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 100) {

      setTimeout(() => {
        setPage(page + 1)
      },[200])
    }
  });

  useEffect(() => {
    dispatch(
      getNextPageFromSelectedUser({ page: page, username: props.username })
    );
  }, [page]);


/*
  if (content.length > 0) {
    let contentElems = document.querySelectorAll('.post-wrapper')
    contentElems.forEach((el) => {
      el.style.maxWidth = "680px"
    })
  }
*/
  const postListContent = () => {
    return (
      <>
        <div className="posts-list">
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
    <>
      <>{postListContent()}</>
    </>
  );
};

export default PostsList;
