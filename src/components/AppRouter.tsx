import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { EmptyLayout } from '../layouts/EmptyLayout'
import { MainLayout } from '../layouts/MainLayout'
import { SignIn } from '../pages/auth/SignIn'
import { SignUp } from '../pages/auth/SignUp'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { selectIsSignedIn } from '../store/auth/selectors'

const publicRoutes = [
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]

const authRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]

const AppRouter: FC = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn)

  return (
    <Routes>
      {!isSignedIn ? (
        <Route path="/" element={<EmptyLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route {...route} key={idx} />
          ))}
        </Route>
      ) : (
        <Route path="/" element={<MainLayout />}>
          {authRoutes.map((route, idx) => (
            <Route {...route} key={idx} />
          ))}
        </Route>
      )}
    </Routes>
  )
}

export default AppRouter
