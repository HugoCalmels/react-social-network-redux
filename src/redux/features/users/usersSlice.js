import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN


const initialState = {
  users: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null
}

export const getAllUsers  = createAsyncThunk('users/getAllUsers', async (initialPost) => {
  const config = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }
  const response = await fetch(`${BASE_URL}/api/v1/users`, config)
  const data = await response.json()
  console.log(data)
  return data
})

// AVATAR POST
export const createAvatar = createAsyncThunk('users/createAvatar', async (payload) => {
  const config = {
    method: 'POST',
    headers: {

      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload.formDataUser
  }
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/createAvatar`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }

  // THEN GET LAST AVATAR POSTED
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/latestAvatar`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }

  // update the user 
  const body3 = {
    username: payload.user.username,
    email: payload.user.emaim,
    id: payload.user.id,
    avatar_link: data2.image_url, // just change the image_link actually
  }
  const config3 = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body3)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${payload.user.id}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  return data3
})

// CREATE THUMBNAIL
export const createThumbnail = createAsyncThunk('users/createThumbnail', async (payload) => {
  const config = {
    method: 'POST',
    headers: {

      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload.formDataUser
  }
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/createThumbnail`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }

  // THEN GET LAST AVATAR POSTED
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/latestThumbnail`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }

  // update the user 
  const body3 = {
    username: payload.user.username,
    email: payload.user.emaim,
    id: payload.user.id,
    thumbnail_link: data2.image_url, // just change the image_link actually
  }
  const config3 = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body3)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${payload.user.id}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  return data3
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAllUsers.pending, (state, action) => {
      state.status = "loading"

    })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      state.status = "succeeded"

    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.status = "failed"

    })
    .addCase(createAvatar.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(createAvatar.fulfilled, (state, action) => {
      const users = state.users.filter((user) => user.id !== action.payload.id)
      state.users = [...users, action.payload]
      state.status = "succeeded"
    })
    .addCase(createAvatar.rejected, (state, action) => {
      state.status = "failed"
    })
    .addCase(createThumbnail.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(createThumbnail.fulfilled, (state, action) => {
      const users = state.users.filter((user) => user.id !== action.payload.id)
      state.users = [...users, action.payload]
      state.status = "succeeded"
    })
    .addCase(createThumbnail.rejected, (state, action) => {
      state.status = "failed"
    })
  }
})

export const getUsersStatus = (state) => state.users.status
export const selectAllUsers = (state) => state.users.users
export default usersSlice.reducer