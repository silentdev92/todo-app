import { RootState } from './../index'

export const selectAuthState = (state: RootState) => state.auth

export const selectIsSignedIn = (state: RootState) =>
  selectAuthState(state).isSignedIn
export const selectUser = (state: RootState) => selectAuthState(state).user
