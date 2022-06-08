import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

// original tuto comes with : https://jsonplaceholder.typicode.com/
// http://localhost:3000/api/v1/posts
const POSTS_URL = 'http://localhost:3000/api/v1/posts'

const initialState = {
  posts: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null,
  last: ''
}



export const addNewPost = createAsyncThunk('posts/addNewPost', async (payload) => {

  

  console.log('----------PAYLOAD--------------------')
  console.log(payload)
  console.log('----------PAYLOAD--------------------')
  const config = {
    method: 'POST',
    headers: {

      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload
  };

  const response = await fetch(POSTS_URL, config)
  const data = await response.json()

  console.log('ADD NEW POST SLICE')
  console.log(data)
  console.log('ADD NEW POST SLICE')

  // 

  const latestPost = await fetch('http://localhost:3000/api/v1/latest')
  const dataLatestPost = await latestPost.json()


  const newPost = {

    id: dataLatestPost.id,
    user_id: dataLatestPost.user_id,
      content: dataLatestPost.content,
      
      image_link: dataLatestPost.image_url

  }

  const configNewPost = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(newPost)
  }
  const responseNewPost = await fetch(`http://localhost:3000/api/v1/posts/${dataLatestPost.id}`, configNewPost)
  const dataNewPost = await responseNewPost.json()

  console.log('KKKKKKKKKKKK')
  console.log(dataNewPost)
  console.log('KKKKKKKKKKKK')
  
  return newPost
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

  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.id}`, config)


  const data = await response.json()

  return payload.id
})

export const updatePost = createAsyncThunk('posts/updatePost', async (payload) => {

  console.log('---------------------------------------')
  console.log(payload)
  console.log('---------------------------------------')

  const postDetails = {
    post: {
      id: payload.id,
      content: payload.content,
      user_id: payload.user_id,
      image_link: payload.image_url
    }
  }

  const config = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(postDetails)
  }
  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.id}`, config)
  const data = await response.json()
  return payload.id
})

const getImage = async () => {
  const response = await fetch('http://localhost:3000/api/v1/latest')
  const data = response.json()

  return data
}

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
        
        
        /*
        
          */
         
          state.posts.push(action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload)
        state.posts = posts
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log(state.posts)
        const posts = state.posts.filter(post => post.id !== action.payload.id)
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
export const getPostsStatus = (state) => state.posts.status


export default postsSlice.reducer