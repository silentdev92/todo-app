import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './ProfileForm.module.sass'
import AuthService from '../../api/AuthService'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../store/auth/selectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateUser } from '../../store/auth/slice'
import { setAlert } from '../../store/alert/async'

export interface FormInput {
  email: string
  firstName: string
  lastName: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid Email address'),
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name length should be at least 2 characters')
    .max(15, 'First name cannot exceed more than 15 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name length should be at least 2 characters')
    .max(15, 'Last name cannot exceed more than 15 characters'),
})

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<FormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormInput> = async ({
    email,
    firstName,
    lastName,
  }) => {
    try {
      setIsLoading(true)
      const { data, error } = await AuthService.updateUserData(
        email,
        firstName,
        lastName
      )
      if (error) throw error
      dispatch(updateUser(data.user))
      dispatch(
        setAlert({ type: 'success', text: 'User data successfully updated' })
      )
    } catch (error: any) {
      dispatch(setAlert({ type: 'error', text: error.message }))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setValue('email', user?.email!)
    setValue('firstName', user?.user_metadata.firstName)
    setValue('lastName', user?.user_metadata.lastName)
  }, [])

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="First name"
        name="firstName"
        register={register}
        error={errors.firstName?.message}
      />
      <Input
        label="Last name"
        name="lastName"
        register={register}
        error={errors.lastName?.message}
      />
      <Input
        type="email"
        label="Email address"
        name="email"
        register={register}
        error={errors.email?.message}
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

export default ProfileForm
