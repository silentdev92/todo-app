import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEllipsis,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames/bind'
import styles from './TodoItem.module.sass'
import { Todo } from '../../store/todo/types'
import TodoService from '../../api/TodoService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { deleteTodo, updateTodo } from '../../store/todo/slice'
import { TodoForm } from '../TodoForm'
import { delay } from '../../helpers/delay'
import { useDropdownVisible } from '../../hooks/useDropdownVisible'
import { setAlert } from '../../store/alert/async'

const cx = classNames.bind(styles)

interface TodoItemProps {
  item: Todo
}

const TodoItem: FC<TodoItemProps> = ({ item }) => {
  const { dropdownRef, dropdownIsOpen, setDropdownIsOpen } =
    useDropdownVisible()
  const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false)

  const [showItem, setShowItem] = useState<boolean>(true)
  const [showForm, setshowForm] = useState<boolean>(false)

  const changeDisplay = async () => {
    if (editFormIsOpen) {
      setShowItem(false)
      await delay(300)
      setshowForm(true)
    } else {
      setshowForm(false)
      await delay(300)
      setShowItem(true)
    }
  }

  useEffect(() => {
    changeDisplay()
  }, [editFormIsOpen])

  const dispatch = useAppDispatch()

  const toggleTodo = async () => {
    try {
      const { data, error } = await TodoService.update(item.id, {
        completed: !item.completed,
      })
      if (error) throw error
      dispatch(updateTodo({ id: item.id, data: data[0] }))
      dispatch(setAlert({ type: 'success', text: 'Todo successfully updated' }))
    } catch (error: any) {
      dispatch(setAlert({ type: 'error', text: error.message }))
    }
  }

  const removeTodo = async () => {
    try {
      const { error } = await TodoService.delete(item.id)
      if (error) throw error
      dispatch(deleteTodo(item.id))
      dispatch(setAlert({ type: 'success', text: 'Todo successfully deleted' }))
    } catch (error: any) {
      dispatch(setAlert({ type: 'error', text: error.message }))
    }
  }

  return (
    <div
      className={cx('root', {
        'display-item': !editFormIsOpen,
        'display-form': editFormIsOpen,
      })}
    >
      <div>
        <CSSTransition
          addEndListener={(node: HTMLElement, done: () => void) => {
            node.addEventListener('transitionend', done, false)
          }}
          in={showItem}
          timeout={300}
          classNames="slide"
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.item}>
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
                  onClick={() => setDropdownIsOpen(true)}
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
                classNames="fade"
                mountOnEnter
                unmountOnExit
              >
                <div className={styles.dropdown} ref={dropdownRef}>
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
        </CSSTransition>
        <CSSTransition
          addEndListener={(node: HTMLElement, done: () => void) => {
            node.addEventListener('transitionend', done, false)
          }}
          in={showForm}
          timeout={300}
          classNames="slide"
          mountOnEnter
          unmountOnExit
        >
          <TodoForm
            mode="Edit"
            todo={item}
            onClose={() => setEditFormIsOpen(false)}
          />
        </CSSTransition>
      </div>
    </div>
  )
}

export default TodoItem
