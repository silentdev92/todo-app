import React, { FC } from 'react'
import { Button } from '../ui/Button'
import styles from './TodoForm.module.sass'

interface TodoFormProps {
  mode?: 'Add' | 'Edit'
}

const TodoForm: FC<TodoFormProps> = ({ mode = 'Add' }) => {
  return (
    <form className={styles.root}>
      <div className={styles['text-fields']}>
        <input type="text" className={styles.title} placeholder="Task title" />
        <textarea
          className={styles.description}
          placeholder="Description"
        ></textarea>
      </div>
      <div className={styles.actions}>
        <div className={styles.button}>
          <Button
            type="submit"
            text={mode}
            onClick={() => {}}
            variant="contained"
          />
        </div>
        <div className={styles.button}>
          <Button text="Cancel" onClick={() => {}} variant="outlined" />
        </div>
      </div>
    </form>
  )
}

export default TodoForm