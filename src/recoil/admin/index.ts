import { atom } from 'recoil'
import { adminKeys } from '../recoilKeys'

type AdminFunnelRollbackFns = Function[]

const defaultValue: AdminFunnelRollbackFns = []

const adminFunnelRollback = atom<AdminFunnelRollbackFns>({
  key: adminKeys.default,
  default: defaultValue,
})

export { adminFunnelRollback }
