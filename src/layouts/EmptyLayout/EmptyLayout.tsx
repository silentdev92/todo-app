import React, { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './EmptyLayout.module.sass'

const EmptyLayout: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signin')
  }, [])

  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  )
}

export default EmptyLayout
