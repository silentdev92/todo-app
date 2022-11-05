import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEllipsis,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import styles from './TodoItem.module.sass'

const TodoItem = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <div className={styles.checkbox}>
        <input type="checkbox" />
      </div>
      <div className={styles.card}>
        <div className={styles.left}>
          <span className={styles.title}>Cooking a salmon sushi</span>
          <span className={styles.description}>
            Salmon and tuna i think is good for dinner, i wanna make it today :D
          </span>
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
