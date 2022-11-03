import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.sass'

const MainLayout = () => {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  )
}

export default MainLayout
