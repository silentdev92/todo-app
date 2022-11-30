import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './SettingsForm.module.sass'

const SettingsForm = () => {
  const { register } = useForm()
  return (
    <form className={styles.root}>
      <Input label="Password" name="password" register={register} />
      <Input
        label="Confirm password"
        name="passwordConfirm"
        register={register}
      />
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

export default SettingsForm
