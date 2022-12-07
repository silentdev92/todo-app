import React, { FC, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import styles from '../auth.module.sass'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/ui/Input'
import AuthService from '../../../api/AuthService'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { signIn } from '../../../store/auth/slice'

export interface SignUpFormInput {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirm: string
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

const SignUp: FC = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<SignUpFormInput> = async ({
    email,
    password,
    firstName,
    lastName,
  }) => {
    try {
      const { data, error } = await AuthService.signUp(
        email,
        password,
        firstName,
        lastName
      )
      if (error) throw error
      dispatch(signIn(data.user))
      navigate('/home')
    } catch (error: any) {
      setSignUpError(error.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign up - Todo App</title>
      </Helmet>
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faTableList} />
            </span>
            <span className={styles.text}>Todo App</span>
          </div>
          <div className={styles.title}>Sign up</div>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className={styles.button}>
              <button type="submit" disabled={!isValid}>
                Sign up
              </button>
              {signUpError && (
                <span className={styles.error}>{signUpError}</span>
              )}
            </div>
          </form>
          <div className={styles.footer}>
            <div className={styles.divider}></div>
            <span className={styles.text}>Already have an account?</span>
            &nbsp;
            <span className={styles.link}>
              <Link to="/signin">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
