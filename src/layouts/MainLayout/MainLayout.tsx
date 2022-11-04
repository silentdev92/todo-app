import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import styles from './MainLayout.module.sass'

const MainLayout: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.navBar}>
        <div className={styles.container}>
          <NavBar />
        </div>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
