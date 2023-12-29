import { ReactNode, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { alertState, alertType } from 'src/recoil/alert/alert'

interface AlertProps {
  visible: true
  type: alertType
  message: string
}
type AlertContainerProps = Omit<AlertProps, 'message' | 'visible'> & {
  children: ReactNode
  animationType: string
}
type AlertMessageProps = Omit<AlertProps, 'visible'>
const alertColor = {
  info: 'bg-blue-50 text-blue-800 dark:text-blue-300',
  danger: 'bg-red-50 text-red-800 dark:text-red-300',
  success: 'bg-green-50 text-green-800 dark:text-green-300',
  warn: 'bg-yellow-50 text-yellow-800 dark:text-yellow-300',
  default: 'bg-gray-50 text-gray-800 dark:text-gray-300',
}

export const Alert = () => {
  const [alert, setAlert] = useRecoilState(alertState)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...alert, visible: false })
    }, 2000)

    return () => clearTimeout(timer)
  }, [alert, setAlert])

  const animationClass = alert.visible ? 'animate-fadeIn' : 'animate-fadeOut'

  return alert.visible ? (
    <AlertContainer type={alert.type} animationType={animationClass}>
      <AlertMessage {...alert}></AlertMessage>
    </AlertContainer>
  ) : (
    <></>
  )
}

const AlertContainer = (props: AlertContainerProps) => {
  const _className = `top-20 absolute  left-1/2 p-4 mb-4 text-sm  rounded-lg dark:bg-gray-700 ${
    alertColor[props.type]
  } ${props.animationType}`
  return (
    <div className={_className} role="alert">
      {props.children}
    </div>
  )
}

const AlertMessage = (props: AlertMessageProps) => {
  return (
    <>
      <span className="font-medium">{props.message}</span>
    </>
  )
}
