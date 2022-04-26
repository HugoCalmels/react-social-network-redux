import { createSlice} from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Dude' },
  { id: '1', name: 'Frank' },
  { id: '2', name: 'Youpi'}
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer