import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN


const initialState = {
  profile: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null,
}


export const getUserByUsername = createAsyncThunk('users/getUserByUsername', async (payload) => {
  const config3 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },

  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/profiles/${payload}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  return data3
})

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getUserByUsername.pending, (state, action) => {
      state.status = "loading"

    })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
      state.profile = action.payload
      state.status = "succeeded"

    })
    .addCase(getUserByUsername.rejected, (state, action) => {
      state.status = "failed"

    })

  

  }
})


export const getProfileStatus = (state) => state.profile.status
export const selectProfileUser = (state) => state.profile.profile

export default profileSlice.reducer
