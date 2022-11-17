import React, { FC } from 'react'
import styles from './Input.module.sass'

interface InputProps {
  type?: 'text' | 'email' | 'password'
  label: string
  name: string
  register: any
  error?: string
}

const Input: FC<InputProps> = ({
  type = 'text',
  label,
  name,
  register,
  error,
}) => {
  return (
    <div className={styles.root}>
      <label>{label}</label>
      <input {...register(name)} placeholder={label} type={type} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default Input
