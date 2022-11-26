import { Alert, AlertState } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AlertState = {
  list: [],
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert(state, action: PayloadAction<Alert>) {
      state.list.push(action.payload)
    },
    deleteAlert(state, action: PayloadAction<number>) {
      state.list = state.list.filter((item) => item.id !== action.payload)
    },
  },
})

export const { createAlert, deleteAlert } = alertSlice.actions
export default alertSlice.reducer
