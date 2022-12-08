import { AuthState, User } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<User>) {
      state.isSignedIn = true
      state.user = action.payload
    },
    signOut(state) {
      state.isSignedIn = false
      state.user = null
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
  },
})

export const { signIn, signOut, updateUser } = authSlice.actions
export default authSlice.reducer
