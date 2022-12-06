import React, { FC, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './MonthlyTodos.module.sass'
import { TodoList } from '../../components/TodoList'
import { SortedTodoList, Todo } from '../../store/todo/types'

const cx = classNames.bind(styles)

interface MonthlyTodosProps {
  todoList: SortedTodoList
}

const MonthlyTodos: FC<MonthlyTodosProps> = ({ todoList }) => {
  const [currentDay, setCurrentDay] = useState<number>()

  const days = useMemo<number[]>(() => {
    const days = todoList.list.map((todo) => moment(todo.created_at).date())
    const result: number[] = []
    for (let day of days) {
      if (!result.includes(day)) {
        result.push(day)
      }
    }
    return result
  }, [todoList])

  const items = useMemo<Todo[]>(
    () =>
      todoList.list.filter(
        (todo) => moment(todo.created_at).date() === currentDay
      ),
    [currentDay]
  )

  useEffect(() => {
    setCurrentDay(days[0])
  }, [days])

  return (
    <div className={styles.root}>
      <div className={styles.title}>Upcoming</div>
      <div className={styles.month}>{todoList.title}</div>
      <div className={styles.days}>
        {days.length &&
          days.map((day) => (
            <span
              className={cx('item', { active: currentDay === day })}
              key={day}
              onClick={() => setCurrentDay(day)}
            >
              {day}
            </span>
          ))}
      </div>
      <div className={styles.list}>
        <TodoList list={items} />
      </div>
    </div>
  )
}

export default MonthlyTodos
