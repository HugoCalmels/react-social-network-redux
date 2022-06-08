// react
import { useEffect, useState } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux';
import {getAllPosts, getPostsStatus, selectAllPosts } from '../../redux/features/posts/postsSlice'
// components
import Post from './Post'
import AddNewPost from "./AddNewPost"
import LatestImage from "./LatestImage"
// others
import '../../Styles/posts/Index.scss'
import Cookies from 'js-cookie';
import { updatePost } from "../../redux/features/posts/postsSlice"

const PostsList = () => {

  const dispatch = useDispatch();

  const [contentSaved, setContentSaved] = useState('')


  // ------------ WORKING ON HERE --------------- //

  const postsStatus = useSelector(getPostsStatus)
  const posts = useSelector(selectAllPosts)


  // to grab last state
 

  const getImage = async () => {
    const response = await fetch('http://localhost:3000/api/v1/latest')
    const data = response.json()
 
    return data
  }


  // to update state after a post is created
  
  let content;
  if (postsStatus === 'loading') {
    content = <p>" Loading ... "</p>;
  } else if (postsStatus === 'succeeded') {
    let renderedPosts = [...posts]
    renderedPosts.sort(function (a, b) {
      return b.id - a.id;
    })
    content = renderedPosts
  } else if (postsStatus === 'error') {
    content = <p>Error</p>
  }


  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
  console.log('CONTENT')
  console.log(content)
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
  console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
/*
  getImage()
        .then((data) => {
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
          console.log(data)
          console.log(content)
          //dispatch(updatePost(data)).unwrap()
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        })

*/

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


  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(getAllPosts())
      
    }
  
    
  }, [postsStatus, dispatch])

  return (
    <>
      <AddNewPost setContentSaved={setContentSaved} />
     
      
      <div className="posts-container">
        
        <div className="left-side-bar">
        <h6>{postsStatus}</h6>
        </div>


        <div className="posts-list">
          <div className="btn-open-modal-add-post">
            <div className="btn-open-modal-add-post-container">
              <div className="btn-open-modal-add-post-avatar">
              </div>
              <div className="btn-open-modal-add-post-btn">
              <button onClick={openAddNewPostModal}>{ contentSaved|| "Quoi de neuf, "+cookieUserInfos.name+" ?"}</button>
              <div className="btn-open-modal-add-post-syled-bar"></div>
              </div>
              
            </div>

          </div>
        

          {postsStatus === "succeeded" ? content.map((post) => (
          post ? <><Post post={post} key={post.id}/></> : ""
        )) : ""}
        </div>

        <div className="right-side-bar">
          
        </div>

      </div>  
      <div className="overlay-add-new-post"></div>
    </>
  )
}


export default PostsList