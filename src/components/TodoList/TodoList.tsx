import React, { FC, useMemo } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'
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
          <TransitionGroup>
            {list.map((item) => (
              <CSSTransition
                addEndListener={(node: HTMLElement, done: () => void) => {
                  node.addEventListener('transitionend', done, false)
                }}
                timeout={300}
                classNames={{
                  enter: styles['slide-enter'],
                  enterActive: styles['slide-enter-active'],
                  enterDone: styles['slide-enter-done'],
                  exit: styles['slide-exit'],
                  exitActive: styles['slide-exit-active'],
                  exitDone: styles['slide-exit-done'],
                }}
                mountOnEnter
                unmountOnExit
                key={item.id}
              >
                <div className={styles.item}>
                  <TodoItem item={item} />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </>
      ) : (
        <span className={styles.empty}>No todos</span>
      )}
    </div>
  )
}

export default TodoList
