import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  posts: [],
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
  const response = await fetch('http://localhost:3000/api/v1/users', config)
  const data = await response.json()
  console.log(data)
  return data
})


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {

        state.users = action.payload
      })
    
  }
})
export const selectAllUsers = (state) => state.users.users
export default usersSlice.reducer