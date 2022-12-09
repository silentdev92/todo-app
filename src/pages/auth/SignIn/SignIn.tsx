import React, { FC, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import classNames from 'classnames/bind'
import styles from '../auth.module.sass'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/ui/Input'
import AuthService from '../../../api/AuthService'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { signIn } from '../../../store/auth/slice'

const cx = classNames.bind(styles)

export interface SignInFormInput {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid Email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .max(20, 'Password cannot exceed more than 20 characters'),
})

const SignIn: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signInError, setSignInError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<SignInFormInput> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true)
      const { data, error } = await AuthService.signIn(email, password)
      if (error) throw error
      dispatch(signIn(data.user))
      navigate('/home')
    } catch (error: any) {
      setSignInError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign in - Todo App</title>
      </Helmet>
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faTableList} />
            </span>
            <span className={styles.text}>Todo App</span>
          </div>
          <div className={styles.title}>Sign in</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              label="Email address"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <div className={cx('button', { loading: isLoading })}>
              <button type="submit" disabled={!isValid || isLoading}>
                <span>Sign in</span>
              </button>
              {signInError && (
                <span className={styles.error}>{signInError}</span>
              )}
            </div>
          </form>
          <div className={styles.footer}>
            <div className={styles.divider}></div>
            <span className={styles.text}>Not have account?</span>
            &nbsp;
            <span className={styles.link}>
              <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
