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


  const config = {
    method: 'POST',
    headers: {

      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload
  };

  const response = await fetch(POSTS_URL, config)
  const data = await response.json()


  // 

  const latestPost = await fetch('http://localhost:3000/api/v1/latest')
  const dataLatestPost = await latestPost.json()

  const author = JSON.parse(Cookies.get('user'))


  const newPost = {

    id: dataLatestPost.id,
    user_id: dataLatestPost.user_id,
    content: dataLatestPost.content,
    author: author.name,
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

  const config3= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  }

  const response3 = await fetch(`http://localhost:3000/api/v1/posts/${dataLatestPost.id}`, config3)
  const data3 = await response3.json()
  
  return data3
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

  const postDetails = {
    post: {
      id: payload.id,
      user_id: payload.user_id,
      content: payload.content,
      author : payload.author,
      image_link: "something",
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
  return postDetails
})

// comments are here for now, as they belongs to posts
export const addNewComment = createAsyncThunk('posts/addNewComment', async (payload) => {
  const commentDetails = {
    comment: {
      content: payload.content,
      post_id: payload.postId
    }
  }

  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(commentDetails)
  }
  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.postId}/comments`, config)
  const data = await response.json()
  return data
})

export const deleteComment = createAsyncThunk('posts/deleteComment', async (payload) => {
  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }

  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.post.id}/comments/${payload.comment_id}`, config)


  const data = await response.json()
  console.log(response)
  console.log(data)
  //return { commentId: payload.comment_id, postId: payload.post.id }
  // actually i'll fetch another time to get last post infos...
  const response2 = await fetch(`http://localhost:3000/api/v1/posts/${payload.post.id}`)
  const data2 = response2.json()
  return data2
})


export const addNewLike = createAsyncThunk('posts/addNewLike', async (payload) => { 
  const likeDetails = {
    like: {
      user_id: payload.userId,
      post_id: payload.post.id
    }
  }

  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(likeDetails)
  }
  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.post.id}/likes`, config)
  const data = await response.json()
  console.log('FETCH TERMINE')
  console.log('FETCH TERMINE')
  console.log(data)
  console.log('FETCH TERMINE')
  console.log('FETCH TERMINE')
  return data
})

export const removeLike = createAsyncThunk('posts/removeLike', async (payload) => {
  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }

  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.post.id}/likes/${payload.like_id}`, config)


  const data = await response.json()
  console.log(response)
  console.log(data)
  //return { commentId: payload.comment_id, postId: payload.post.id }
  // actually i'll fetch another time to get last post infos...


  const response2 = await fetch(`http://localhost:3000/api/v1/posts/${payload.post.id}`)
  const data2 = response2.json()
  return data2

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
        
        
        /*
        
          */
         
        state.posts.push(action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload)
        state.posts = posts
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.post.id)
        state.posts = [...posts, action.payload.post]
        state.status = 'succeeded'
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed'
      })
    
      // comments 
     
      .addCase(addNewComment.pending, (state, action) => {
        state.status = "loading"
      })
 
      .addCase(addNewComment.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.id)
        //const post = state.posts.filter(post => post.id === action.payload.post_id)

        state.posts = [...posts, action.payload] //comments.push(action.payload.post)
        // idk how i'll change the post object to add the comments yet
        state.status = "succeeded"
      })

      .addCase(addNewComment.rejected, (state, action) => {
        state.status = "failed"
      })

     // delete comments
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.id)
        state.posts = [...posts, action.payload]
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed"
      })
    
      // add new like
      .addCase(addNewLike.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(addNewLike.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.id)
        state.posts = [...posts, action.payload]
        state.status = "succeeded"
      })
      .addCase(addNewLike.rejected, (state, action) => {
        state.status = "failed"
      })

      .addCase(removeLike.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.id)
        state.posts = [...posts, action.payload]
        state.status = "succeeded"
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.status = "failed"
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