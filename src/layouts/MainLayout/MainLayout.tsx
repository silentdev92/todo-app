import React, { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import styles from './MainLayout.module.sass'

const MainLayout: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home')
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.navbar}>
        <div className={styles.container}>
          <Navbar />
        </div>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
