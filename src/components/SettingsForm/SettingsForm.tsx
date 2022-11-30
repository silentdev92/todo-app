import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './SettingsForm.module.sass'

export interface FormInput {
  password: string
  passwordConfirm: string
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .max(20, 'Password cannot exceed more than 20 characters'),
  passwordConfirm: yup
    .string()
    .required('Confirm password is required')
    .min(8, 'Password length should be at least 8 characters')
    .max(20, 'Password cannot exceed more than 20 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

const SettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormInput> = async ({
    password,
    passwordConfirm,
  }) => {
    console.log(password, passwordConfirm)
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Password"
        name="password"
        register={register}
        error={errors.password?.message}
      />
      <Input
        label="Confirm password"
        name="passwordConfirm"
        register={register}
        error={errors.passwordConfirm?.message}
      />
      <div className={styles.actions}>
        <div className={styles.button}>
          <Button
            text="Apply"
            type="submit"
            variant="contained"
            disabled={!isValid}
          />
        </div>
        <div className={styles.button}>
          <Button text="Cancel" variant="outlined" onClick={() => reset()} />
        </div>
      </div>
    </form>
  )
}

export default SettingsForm
