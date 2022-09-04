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
  getAgainAllPosts
} from "../../redux/features/posts/postsSlice";
import {
  selectCurrentUser,
  getCurrentUserFriendlist,
  selectSelectedFriendList

} from "../../redux/features/users/usersSlice";
import {
  selectRefreshCompStatus,
  refreshComp,
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


const PostsList = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [contentSaved, setContentSaved] = useState("");
  const pageStatus = useSelector(selectPageStatus)
  const changePostStatus = useSelector(selectChangePostStatus)

  let loader = false

  let fakepost = ''

  

  const refreshStatus = useSelector(selectRefreshCompStatus)


  const selectedFriendlist = useSelector(selectSelectedFriendList);
  let cookieUser = Cookies.get("user");
  let cookieUserInfos = JSON.parse(cookieUser);

  // ------------ WORKING ON HERE --------------- //

  const postsStatus = useSelector(getPostsStatus);
  const posts = useSelector(selectAllPosts);
  let removeLastPost = false;

  const newEntryStatus = useSelector(selectNewEntryStatus)

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const navigateFromAnotherPageStatus = useSelector(selectRefreshCompStatus)


  useEffect(()=>{
    if (postsStatus === "succeeded") {
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')

      dispatch(getAllPosts({ page: 1 }));
    }
  },[postsStatus])


  useEffect(() => {
    if (changePostStatus === "succeeded") {
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      setPage(1)
      setData([])
      dispatch(getAgainAllPosts({ page: 1 }))
    }
  }, [changePostStatus])


  useEffect(()=>{
    if (navigateFromAnotherPageStatus === "succeeded") {
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      setPage(1)
      setData([])
      dispatch(getAgainAllPosts({ page: 1 }))
    }

  },[navigateFromAnotherPageStatus])


  useEffect(() => {
    // once we got res from last call ( after new post ) we need to setData with those
  // if(newEntryStatus==="succeeded")
    //setData(posts)
  },[newEntryStatus])
  
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



  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    
    if (scrollTop + clientHeight === scrollHeight) {
      setPage(page + 1)
   
      //setData([...data, content])
    }
  })

  console.log('=============================')
  console.log('DOES THIS CODE TRIGGERS?')
  console.log('DO I NEED A USE EFFECT ?')
  console.log(page)
  console.log('=============================')

  useEffect(() => {
    loader=true
    
    dispatch(getNextPage({page:page}));
  }, [page])

  useEffect(() => {
    console.log("HELLO I DONT NEED ANY DATA ANYMORE ?")
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log(posts)
    console.log(content)
    console.log(data)

    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')

    if (pageStatus === "succeeded") {
      setData([...data, posts])
      loader=false
      console.log(posts)
   
    }

  },[pageStatus])
  

  let recreatedData = []

  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log(data.length)
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')

  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  
  if (data.length !== 0 && data[0].length !== undefined) {
    for (let i = 0; i < data.length; i++){
      data[i].forEach((el) => {
        recreatedData.push(el)
      })
    }
       
  }
 

  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log(recreatedData)
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('++++++++++++++++++++++++++++++++++++++++++++++')

 
  

  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log(data)
  console.log(content)
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')



  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log(loader)
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')
  console.log('=============================')


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
          
       
        
          {data.length === 0 ?
          <>
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
              </>
            :
            <>
            {recreatedData && recreatedData.length > 0
              ? recreatedData.map((post) =>
                  post ? (
                    <>
                      <Post
                        post={post}
                        key={post.id}
                        content={recreatedData}
                        removeLastPost={removeLastPost}
                      />
                    </>
                  ) : (
                    ""
                  )
                )
              : <><FakePost/></>}
              </>
          }
        
      </div>

      <div className="overlay-add-new-post"></div>
      <div className="main-overlay"></div>
    </>
    )
  }




  return (
    <>
      {loader === true ?
     
          <LoaderBackground />
    
            :
        <>
        {postListContent()}
       </>
      }
     


    
 
    </>
  );
};

export default PostsList;
