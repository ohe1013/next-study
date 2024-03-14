import { Button } from 'components/basic/Button'
import Image from 'next/image'
import { DtRegisterItem, DtRegisterUser } from 'pages/admin'
import { Dispatch, SetStateAction } from 'react'
import tw from 'twin.macro'

interface InitProps {
  onNext: (type: 'create' | 'update') => void
  itemList: {
    dtItemList: DtRegisterItem[]
    setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  }
  userList: {
    dtUserList: DtRegisterUser[]
    setDtUserList: Dispatch<SetStateAction<DtRegisterUser[]>>
  }
}

export default function Init(props: InitProps) {
  const { onNext, itemList, userList } = props

  const onUpdateClickHandler = () => {}

  return (
    <div css={tw`flex-1 `}>
      <div css={tw`m-auto mt-20`}>
        <Image
          unoptimized
          height={200}
          width={300}
          alt="vote"
          src="../../../assets/vote.png"
          priority={false}
          css={tw`mx-auto`}
        ></Image>
      </div>
      <Button className={tw`mt-10 mb-5`} onClick={() => onNext('create')}>
        새로 등록하기
      </Button>
      <Button buttonStyle="weak" onClick={() => onNext('update')}>
        회식 수정하기
      </Button>
    </div>
  )
}
