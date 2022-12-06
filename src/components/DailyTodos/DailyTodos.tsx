import React, { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import styles from './DailyTodos.module.sass'
import { TodoForm } from '../../components/TodoForm'
import { TodoList } from '../../components/TodoList'
import { delay } from '../../helpers/delay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SortedTodoList } from '../../store/todo/types'

interface DailyTodosProps {
  todoList: SortedTodoList
}

const DailyTodos: FC<DailyTodosProps> = ({ todoList }) => {
  const [addTodoFormIsOpen, setAddTodoFormIsOpen] = useState<boolean>(false)

  const [showButton, setShowButton] = useState<boolean>(true)
  const [showForm, setshowForm] = useState<boolean>(false)

  const changeDisplay = async () => {
    if (addTodoFormIsOpen) {
      setShowButton(false)
      await delay(300)
      setshowForm(true)
    } else {
      setshowForm(false)
      await delay(300)
      setShowButton(true)
    }
  }

  useEffect(() => {
    changeDisplay()
  }, [addTodoFormIsOpen])

  return (
    <div className={styles.root}>
      <div className={styles.title}>{todoList.title}</div>
      <div className={styles.list}>
        <TodoList list={todoList.list} />
      </div>
      {todoList.title === 'Today' && (
        <>
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
            <TodoForm onClose={() => setAddTodoFormIsOpen(false)} />
          </CSSTransition>
          <CSSTransition
            addEndListener={(node: HTMLElement, done: () => void) => {
              node.addEventListener('transitionend', done, false)
            }}
            in={showButton}
            timeout={300}
            classNames="fade"
            mountOnEnter
            unmountOnExit
          >
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
          </CSSTransition>
        </>
      )}
    </div>
  )
}

export default DailyTodos
