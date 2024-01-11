import { Button } from 'components/basic/Button'
import Modal from 'components/basic/Modal'
import { useState } from 'react'

export function TeamRegister() {
  const [isActive, setIsActive] = useState(false)
  return (
    <>
      <Modal
        title={'메뉴명'}
        isActive={isActive}
        setIsActive={setIsActive}
      ></Modal>
      <Button onClick={() => setIsActive(true)}>등록하기</Button>
    </>
  )
}
