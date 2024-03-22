import { BottomCTATypeTwo } from 'components/basic/BottomCTA'
import { Dispatch, SetStateAction, useState } from 'react'
import TeamRegisterModal from './ItemRegisterModal'
import { DtRegisterItem, Vote } from 'pages/admin'
import TeamRegisterList from './ItemRegisterList'

interface TeamRegisterProps {
  dtItemList: DtRegisterItem[]
  setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  onNext: (reqData: Pick<Vote, 'itemKey'>) => void
}

export function ItemRegister(teamRegisterProps: TeamRegisterProps) {
  const { dtItemList, setDtItemList } = teamRegisterProps
  const [isActive, setIsActive] = useState(false)
  const { onNext } = teamRegisterProps
  const checkValid = (item: DtRegisterItem[]) => {
    if (item.length === 0) return false
    return true
  }
  const onNextButtonHandler = () => {
    if (checkValid(dtItemList)) onNext({ itemKey: 'fix it' })
  }
  return (
    <>
      <TeamRegisterList dTItemList={dtItemList} />
      <TeamRegisterModal
        isActive={isActive}
        setIsActive={setIsActive}
        setDtItemList={setDtItemList}
      />
      <BottomCTATypeTwo
        propsA={{ onClick: () => setIsActive(true), children: '등록하기' }}
        propsB={{
          onClick: () => onNextButtonHandler(),
          children: '다음',
          buttonStyle: 'weak',
          disabled: !checkValid(dtItemList),
        }}
      ></BottomCTATypeTwo>
    </>
  )
}
