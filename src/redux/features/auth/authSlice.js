import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuth: false,
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null
}

export const register = createAsyncThunk('auth/register', async (payload) => {
  const data = {
    user: {
      username: payload.username,
      email: payload.name,
      password: payload.password
    }
  }
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await  fetch('http://localhost:3000/users', config)
  console.log(response)
  let token = await response.headers.get('authorization').split('').splice(7).join('')
  console.log(token)
  Cookies.set('auth-token', token)
  Cookies.set('isAuth', true)
})

export const login = createAsyncThunk('auth/login', async (payload) => {
  const data = {
    user: {
      email: payload.name,
      password: payload.password
    }
  }
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await  fetch('http://localhost:3000/users/sign_in', config)
  console.log(response)
  let token = await response.headers.get('authorization').split('').splice(7).join('')
  console.log(token)
  Cookies.set('auth-token', token)
  Cookies.set('isAuth', true)
})

export const logout = createAsyncThunk('auth/logout', async (payload) => {
  Cookies.get('auth-token')
  const config = {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
    
  };
  const response = await fetch('http://localhost:3000/users/sign_out', config)
  console.log(response)
  if (response.status === 200) {
    Cookies.remove('auth-token')
    Cookies.remove('isAuth')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log(state)
        console.log(action)
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log(state)
        console.log(action)
        state.isAuth = false
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('9999999999999999999999999999')
        console.log(state)
        console.log(action)

        console.log('9999999999999999999999999999')
        state.isAuth = true
      })
  }
})

export const checkingUserAuthentication = (state) => state.auth.isAuth;

export default authSlice.reducer