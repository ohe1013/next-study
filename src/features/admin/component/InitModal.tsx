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
import { cloneDeep } from 'lodash'
import { AxiosResponse } from 'axios'
import { useAdminInfoDBPostMutation } from '../queries/useAdminInfoMutation'

interface InitModalProps {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  onSuccess: (props: OnSuccessProps) => void
}

export default function InitModal(props: InitModalProps) {
  const { code, setCode, onCancelEventHandler, onSuccessEventHandler } =
    useInitModal(props)

  return (
    <Modal
      title={'등록하기'}
      isActive={props.isActive}
      onSuccess={() => onSuccessEventHandler(code)}
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

function useInitModal(props: InitModalProps) {
  const setAlert = useSetRecoilState(alertState)
  const { isActive, setIsActive } = props
  const [code, setCode] = useState('')

  const { mutate: postUserData } = useAdminUserPostDBMutation({
    onSuccess: (data: AxiosResponse) => {
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

  const { mutate: postItemData, data: itemData } = useAdminItemPostDBMutation({
    onSuccess: (data: AxiosResponse) => {
      if (data.data.length === 0) {
        setAlert({
          type: 'danger',
          visible: true,
          message: '해당 이름은 존재하지 않습니다.',
        })
      } else {
        const proccessedData = (
          data.data as Array<Record<keyof DtRegisterItem, any>>
        ).map((item) => {
          const _defaultDtRegisterItem = cloneDeep(defaultDtRegisterItem)
          ;(
            Object.entries(_defaultDtRegisterItem) as Entries<DtRegisterItem>
          ).forEach(([key, value]) => {
            const curItem = item[key]
            switch (true) {
              case curItem.hasOwnProperty('rich_text'): {
                _defaultDtRegisterItem[key].value =
                  curItem.rich_text[0].text.content
                break
              }
              case curItem.hasOwnProperty('multi_select'): {
                _defaultDtRegisterItem[key].value = new Set(
                  curItem.multi_select?.map((item: { name: any }) => item.name),
                )
                break
              }
              case curItem.hasOwnProperty('title'): {
                _defaultDtRegisterItem[key].value =
                  curItem.title[0].text.content
                break
              }
            }
          })
          return _defaultDtRegisterItem
        })
        props.onSuccess({
          type: 'item',
          data: proccessedData,
        })
      }
    },
  })

  const { mutate } = useAdminInfoDBPostMutation({
    onSuccess: (data: AxiosResponse) => {
      if (!data.data) {
        setAlert({
          message: '코드를 확인해주세요. ',
          type: 'warn',
          visible: true,
        })
      } else {
        postItemData({
          params: { type: 'QUERY', database_id: data.data.itemKey },
        })
        postUserData({
          params: { type: 'QUERY', database_id: data.data.userKey },
        })
      }
    },
  })

  const createVote = (code: string) => {
    mutate({ data: { code }, params: { type: 'QUERY' } })
  }
  const onSuccessEventHandler = (code: string) => {
    createVote(code)
    setIsActive(false)
    setCode('')
  }
  const onCancelEventHandler = () => {
    setIsActive(false)
    setCode('')
  }
  return {
    onSuccessEventHandler,
    onCancelEventHandler,
    createVote,
    code,
    setCode,
  }
}
