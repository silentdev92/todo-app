import React, { FC } from 'react'
import {
  faTableList,
  faUser,
  faSliders,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Navbar.module.sass'
import AuthService from '../../api/AuthService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../store/auth/slice'
import { CSSTransition } from 'react-transition-group'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectFullUserName } from '../../store/auth/selectors'
import { useDropdownVisible } from '../../hooks/useDropdownVisible'
import { setAlert } from '../../store/alert/async'
import { clearTodoList } from '../../store/todo/slice'

const cx = classNames.bind(styles)

const Navbar: FC = () => {
  const { dropdownRef, dropdownIsOpen, setDropdownIsOpen } =
    useDropdownVisible()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const fullUserName = useAppSelector(selectFullUserName)

  const signOutHandler = async () => {
    try {
      const { error } = await AuthService.signOut()
      if (error) throw error
      dispatch(signOut())
      dispatch(clearTodoList())
      setDropdownIsOpen(false)
      dispatch(
        setAlert({ type: 'info', text: 'You have successfully signed out' })
      )
      navigate('/signin')
    } catch (error: any) {
      dispatch(setAlert({ type: 'error', text: error.message }))
    }
  }

  const navigateToHome = () => {
    navigate('/home')
  }

  const navigateToProfile = () => {
    navigate('/profile')
    setDropdownIsOpen(false)
  }

  const navigateToSettings = () => {
    navigate('/profile?tab=settings')
    setDropdownIsOpen(false)
  }

  return (
    <div className={styles.root}>
      <div className={styles.logo} onClick={navigateToHome}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faTableList} />
        </span>
        <span className={styles.text}>Todo App</span>
      </div>
      <div className={styles.user} onClick={() => setDropdownIsOpen(true)}>
        <span className={styles.name}>{fullUserName}</span>
      </div>
      <CSSTransition
        addEndListener={(node: HTMLElement, done: () => void) => {
          node.addEventListener('transitionend', done, false)
        }}
        in={dropdownIsOpen}
        timeout={300}
        classNames="fade"
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.dropdown} ref={dropdownRef}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={navigateToProfile}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className={styles.text}>Profile</span>
            </li>
            <li className={styles.item} onClick={navigateToSettings}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faSliders} />
              </span>
              <span className={styles.text}>Settings</span>
            </li>
          </ul>
          <div className={styles.divider}></div>
          <ul className={styles.list}>
            <li className={cx('item', 'active')} onClick={signOutHandler}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
              <span className={styles.text}>Sign out</span>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Navbar
