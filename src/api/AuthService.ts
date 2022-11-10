import { supabase } from './index'

class AuthService {
  signUp(email: string, password: string, firstName: string, lastName: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    })
  }
  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  }
  signOut() {
    return supabase.auth.signOut()
  }
  getSession() {
    return supabase.auth.getSession()
  }
  refreshSession() {
    return supabase.auth.refreshSession()
  }
  getUser() {
    return supabase.auth.getUser()
  }
  updateUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return supabase.auth.updateUser({
      email,
      password,
      data: {
        firstName,
        lastName,
      },
    })
  }
}

export default new AuthService()
