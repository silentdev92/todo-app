import { createAsyncThunk } from '@reduxjs/toolkit'
import { delay } from '../../helpers/delay'
import { createAlert, deleteAlert } from './slice'
import { AlertAttributes } from './types'

export const setAlert = createAsyncThunk<void, AlertAttributes>(
  'alert/setAlert',
  async (alert, { dispatch }) => {
    const id = Math.round(Date.now() * Math.random())
    dispatch(
      createAlert({
        id,
        ...alert,
      })
    )
    await delay(5000)
    dispatch(deleteAlert(id))
  }
)
