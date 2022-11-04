import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from '../auth.module.sass'

const SignIn: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faTableList} />
          </span>
          <span className={styles.text}>Todo App</span>
        </div>
        <div className={styles.title}>Sign in</div>
        <form>
          <div className={styles['text-field']}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" />
            <span className={styles.error}>Invalid email</span>
          </div>
          <div className={styles['text-field']}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="your password" />
          </div>
          <div className={styles.button}>
            <button type="submit" disabled>
              Sign in
            </button>
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
  )
}

export default SignIn
