import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Home.module.sass'
import { TodoItem } from '../../components/TodoItem'
import { TodoForm } from '../../components/TodoForm'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../store/auth/selectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import TodoService from '../../api/TodoService'
import { setTodos } from '../../store/todo/slice'

const Home: FC = () => {
  const [addTodoFormIsOpen, setAddTodoFormIsOpen] = useState<boolean>(false)

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const fetchTodoList = async () => {
    try {
      const { data, error } = await TodoService.selectAll(user!.id)
      if (error) throw error
      dispatch(setTodos(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

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
          <TodoForm onClose={() => setAddTodoFormIsOpen(false)} />
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
