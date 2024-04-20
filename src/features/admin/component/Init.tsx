import { BottomCTATypeTwo } from 'components/basic/BottomCTA'
import Image from 'next/image'
import { DtRegisterItem, DtRegisterUser, Vote } from 'pages/admin'
import { Dispatch, SetStateAction, useState } from 'react'
import tw from 'twin.macro'
import InitModal from './InitModal'

interface InitProps {
  onNext: (type: 'create' | 'update') => void
  setVote: Dispatch<SetStateAction<Vote>>
  itemList: {
    dtItemList: DtRegisterItem[]
    setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  }
  userList: {
    dtUserList: DtRegisterUser[]
    setDtUserList: Dispatch<SetStateAction<DtRegisterUser[]>>
  }
}

type OnSuccessItemList = {
  type: 'item'
  data: DtRegisterItem[]
}
type OnSuccessUserist = {
  type: 'user'
  data: DtRegisterUser[]
}
export type OnSuccessProps = OnSuccessItemList | OnSuccessUserist

export default function Init(props: InitProps) {
  const { onNext, itemList, userList } = props

  const [active, setActive] = useState(false)

  const onSuccessSetDt = (props: OnSuccessProps) => {
    if (props.type === 'item') {
      itemList.setDtItemList(props.data)
    } else {
      userList.setDtUserList(props.data)
    }
  }

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
      <InitModal
        isActive={active}
        setIsActive={setActive}
        onSuccessSetDt={onSuccessSetDt}
        onNext={onNext}
      />
      <BottomCTATypeTwo
        propsA={{ onClick: () => onNext('create'), children: '새로 등록하기' }}
        propsB={{
          onClick: () => setActive(true),
          children: ' 회식 수정하기',
          buttonStyle: 'weak',
        }}
      ></BottomCTATypeTwo>
    </div>
  )
}
