import React, { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Home.module.sass'
import { TodoItem } from '../../components/TodoItem'
import { TodoForm } from '../../components/TodoForm'

const Home: FC = () => {
  const [addTodoFormIsOpen, setAddTodoFormIsOpen] = useState<boolean>(false)

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
        <div className={styles.title}>Today</div>
        <div className={styles.completed}>4/6 completed</div>
        <div className={styles.list}>
          <TodoItem />
        </div>
        {addTodoFormIsOpen ? (
          <TodoForm />
        ) : (
          <div
            className={styles['add-button']}
            onClick={() => {
              setAddTodoFormIsOpen(true)
            }}
          >
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </div>
            <div className={styles.text}>Add todo</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
