import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/features/users/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})