import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSliders } from '@fortawesome/free-solid-svg-icons'
import { SidebarItem } from '../../components/SidebarItem'
import styles from './Profile.module.sass'
import { useSearchParams } from 'react-router-dom'
import { ProfileForm } from '../../components/ProfileForm'
import { SettingsForm } from '../../components/SettingsForm'

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab')

  useEffect(() => {
    if (tab && tab !== 'settings') {
      setSearchParams('')
    }
  }, [tab])

  return (
    <>
      <Helmet>
        <title>Profile - Todo App</title>
      </Helmet>
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faUser} />}
            text="Profile"
            onClick={() => setSearchParams('')}
            active={tab === null}
          />
          <SidebarItem
            icon={<FontAwesomeIcon icon={faSliders} />}
            text="Settings"
            onClick={() => setSearchParams('tab=settings')}
            active={tab === 'settings'}
          />
        </div>
        <div className={styles.main}>
          {tab === null && <ProfileForm />}
          {tab === 'settings' && <SettingsForm />}
        </div>
      </div>
    </>
  )
}

export default Profile
