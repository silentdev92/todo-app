import React, { FC, useMemo } from 'react'
import { Todo } from '../../store/todo/types'
import { TodoItem } from '../TodoItem'
import styles from './TodoList.module.sass'

interface TodoListProps {
  list: Todo[]
}

const TodoList: FC<TodoListProps> = ({ list }) => {
  const completedTodoCount = useMemo(
    () => list.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
    [list]
  )

  return (
    <div className={styles.root}>
      {list.length ? (
        <>
          <div className={styles.completed}>
            {completedTodoCount}/{list.length} completed
          </div>
          {list.map((item) => (
            <div className={styles.item} key={item.id}>
              <TodoItem item={item} />
            </div>
          ))}
        </>
      ) : (
        <span className={styles.empty}>No todos</span>
      )}
    </div>
  )
}

export default TodoList
