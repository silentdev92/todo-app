import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Home.module.sass'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../store/auth/selectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import TodoService from '../../api/TodoService'
import { setTodos } from '../../store/todo/slice'
import { selectSortedTodoLists } from '../../store/todo/selectors'
import { SortedTodoList } from '../../store/todo/types'
import { DailyTodos } from '../../components/DailyTodos'
import { MonthlyTodos } from '../../components/MonthlyTodos'

const Home: FC = () => {
  const sortedTodoLists = useAppSelector(selectSortedTodoLists)

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const [currentTodoList, setCurrentTodoList] = useState<SortedTodoList | null>(
    null
  )

  const changeCurrentTodoList = (id: number) => {
    const todoList = sortedTodoLists.find((todo) => todo.id === id)
    setCurrentTodoList(todoList!)
  }

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

  useEffect(() => {
    setCurrentTodoList(sortedTodoLists[0])
  }, [sortedTodoLists.length])

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        {sortedTodoLists.map(({ id, title }) => (
          <SidebarItem
            icon={
              <FontAwesomeIcon
                icon={
                  title === 'Today' || title === 'Yesterday'
                    ? faCalendar
                    : faCalendarDays
                }
              />
            }
            text={title}
            active={currentTodoList?.id === id}
            onClick={() => changeCurrentTodoList(id)}
            key={id}
          />
        ))}
      </div>
      <div className={styles.main}>
        {currentTodoList &&
          (currentTodoList.title === 'Today' ||
          currentTodoList.title === 'Yesterday' ? (
            <DailyTodos todoList={currentTodoList} />
          ) : (
            <MonthlyTodos todoList={currentTodoList} />
          ))}
      </div>
    </div>
  )
}

export default Home
