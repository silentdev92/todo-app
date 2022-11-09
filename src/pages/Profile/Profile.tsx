import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSliders } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Profile.module.sass'

const Profile = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUser} />}
          text="Profile"
          onClick={() => {
            console.log('click')
          }}
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faSliders} />}
          text="Settings"
          onClick={() => {}}
          active={true}
        />
      </div>
      <div className={styles.main}></div>
    </div>
  )
}

export default Profile
