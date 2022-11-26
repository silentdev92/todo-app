import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faTriangleExclamation,
  faCircleExclamation,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { AlertType } from '../../../store/alert/types'
import styles from './Alert.module.sass'

const cx = classNames.bind(styles)

interface AlertProps {
  type: AlertType
  text: string
}

const Alert: FC<AlertProps> = ({ type, text }) => {
  return (
    <div className={cx('root', type)}>
      <div className={styles.icon}>
        {type === 'error' && <FontAwesomeIcon icon={faCircleExclamation} />}
        {type === 'info' && <FontAwesomeIcon icon={faCircleInfo} />}
        {type === 'warning' && <FontAwesomeIcon icon={faTriangleExclamation} />}
        {type === 'success' && <FontAwesomeIcon icon={faCircleCheck} />}
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}

export default Alert
