import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from '../auth.module.sass'

export interface SignUpFormInput {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirm: string
}

const SignUp: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faTableList} />
          </span>
          <span className={styles.text}>Todo App</span>
        </div>
        <div className={styles.title}>Sign up</div>
        <form>
          <div className={styles['text-field']}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" />
            <span className={styles.error}>Invalid email</span>
          </div>
          <div className={styles['text-field']}>
            <label htmlFor="username">Username</label>
            <input type="password" id="username" placeholder="your username" />
          </div>
          <div className={styles['text-field']}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="your password" />
          </div>
          <div className={styles['text-field']}>
            <label htmlFor="password2">Confirm password</label>
            <input type="email" id="password2" placeholder="your password" />
          </div>
          <div className={styles.button}>
            <button type="submit" disabled>
              Sign up
            </button>
          </div>
        </form>
        <div className={styles.footer}>
          <div className={styles.divider}></div>
          <span className={styles.text}>Not have account?</span>
          &nbsp;
          <span className={styles.link}>
            <Link to="/signin">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignUp
