import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Home.module.sass'

const Home: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faCalendar} />}
          text="Today"
          onClick={() => {
            console.log('click')
          }}
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          text="Yesterday"
          onClick={() => {}}
          active={true}
        />
      </div>
      <div className={styles.main}></div>
    </div>
  )
}

export default Home
