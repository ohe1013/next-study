import { atom } from 'recoil'
import { alertKeys } from '../recoilKeys'

export type alertType = 'info' | 'danger' | 'success' | 'warn' | 'default'
interface AlertType {
  visible: boolean
  type: alertType
  message: string
}

const defaultValue: AlertType = {
  visible: false,
  type: 'default',
  message: '',
}

const alertState = atom<AlertType>({
  key: alertKeys.default,
  default: defaultValue,
})

export { alertState }
