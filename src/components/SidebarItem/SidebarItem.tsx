import React, { FC, ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './SidebarItem.module.sass'

const cx = classNames.bind(styles)

interface SidebarItemProps {
  icon: ReactNode
  text: string
  onClick: () => void
  active?: boolean
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  onClick,
  active = false,
}) => {
  return (
    <div className={cx('root', { active })} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}

export default SidebarItem
