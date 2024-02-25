import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import TagList from 'components/basic/TagList'
import { Entries } from 'types/util'
import { DtRegisterItem } from 'pages/admin'
import tw from 'twin.macro'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import Image from 'next/image'

export const defaultDtRegisterItem: DtRegisterItem = {
  representImg: { label: '이미지', type: 'img', value: null },
  storeName: { value: '', type: 'input', label: '매장명' },
  storeLink: { value: '', type: 'input', label: '매장링크' },
  representNameList: {
    value: new Set(),
    type: 'tag',
    label: '대표메뉴',
    buttonLabel: '추가',
  },
  advantageList: {
    value: new Set(),
    type: 'tag',
    label: '장점',
    buttonLabel: '추가',
  },
  disAdvantageList: {
    value: new Set(),
    type: 'tag',
    label: '단점',
    buttonLabel: '추가',
  },
  reviewLinkList: {
    value: new Set(),
    type: 'tag',
    label: '후기',
    buttonLabel: '추가',
  },
}

export default function TeamRegisterModal({
  setDtItemList,
  isActive,
  setIsActive,
}: {
  setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}) {
  const [dtItem, setDtItem] = useState<DtRegisterItem>(defaultDtRegisterItem)
  // const db = Object.entries(defaultDtRegisterItem).map(([key, value]) => ({
  //   type: value.type,
  //   label: value.label,
  // }))
  const onSuccessEventHandler = () => {
    setDtItemList((preList) => {
      return [...preList, dtItem]
    })
    setIsActive(false)
  }
  const onCancelEventHandler = () => {
    setIsActive(false)
    setDtItem(defaultDtRegisterItem)
  }
  const handleOnChange = <T extends keyof DtRegisterItem>(
    key: T,
    newValue: DtRegisterItem[T]['value'],
  ) => {
    setDtItem((state) => ({
      ...state,
      [key]: {
        ...state[key],
        value: newValue,
      },
    }))
  }
  return (
    <Modal
      title={'등록하기'}
      isActive={isActive}
      onSuccess={onSuccessEventHandler}
      onCancel={onCancelEventHandler}
    >
      <div css={tw`max-w-md mx-auto [min-width: 384px] w-96 `}>
        <form onSubmit={(e) => e.preventDefault()}>
          {(Object.entries(dtItem) as Entries<DtRegisterItem>).map(
            ([key, value]) => {
              switch (value.type) {
                case 'input': {
                  return (
                    <div key={key} className="relative z-0 w-full mb-5 group">
                      <Input
                        label={value.label}
                        value={value.value}
                        onChange={(e) => handleOnChange(key, e.target.value)}
                      />
                    </div>
                  )
                }
                case 'tag': {
                  return (
                    <div key={key} className="relative z-0 w-full mb-5 group">
                      <TagList
                        tagList={value.value}
                        setTagList={(newValue) => handleOnChange(key, newValue)}
                        title={value.label}
                        buttonLabel={value.buttonLabel}
                      ></TagList>
                    </div>
                  )
                }
                case 'img': {
                  return (
                    <FIleInput
                      key={key}
                      _key={key as 'representImg'}
                      value={value.value}
                      onChange={handleOnChange}
                    />
                  )
                }
              }
            },
          )}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group"></div>
            <div className="relative z-0 w-full mb-5 group"></div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

interface FileInputProps {
  _key: 'representImg'
  value: DtRegisterItem['representImg']['value']
  onChange: <T extends keyof DtRegisterItem>(
    key: T,
    newValue: DtRegisterItem[T]['value'],
  ) => void
}
const FIleInput = (props: FileInputProps) => {
  const { _key: key, value, onChange } = props
  const [, setAlert] = useRecoilState(alertState)
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    if (e.target.files[0].size > 1_024_000) {
      setAlert({
        type: 'warn',
        visible: true,
        message: '파일의 사이즈를 1mb이하로 부탁드립니다.',
      })
      return
    }
    const imgFile = e.target.files[0]
    URL.revokeObjectURL(value)
    const blobUrl = URL.createObjectURL(imgFile)
    onChange(key, blobUrl)
  }
  return (
    <div key={props._key} className="relative z-0 w-full mb-5 group">
      <input accept="image/*" type="file" onChange={fileChangeHandler} />
      {value && (
        <Image loading="lazy" src={value} width={200} height={200} alt={''} />
      )}
    </div>
  )
}
