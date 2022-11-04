import React, { FC } from 'react'
import styles from './Home.module.sass'

const Home: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}></div>
      <div className={styles.main}></div>
    </div>
  )
}

export default Home
