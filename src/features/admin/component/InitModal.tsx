import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import tw from 'twin.macro'
import { OnSuccessProps } from './Init'
import { useSetRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import { useAdminUserPostDBMutation } from '../queries/useAdminUserMutation'
import { useAdminItemPostDBMutation } from '../queries/useAdminItemMutation'
import { DtRegisterItem } from 'pages/admin'
import { Entries } from 'types/util'
import { defaultDtRegisterItem } from '../hooks/useCreateVote'

interface InitModalProps {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  onSuccess: (props: OnSuccessProps) => void
}

export default function InitModal(props: InitModalProps) {
  const { isActive, setIsActive } = props
  const setAlert = useSetRecoilState(alertState)
  const { mutate: postUserData } = useAdminUserPostDBMutation({
    onSuccess: (data: any) => {
      if (data.data.length === 0) {
        setAlert({
          type: 'danger',
          visible: true,
          message: '해당 이름은 존재하지 않습니다.',
        })
      } else {
        const proccessedData = (data.data as Array<Record<string, any>>).map(
          (item) => ({
            label: '이름',
            value: item['label'].rich_text[0].text.content,
          }),
        )
        props.onSuccess({
          type: 'user',
          data: proccessedData,
        })
      }
    },
  })

  const { mutate: itemDbMutate, data: itemData } = useAdminItemPostDBMutation({
    onSuccess: (data: any) => {
      if(data.data.length ===0) {
        setAlert({
          type: 'danger',
          visible: true,
          message: '해당 이름은 존재하지 않습니다.',
        })
      } else {
        const proccessedData = (data.data as Array<Record<keyof DtRegisterItem, any>>).map(
          (item) => ({
            label: defaultDtRegisterItem[],
            value: item[].rich_text[0].text.content,
          }),
        )
        props.onSuccess({
          type: 'item',
          data: ,
        })
      }
    },
  })

  const onSuccessEventHandler = () => {
    setIsActive(false)
  }
  const onCancelEventHandler = () => {
    setIsActive(false)
  }
  const [code, setCode] = useState('')
  return (
    <Modal
      title={'등록하기'}
      isActive={props.isActive}
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
