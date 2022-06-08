import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  //isAuth: Cookies.get('isAuth') || false,
  randomNumber: 3,
  userAuth: Cookies.get('isAuth') || false,
  isAuth:  false,
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
  let token = await response.headers.get('authorization').split('').splice(7).join('')
  Cookies.set('auth-token', token)
  Cookies.set('isAuth', true)
})

export const login = createAsyncThunk('auth/login', async (payload) => {
  const data = {
    user: {
      email: payload.email,
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
  let token = await response.headers.get('authorization').split('').splice(7).join('')
  Cookies.set('auth-token', token)
  Cookies.set('isAuth', true)



  // find current user among all users 

  const response2 = await fetch('http://localhost:3000/api/v1/users')
  const datatest2 = await response2.json()
  //console.log(datatest2)
  const test3 = datatest2.filter(i => i.email === payload.email)
  let currentUser = {
    name: test3[0].username,
    id: test3[0].id
  }
  Cookies.set('user', JSON.stringify(currentUser))

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
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userAuth = false
        //state.isAuth = false
      })
      .addCase(login.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userAuth = true
        state.status = 'succeeded'
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
      })
 
  }
})
export const getUserStatus = (state) => state.auth.status
export const testRandomNumber = (state) => state.auth.randomNumber
export const userAuthenticated = (state) => state.auth.userAuth
export const checkingUserAuthentication = (state) => state.auth;


export default authSlice.reducer