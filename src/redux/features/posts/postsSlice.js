import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

// original tuto comes with : https://jsonplaceholder.typicode.com/
// http://localhost:3000/api/v1/posts
const POSTS_URL = 'http://localhost:3000/api/v1/posts'

const initialState = {
  posts: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null
}



export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  const details = {
    post: {
      title: newPost.title,
      content: newPost.content,
    }
  }
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(details)
  };

  const response = await fetch(POSTS_URL, config)
  const data = await response.json()
  return data
})

export const getAllPosts  = createAsyncThunk('posts/getAllPosts', async (initialPost) => {
  const config = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }
  const response = await fetch('http://localhost:3000/api/v1/posts', config)
  const data = await response.json()
  console.log(data)
  return data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (thisPost) => {
  console.log('SOMEONE IN HERE ?')
  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }
  console.log(thisPost.id)
  const response = await fetch(`http://localhost:3000/api/v1/posts/${thisPost.id}`, config)
  console.log(response)

  const data = await response.json()
  console.log(data)
  return data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (updatePost) => {
  const details = {
    post: {
      title: updatePost.title,
      content: updatePost.content,
    }
  }
  const config = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(details)
  }
  const response = await fetch(`http://localhost:3000/api/v1/posts/${updatePost.props.post.id}`, config)
  const data = await response.json()
  console.log(data)
  return data
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {

        state.posts = action.payload
      })
      .addCase(addNewPost.fulfilled, (state, action) => {

      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log('post deleted')
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log('post deleted')
      })
    
  }
})

/*
export const selectAllTodos = (state) => state.todos.todos
export const getTodosStatus = (state) => state.todos.status
export const getTodosError = (state) => state.todos.error
*/

//export const { todoAdded, reactionAdded } = todosSlice.actions
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) =>  state.posts.status

export default postsSlice.reducer