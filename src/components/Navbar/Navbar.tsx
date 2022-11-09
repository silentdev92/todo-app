import React, { FC, useState } from 'react'
import {
  faTableList,
  faUser,
  faSliders,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Navbar.module.sass'

const cx = classNames.bind(styles)

const Navbar: FC = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faTableList} />
        </span>
        <span className={styles.text}>Todo App</span>
      </div>
      <div
        className={styles.user}
        onClick={() => setDropdownIsOpen((prevState) => !prevState)}
      >
        <span className={styles.name}>Ivan</span>
      </div>
      {dropdownIsOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className={styles.text}>Profile</span>
            </li>
            <li className={styles.item}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faSliders} />
              </span>
              <span className={styles.text}>Settings</span>
            </li>
          </ul>
          <div className={styles.divider}></div>
          <ul className={styles.list}>
            <li className={cx('item', 'active')}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
              <span className={styles.text}>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
