import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import { useState } from 'react'
import tw from 'twin.macro'

export default function InitModal() {
  const onSuccessEventHandler = () => {}
  const onCancelEventHandler = () => {}
  const [code, setCode] = useState('')
  return (
    <Modal
      title={'등록하기'}
      isActive={true}
      onSuccess={onSuccessEventHandler}
      onCancel={onCancelEventHandler}
    >
      <div css={tw`max-w-md mx-auto [min-width: 20rem] xsm:w-60 sm:w-96 `}>
        <Input
          label={'코드'}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
    </Modal>
  )
}
