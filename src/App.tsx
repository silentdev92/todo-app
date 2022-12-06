import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthService from './api/AuthService'
import { AlertList } from './components/AlertList'
import AppRouter from './components/AppRouter'
import { useAppDispatch } from './hooks/useAppDispatch'
import { signIn } from './store/auth/slice'

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const signInFromSession = async () => {
    try {
      const { data, error } = await AuthService.getSession()
      if (error) throw error
      if (data.session) {
        const { data, error } = await AuthService.refreshSession()
        if (error) throw error
        if (data.session && data.user) dispatch(signIn(data.user))
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    signInFromSession()
  }, [])

  return (
    <>
      {!isLoading && (
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      )}
      <AlertList />
    </>
  )
}

export default App
