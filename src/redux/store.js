import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice'
import postsReducer from '../redux/features/posts/postsSlice'
import usersReducer from '../redux/features/users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  }
})