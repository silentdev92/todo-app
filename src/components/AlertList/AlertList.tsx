import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAlertList } from '../../store/alert/selectors'
import { Alert } from '../ui/Alert'
import styles from './AlertList.module.sass'

const AlertList = () => {
  const alertList = useAppSelector(selectAlertList)

  return (
    <div className={styles.root}>
      {!!alertList.length &&
        alertList.map(({ id, text, type }) => (
          <div className={styles.item} key={id}>
            <Alert type={type} text={text} />
          </div>
        ))}
    </div>
  )
}

export default AlertList
