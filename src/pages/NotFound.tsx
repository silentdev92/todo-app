import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { selectIsSignedIn } from '../store/auth/selectors'

const NotFound: FC = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn)

  if (isSignedIn) {
    return <Navigate to="/home" replace={true} />
  } else {
    return <Navigate to="/signin" replace={true} />
  }
}

export default NotFound
