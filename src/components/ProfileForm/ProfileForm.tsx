import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './ProfileForm.module.sass'

const ProfileForm = () => {
  const { register } = useForm()

  return (
    <form className={styles.root}>
      <Input label="First name" name="firstName" register={register} />
      <Input label="Last name" name="lastName" register={register} />
      <Input label="Email address" name="email" register={register} />
      <div className={styles.actions}>
        <div className={styles.button}>
          <Button text="Apply" />
        </div>
        <div className={styles.button}>
          <Button text="Cancel" variant="outlined" />
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
