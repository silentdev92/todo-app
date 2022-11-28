import { RootState } from './../index'

export const selectAuthState = (state: RootState) => state.auth

export const selectIsSignedIn = (state: RootState) =>
  selectAuthState(state).isSignedIn
export const selectUser = (state: RootState) => selectAuthState(state).user

export const selectFullUserName = (state: RootState) => {
  const user = selectUser(state)
  const firstName = user?.user_metadata.firstName
  const lastName = user?.user_metadata.lastName
  return firstName + ' ' + lastName
}
