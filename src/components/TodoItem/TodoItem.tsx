import React, { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEllipsis,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import styles from './TodoItem.module.sass'
import { Todo } from '../../store/todo/types'
import TodoService from '../../api/TodoService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { deleteTodo, updateTodo } from '../../store/todo/slice'
import { TodoForm } from '../TodoForm'

interface TodoItemProps {
  item: Todo
}

const TodoItem: FC<TodoItemProps> = ({ item }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)
  const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const toggleTodo = async () => {
    try {
      const { data, error } = await TodoService.update(item.id, {
        completed: !item.completed,
      })
      if (error) throw error
      dispatch(updateTodo({ id: item.id, data: data[0] }))
    } catch (error) {
      console.log(error)
    }
  }

  const removeTodo = async () => {
    try {
      const { error } = await TodoService.delete(item.id)
      if (error) throw error
      dispatch(deleteTodo(item.id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!editFormIsOpen ? (
        <div className={styles.root}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={toggleTodo}
            />
          </div>
          <div className={styles.card}>
            <div className={styles.left}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </div>
            <div className={styles.right}>
              <div
                className={styles.icon}
                onClick={() => setEditFormIsOpen(true)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
              <div
                className={styles.icon}
                onClick={() => setDropdownIsOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
            <CSSTransition
              addEndListener={(node: HTMLElement, done: () => void) => {
                node.addEventListener('transitionend', done, false)
              }}
              in={dropdownIsOpen}
              timeout={300}
              classNames={{
                enter: styles['fade-enter'],
                enterActive: styles['fade-enter-active'],
                enterDone: styles['fade-enter-done'],
                exit: styles['fade-exit'],
                exitActive: styles['fade-exit-active'],
                exitDone: styles['fade-exit-done'],
              }}
              mountOnEnter
              unmountOnExit
            >
              <div className={styles.dropdown}>
                <div className={styles.item} onClick={removeTodo}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                  <span className={styles.text}>Delete</span>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      ) : (
        <div className={styles['edit-form']}>
          <TodoForm
            mode="Edit"
            todo={item}
            onClose={() => setEditFormIsOpen(false)}
          />
        </div>
      )}
    </>
  )
}

export default TodoItem
