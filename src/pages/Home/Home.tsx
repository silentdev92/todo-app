import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSTransition } from 'react-transition-group'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Home.module.sass'
import { TodoForm } from '../../components/TodoForm'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../store/auth/selectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import TodoService from '../../api/TodoService'
import { setTodos } from '../../store/todo/slice'
import { TodoList } from '../../components/TodoList'
import { selectTodoList } from '../../store/todo/selectors'
import { delay } from '../../helpers/delay'

const Home: FC = () => {
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

  const list = useAppSelector(selectTodoList)

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
        <div className={styles.list}>
          <TodoList list={list} />
        </div>
        <CSSTransition
          addEndListener={(node: HTMLElement, done: () => void) => {
            node.addEventListener('transitionend', done, false)
          }}
          in={showForm}
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
        >
          <TodoForm onClose={() => setAddTodoFormIsOpen(false)} />
        </CSSTransition>
        <CSSTransition
          addEndListener={(node: HTMLElement, done: () => void) => {
            node.addEventListener('transitionend', done, false)
          }}
          in={showButton}
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
      </div>
    </div>
  )
}

export default Home
