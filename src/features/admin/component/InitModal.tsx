import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react'
import tw from 'twin.macro'
import { OnSuccessProps } from './Init'
import { useSetRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import { useAdminUserPostDBMutation } from '../queries/useAdminUserMutation'
import { useAdminItemPostDBMutation } from '../queries/useAdminItemMutation'
import { DtRegisterItem } from 'pages/admin'
import { Entries } from 'types/util'
import { cloneDeep } from 'lodash'
import { AxiosResponse } from 'axios'
import { useAdminInfoDBPostMutation } from '../queries/useAdminInfoMutation'
import { defaultDtRegisterItem } from '../hooks/useCreateVote'

interface InitModalProps {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  onSuccess: (props: OnSuccessProps) => void
  onNext: (type: 'create' | 'update') => void
}

export default function InitModal(props: InitModalProps) {
  const {
    code,
    setCode,
    enterCode,
    onCancelEventHandler,
    onSuccessEventHandler,
  } = useInitModal(props)

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
          onKeyUp={(e) => {
            e.preventDefault()
            enterCode(e, code)
          }}
        />
      </div>
    </Modal>
  )
}

function useInitModal(props: InitModalProps) {
  const setAlert = useSetRecoilState(alertState)
  const { isActive, setIsActive } = props
  const [code, setCode] = useState('')

  interface Item {
    hasOwnProperty: (arg0: string) => boolean
    rich_text: { text: { content: string } }[]
    multi_select: { name: string }[]
    title: { text: { content: string } }[]
  }

  const contentExtractor = {
    rich_text: (item: Item) => item.rich_text[0]?.text.content,
    multi_select: (item: Item) => new Set(item.multi_select.map((i) => i.name)),
    title: (item: Item) => item.title[0]?.text.content,
  }

  function getContentFromItem(curItem: Item) {
    const dataType = Object.keys(curItem).find((key) =>
      contentExtractor.hasOwnProperty(key),
    ) as keyof typeof contentExtractor

    if (!dataType) {
      throw new Error('exist strange dataType')
    }
    return contentExtractor[dataType](curItem)
  }

  const { mutate: postItemData } = useAdminItemPostDBMutation({
    onSuccess: (data: AxiosResponse) => {
      if (data.data.length === 0) {
        setAlert({
          type: 'danger',
          visible: true,
          message: '해당 아이템은 존재하지 않습니다.',
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
            _defaultDtRegisterItem[key].value = getContentFromItem(curItem)
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
            value: item['이름'].rich_text[0].text.content,
          }),
        )
        props.onSuccess({
          type: 'user',
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
        Promise.all([
          postItemData({
            params: { type: 'QUERY', database_id: data.data.itemKey },
          }),
          postUserData({
            params: { type: 'QUERY', database_id: data.data.userKey },
          }),
        ]).then(() => {
          props.onNext('update')
        })
      }
    },
  })

  const handleCode = (code: string) => {
    mutate({ data: { code }, params: { type: 'QUERY' } })
  }
  const onSuccessEventHandler = (code: string) => {
    handleCode(code)
    setIsActive(false)
    setCode('')
  }
  const enterCode = (
    event: KeyboardEvent<HTMLInputElement>,
    inputVal: string,
  ) => {
    if (event.key === 'Enter' && inputVal !== '') {
      onSuccessEventHandler(inputVal)
    }
  }

  const onCancelEventHandler = () => {
    setIsActive(false)
    setCode('')
  }
  return {
    onSuccessEventHandler,
    onCancelEventHandler,
    handleCode,
    code,
    setCode,
    enterCode,
  }
}
