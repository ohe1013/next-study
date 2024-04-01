import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import TagList from 'components/basic/TagList'
import { Entries } from 'types/util'
import { DtRegisterItem } from 'pages/admin'
import tw from 'twin.macro'
import { Dispatch, SetStateAction, useState } from 'react'
import { cloneDeep } from 'lodash'
import { useSetRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import { defaultDtRegisterItem } from '../hooks/useCreateVote'

export default function TeamRegisterModal({
  setDtItemList,
  isActive,
  setIsActive,
}: {
  setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}) {
  const _defaultDtRegisterItem = cloneDeep(defaultDtRegisterItem)
  const [dtItem, setDtItem] = useState<DtRegisterItem>(_defaultDtRegisterItem)
  const setAlert = useSetRecoilState(alertState)
  const clearDtItem = () => {
    setDtItem(cloneDeep(_defaultDtRegisterItem))
  }
  const isValid = (item: DtRegisterItem) => {
    const entries = Object.entries(item) as Entries<DtRegisterItem>
    for (const [, value] of entries) {
      if (value.value instanceof Set) {
        if (value.value.size === 0) return false
      } else {
        if (value.value === '') return false
      }
    }
    return true
  }
  const onSuccessEventHandler = () => {
    if (!isValid(dtItem)) {
      setAlert({
        type: 'danger',
        message: '입력란을 모두 채워주세요.',
        visible: true,
      })
      return
    }
    setDtItemList((preList) => {
      return [...preList, dtItem]
    })
    clearDtItem()
    setIsActive(false)
  }
  const onCancelEventHandler = () => {
    clearDtItem()
    setIsActive(false)
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
      <div css={tw`max-w-md mx-auto [min-width: 20rem] xsm:w-60 sm:w-96 `}>
        <form onSubmit={(e) => e.preventDefault()}>
          {(Object.entries(dtItem) as Entries<DtRegisterItem>).map(
            ([key, value]) => {
              switch (value.type) {
                case 'input':
                case 'input/link': {
                  return (
                    <div key={key} className="relative z-0 w-full mb-5 group">
                      <Input
                        label={
                          value.type === 'input/link'
                            ? value.label + '(http 포함)'
                            : value.label
                        }
                        value={value.value}
                        onChange={(e) => handleOnChange(key, e.target.value)}
                      />
                    </div>
                  )
                }
                case 'tag':
                case 'tag/link': {
                  return (
                    <div key={key} className="relative z-0 w-full mb-5 group">
                      <TagList
                        tagList={value.value}
                        setTagList={(newValue) => handleOnChange(key, newValue)}
                        title={
                          value.type === 'tag/link'
                            ? value.label + '(http 포함)'
                            : value.label
                        }
                        buttonLabel={value.buttonLabel}
                        type={value.type === 'tag/link' ? 'link' : 'string'}
                      ></TagList>
                    </div>
                  )
                }
              }
            },
          )}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group"></div>
            <div className="relative z-0 w-full mb-5 group"></div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

// interface FileInputProps {
//   _key: 'representImg'
//   value: DtRegisterItem['representImg']['value']
//   onChange: <T extends keyof DtRegisterItem>(
//     key: T,
//     newValue: DtRegisterItem[T]['value'],
//   ) => void
// }
// const FIleInput = (props: FileInputProps) => {
//   const { _key: key, value, onChange } = props
//   const [, setAlert] = useRecoilState(alertState)
//   const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return
//     if (e.target.files[0].size > 1_024_000) {
//       setAlert({
//         type: 'warn',
//         visible: true,
//         message: '파일의 사이즈를 1mb이하로 부탁드립니다.',
//       })
//       return
//     }
//     const imgFile = e.target.files[0]
//     URL.revokeObjectURL(value)
//     const blobUrl = URL.createObjectURL(imgFile)
//     onChange(key, blobUrl)
//   }
//   return (
//     <div key={props._key} className="relative z-0 w-full mb-5 group">
//       <input accept="image/*" type="file" onChange={fileChangeHandler} />
//       {value && (
//         <Image loading="lazy" src={value} width={200} height={200} alt={''} />
//       )}
//     </div>
//   )
// }
