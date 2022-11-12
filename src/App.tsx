import React, { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthService from './api/AuthService'
import AppRouter from './components/AppRouter'
import { useAppDispatch } from './hooks/useAppDispatch'
import { signIn } from './store/auth/slice'

const App: FC = () => {
  const dispatch = useAppDispatch()

  const signInFromSession = async () => {
    try {
      const { data, error } = await AuthService.getSession()
      if (error) throw error
      if (data.session) {
        dispatch(signIn(data.session.user))
      }
    } catch (error: any) {}
  }

  useEffect(() => {
    signInFromSession()
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
