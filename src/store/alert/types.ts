export interface AlertState {
  list: Alert[]
}

export interface Alert {
  id: number
  type: AlertType
  text: string
}

export interface AlertAttributes {
  type: AlertType
  text: string
}

export type AlertType = 'error' | 'info' | 'warning' | 'success'
