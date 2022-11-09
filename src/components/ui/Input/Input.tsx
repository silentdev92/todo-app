import React, { ChangeEvent, FC } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { SignUpFormInput } from '../../../pages/auth/SignUp/SignUp'
import { SignInFormInput } from '../../../pages/auth/SignIn/SignIn'
import styles from './Input.module.sass'

interface InputProps {
  label: string
  name: Path<SignUpFormInput | SignInFormInput>
  register: any
  // register: UseFormRegister<SignUpFormInput | SignInFormInput>
  error?: string
}

const Input: FC<InputProps> = ({ label, name, register, error }) => {
  return (
    <div className={styles.root}>
      <label>{label}</label>
      <input {...register(name)} placeholder={label} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default Input
