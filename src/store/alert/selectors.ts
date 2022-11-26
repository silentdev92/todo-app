import { RootState } from './../index'

export const selectAlertState = (state: RootState) => state.alert

export const selectAlertList = (state: RootState) =>
  selectAlertState(state).list
