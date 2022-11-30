import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './ProfileForm.module.sass'

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
    email,
    firstName,
    lastName,
  }) => {
    console.log(email, firstName, lastName)
  }

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

export default ProfileForm
