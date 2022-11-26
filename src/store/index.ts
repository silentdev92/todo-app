import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/slice'
import alertReducer from './alert/slice'
import todoReducer from './todo/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    todo: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
