import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Home.module.sass'
import { TodoItem } from '../../components/TodoItem'
import { TodoForm } from '../../components/TodoForm'

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
      <div className={styles.main}>
        <TodoItem />
        <TodoForm />
      </div>
    </div>
  )
}

export default Home
