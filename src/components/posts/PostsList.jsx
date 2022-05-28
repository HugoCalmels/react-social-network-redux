// react
import { useEffect, useState } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux';
import {getAllPosts, getPostsStatus, selectAllPosts } from '../../redux/features/posts/postsSlice'
// components
import Post from './Post'
import AddNewPost from "./AddNewPost"
// others
import '../../Styles/posts/Index.scss'
import Cookies from 'js-cookie';

const PostsList = () => {

  const dispatch = useDispatch();

  const [contentSaved, setContentSaved] = useState('')


  // ------------ WORKING ON HERE --------------- //

  const postsStatus = useSelector(getPostsStatus)
  const posts = useSelector(selectAllPosts)

  
  console.log('555555555555555555555555')
  console.log(posts)
  console.log('555555555555555555555555')

  // to grab last state
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(getAllPosts())
    }
  
    
  }, [postsStatus, dispatch])


  // to update state after a post is created
  
  let content;
  if (postsStatus === 'loading') {
    content = <p>" Loading ... "</p>;
  } else if (postsStatus === 'succeeded') {
    let renderedPosts = [...posts]
    renderedPosts.sort(function (a, b) {
      return b.id - a.id;
    })
    console.log(renderedPosts)
    content = renderedPosts
  } else if (postsStatus === 'error') {
    content = <p>Error</p>
  }

  console.log("TESTTTTTTTTTTTT")
  console.log(content)
  console.log(posts)
  console.log("TESTTTTTTTTTTTT")

  console.log("EUHHHHHHHHHHHHHHHH??? CA FIRE ?")

  const openAddNewPostModal = () => {
    let divAddNewPostModal = document.querySelector('.add-new-post');
    divAddNewPostModal.style.display = "block"
    let divOverlay = document.querySelector('.overlay-add-new-post');
    divOverlay.style.display = "block"
    document.body.style.overflow = "hidden"
    divOverlay.addEventListener('click', () => {
      divOverlay.style.display = "none"
      divAddNewPostModal.style.display = "none"
      document.body.style.overflow = "visible"
    })
  }
  let cookieUser = Cookies.get('user')
  let cookieUserInfos = JSON.parse(cookieUser) 

  return (
    <>
      <AddNewPost setContentSaved={setContentSaved} />
      <button onClick={openAddNewPostModal}>{ contentSaved|| "Quoi de neuf, "+cookieUserInfos.name+" ?"}</button>
    <div className="posts-container">
        <h1>{postsStatus}</h1>
      <div className="posts-list">
        {postsStatus === "succeeded" ? content.map((post) => (
          <Post post={post} key={post.id}/>
        )) : ""}
      </div>

      </div>  
      <div className="overlay-add-new-post"></div>
    </>
  )
}


export default PostsList