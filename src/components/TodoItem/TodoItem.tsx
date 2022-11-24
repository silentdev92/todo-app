import React, { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEllipsis,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import styles from './TodoItem.module.sass'
import { Todo } from '../../store/todo/types'
import TodoService from '../../api/TodoService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateTodo } from '../../store/todo/slice'

interface TodoItemProps {
  item: Todo
}

const TodoItem: FC<TodoItemProps> = ({
  item: { id, title, description, completed },
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const toggleTodo = async () => {
    try {
      const { data, error } = await TodoService.update(id, {
        completed: !completed,
      })
      if (error) throw error
      dispatch(updateTodo({ id, data: data[0] }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.checkbox}>
        <input type="checkbox" checked={completed} onChange={toggleTodo} />
      </div>
      <div className={styles.card}>
        <div className={styles.left}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.right}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div
            className={styles.icon}
            onClick={() => setDropdownIsOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
        {dropdownIsOpen && (
          <div className={styles.dropdown}>
            <div className={styles.item}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
              <span className={styles.text}>Delete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoItem
