import { BottomCTA, BottomCTATypeTwo } from 'components/basic/BottomCTA'
import { Dispatch, SetStateAction, useState } from 'react'
import TeamRegisterModal, { defaultDtRegisterItem } from './ItemRegisterModal'
import { DtRegisterItem, Vote } from 'pages/admin'
import TeamRegisterList from './ItemRegisterList'
import { useAdminItemPostDBMutation } from '../queries/useAdminItemMutation'

interface TeamRegisterProps {
  dtItemList: DtRegisterItem[]
  setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  onNext: (reqData: Pick<Vote, 'itemKey'>) => void
}

export function ItemRegister(teamRegisterProps: TeamRegisterProps) {
  const { dtItemList, setDtItemList } = teamRegisterProps
  const [isActive, setIsActive] = useState(false)
  const { onNext } = teamRegisterProps
  // const { mutate, status, data } = useAdminItemPostDBMutation()

  // if (status === 'success') {
  //   const { id } = data.data
  // }
  const onNextButtonHandler = () => {
    // const data = Object.entries(defaultDtRegisterItem).map(([key, value]) => ({
    //   type: value.type,
    //   label: value.label,
    // }))
    // mutate({ data })
    onNext({ itemKey: 'test' })
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
        }}
      ></BottomCTATypeTwo>
    </>
  )
}
