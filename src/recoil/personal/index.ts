import { atom } from 'recoil'

const configState = atom({
  key: 'personal',
  default: {
    adminName: '',
    code: '',
    itemKey: '',
    teamName: '',
    userKey: '',
  },
})

export { configState }
