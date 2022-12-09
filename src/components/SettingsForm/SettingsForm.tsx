import React, { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './SettingsForm.module.sass'
import AuthService from '../../api/AuthService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../store/auth/selectors'
import { signOut } from '../../store/auth/slice'
import { setAlert } from '../../store/alert/async'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormInput> = async ({ password }) => {
    try {
      setIsLoading(true)
      const { error } = await AuthService.updateUserPassword(password)
      if (error) throw error
      dispatch(
        setAlert({
          type: 'success',
          text: 'User password successfully updated',
        })
      )
      if (!error) {
        const { error } = await AuthService.signOut()
        if (error) throw error
        dispatch(signOut())
      }
    } catch (error: any) {
      dispatch(setAlert({ type: 'error', text: error.message }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="password"
        label="New password"
        name="password"
        register={register}
        error={errors.password?.message}
      />
      <Input
        type="password"
        label="Confirm new password"
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
            disabled={!isValid || isLoading}
            loading={isLoading}
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
