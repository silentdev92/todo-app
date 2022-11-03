import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './EmptyLayout.module.sass'

const EmptyLayout: FC = () => {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  )
}

export default EmptyLayout
