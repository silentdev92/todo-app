import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import styles from './MainLayout.module.sass'

const MainLayout: FC = () => {
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
