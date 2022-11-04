import React, { FC } from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.sass'

const cx = classNames.bind(styles)

interface ButtonProps {
  type?: 'button' | 'submit'
  variant?: 'contained' | 'outlined'
  disabled?: boolean
  onClick: () => void
  text: string
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  variant = 'contained',
  disabled = false,
  onClick,
  text,
}) => {
  const className = cx('root', {
    contained: variant === 'contained',
    outlined: variant === 'outlined',
  })

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
