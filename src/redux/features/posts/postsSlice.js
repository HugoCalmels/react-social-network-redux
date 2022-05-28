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



export const addNewPost = createAsyncThunk('posts/addNewPost', async (payload) => {
  const details = {
    post: {
      title: payload.title,
      content: payload.content,
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

export const getAllPosts  = createAsyncThunk('posts/getAllPosts', async () => {
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
  console.log('AXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXAAXAXAXAXA')
  return data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (payload) => {
  console.log('SOMEONE IN HERE ?')
  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }
  console.log(payload.id)
  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.id}`, config)
  console.log(response)

  const data = await response.json()
  console.log(data)
  return payload.id
})

export const updatePost = createAsyncThunk('posts/updatePost', async (updatePost) => {
  const details = {
    post: {
      title: updatePost.title,
      content: updatePost.content,
      id: updatePost.id,
      author: updatePost.author,
      user_id: updatePost.user_id
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
  const response = await fetch(`http://localhost:3000/api/v1/posts/${updatePost.id}`, config)
  const data = await response.json()
  console.log(data)
  return details
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload)
        state.posts = posts
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.post.id)
        state.posts = [...posts, action.payload.post]
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