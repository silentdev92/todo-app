import AuthService from '../../api/AuthService'

export interface AuthState {
  isSignedIn: boolean
  user: User
}

export type User = Awaited<
  ReturnType<typeof AuthService.getUser>
>['data']['user']
