import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

// original tuto comes with : https://jsonplaceholder.typicode.com/
// http://localhost:3000/api/v1/posts
const POSTS_URL = 'http://localhost:3000/api/v1/posts'

const initialState = {
  posts: [],
  currentPost: '',
  updateStatus: 'idle',
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

  console.log('5555555555555555555555555555555555555555')
  console.log('5555555555555555555555555555555555555555')
  console.log('5555555555555555555555555555555555555555')
  console.log(response)
  console.log(data)
  console.log('5555555555555555555555555555555555555555')
  console.log('5555555555555555555555555555555555555555')
  console.log('5555555555555555555555555555555555555555')



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
  const config = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(payload)
  }
  console.log('FROM SLICE REDUX')
  console.log('FROM SLICE REDUX')
  console.log('FROM SLICE REDUX')
  console.log('FROM SLICE REDUX')
  console.log('FROM SLICE REDUX')
  console.log('FROM SLICE REDUX')
  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.id}`, config)
  const data = await response.json()
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  }
  const response2 = await fetch(`http://localhost:3000/api/v1/posts/${payload.id}`, config2)
  const data2 = await response2.json()

  return data2
})

export const updatePostAndImage = createAsyncThunk('posts/updatePostAndImage', async (payload) => {

  console.log('UPDATE METHOD ASYNC')
  console.log(payload.post)
  console.log(payload.id)
  console.log('UPDATE METHOD ASYNC')


  const config = {
    method: 'PUT',
    headers: {
      
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload.post
  };
  const response = await fetch(`http://localhost:3000/api/v1/posts/${payload.id}`, config)
  const data = await response.json()
  
  // get last image
  const latestPost = await fetch('http://localhost:3000/api/v1/latest')
  const dataLatestPost = await latestPost.json()

  const newPost = {

    id: dataLatestPost.id,
    user_id: dataLatestPost.user_id,
    content: dataLatestPost.content,
    author: dataLatestPost.author,
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
        state.updateStatus = 'loading'
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log('ADDCASEUPDATE')
        console.log(action.payload)
        console.log('ADDCASEUPDATE')
        const posts = state.posts.filter(post => post.id !== action.payload.id)
        state.posts = [...posts, action.payload]
        //state.status = 'succeeded'
        state.currentPost = action.payload
        state.updateStatus = 'succeeded'

      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateStatus = 'failed'
      })
      // update post with image
      .addCase(updatePostAndImage.pending, (state, action) => {
        state.updateStatus = 'loading'
      })
      .addCase(updatePostAndImage.fulfilled, (state, action) => {
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log(action.payload)
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')
        console.log('ACTIONMANPAYLOAD')

        const posts = state.posts.filter(post => post.id !== action.payload.id)
        state.posts = [...posts, action.payload]
        state.status = 'succeeded'
        state.currentPost = action.payload
        state.updateStatus = 'succeeded'

      })
      .addCase(updatePostAndImage.rejected, (state, action) => {
        state.updateStatus = 'failed'
      })
    
      // comments 
     
      .addCase(addNewComment.pending, (state, action) => {
        //state.status = "loading"
        state.updateStatus = "loading"
      })
 
      .addCase(addNewComment.fulfilled, (state, action) => {
        const posts = state.posts.filter(post => post.id !== action.payload.id)
        //const post = state.posts.filter(post => post.id === action.payload.post_id)

        state.posts = [...posts, action.payload] //comments.push(action.payload.post)
        // idk how i'll change the post object to add the comments yet
        //state.status = "succeeded" // will remove this 

        // other state here
        state.currentPost = action.payload
        state.updateStatus = "succeeded"
      })

      .addCase(addNewComment.rejected, (state, action) => {
        //state.status = "failed"
        state.updateStatus = "failed"
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
export const getUpdatedStatus = (state) => state.posts.updateStatus
export const getCurrentPost = (state) => state.posts.currentPost

export default postsSlice.reducer