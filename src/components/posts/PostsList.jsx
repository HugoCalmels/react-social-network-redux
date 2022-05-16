// react
import { useEffect } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux';
import {getAllPosts, getPostsStatus, selectAllPosts } from '../../redux/features/posts/postsSlice'
// components
import Post from './Post'
// others
import '../../Styles/posts/Index.scss'

const PostsList = () => {

  const dispatch = useDispatch();


  // ------------ WORKING ON HERE --------------- //

  const test = dispatch(getAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  console.log(test)



  const posts = useSelector(selectAllPosts)

  console.log('555555555555555555555555')
  console.log(posts)
  console.log('555555555555555555555555')

  useEffect(() => {
  
      dispatch(getAllPosts())

  }, [dispatch])

  return (
    <section>
      {posts.map((post) => (
        <Post post={post} />
      ))}

    </section>
  )
}


export default PostsList