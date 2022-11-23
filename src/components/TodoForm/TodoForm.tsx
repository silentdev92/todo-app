import React, { FC, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Todo } from '../../store/todo/types'
import { Button } from '../ui/Button'
import styles from './TodoForm.module.sass'
import TodoService from '../../api/TodoService'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectUser } from '../../store/auth/selectors'
import { addTodo, updateTodo } from '../../store/todo/slice'

interface TodoFormProps {
  mode?: 'Add' | 'Edit'
  todo?: Todo
  onClose: () => void
}

export interface FormInput {
  title: string
  description: string
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
})

const TodoForm: FC<TodoFormProps> = ({ mode = 'Add', todo, onClose }) => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ title, description }) => {
    try {
      if (mode === 'Add') {
        const { data, error } = await TodoService.create(
          title,
          description,
          user!.id
        )
        if (error) throw error
        dispatch(addTodo(data[0]))
      }
      if (mode === 'Edit') {
        const { data, error } = await TodoService.update(todo!.id, {
          title,
          description,
        })
        if (error) throw error
        dispatch(updateTodo({ id: todo!.id, data: data[0] }))
      }
    } catch (error: any) {
      console.log(error.message)
    } finally {
      onClose()
    }
  }

  useEffect(() => {
    if (todo) {
      setValue('title', todo.title)
      setValue('description', todo.description)
    }
  }, [])

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['text-fields']}>
        <input
          type="text"
          className={styles.title}
          placeholder="Task title"
          {...register('title')}
        />
        <textarea
          className={styles.description}
          placeholder="Description"
          {...register('description')}
        ></textarea>
      </div>
      <div className={styles.actions}>
        <div className={styles.button}>
          <Button
            type="submit"
            text={mode}
            variant="contained"
            disabled={!isValid}
          />
        </div>
        <div className={styles.button}>
          <Button text="Cancel" onClick={() => onClose()} variant="outlined" />
        </div>
      </div>
    </form>
  )
}

export default TodoForm
