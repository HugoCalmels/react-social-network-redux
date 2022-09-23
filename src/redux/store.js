import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice'
import postsReducer from '../redux/features/posts/postsSlice'
import usersReducer from '../redux/features/users/usersSlice'
import imagesReducer from '../redux/features/images/imagesSlice'
import profileReducer from '../redux/features/profile/profileSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  images: imagesReducer,
  profile: profileReducer
})

export const store = configureStore({
  reducer: rootReducer,
});