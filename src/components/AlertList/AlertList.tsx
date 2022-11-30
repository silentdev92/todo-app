import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAlertList } from '../../store/alert/selectors'
import { Alert } from '../ui/Alert'
import styles from './AlertList.module.sass'

const AlertList = () => {
  const alertList = useAppSelector(selectAlertList)

  return (
    <div className={styles.root}>
      {!!alertList.length && (
        <TransitionGroup>
          {alertList.map(({ id, text, type }) => (
            <CSSTransition
              addEndListener={(node: HTMLElement, done: () => void) => {
                node.addEventListener('transitionend', done, false)
              }}
              timeout={300}
              classNames="slide"
              mountOnEnter
              unmountOnExit
              key={id}
            >
              <div className={styles.item}>
                <Alert type={type} text={text} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  )
}

export default AlertList
