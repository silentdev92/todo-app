import React, { ChangeEvent, FC } from 'react'
import styles from './Input.module.sass'

interface InputProps {
  type?: 'text' | 'email' | 'password'
  id: string
  name: string
  value: string
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const Input: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  error,
}) => {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default Input
