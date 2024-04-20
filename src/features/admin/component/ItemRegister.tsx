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
  const { dtItemList, setDtItemList, onNext } = teamRegisterProps
  const [isActive, setIsActive] = useState(false)
  const [editData, setEditData] = useState<{
    dtItem: DtRegisterItem | null
    index: number
  }>({
    dtItem: null,
    index: 0,
  })
  const [isEdit, setIsEdit] = useState(false)
  const checkValid = (item: DtRegisterItem[]) => {
    if (item.length === 0) return false
    return true
  }
  const onNextButtonHandler = () => {
    if (checkValid(dtItemList)) onNext({ itemKey: 'fix it' })
  }
  const handleComplete = (isComplete: boolean) => {
    setIsEdit(isComplete)
    setIsActive(isComplete)
  }
  return (
    <>
      <TeamRegisterList
        dTItemList={dtItemList}
        setDtItemList={setDtItemList}
        onEdit={(item, idx) => {
          setEditData({ dtItem: item, index: idx })
          setIsEdit(true)
          setIsActive(true)
        }}
      />
      {isActive ? (
        <TeamRegisterModal
          isActive={isActive}
          setIsActive={handleComplete}
          setDtItemList={setDtItemList}
          option={
            isEdit
              ? {
                  dtItem: editData.dtItem,
                  index: editData.index,
                  isEdit: true,
                }
              : { isEdit: false }
          }
        />
      ) : null}
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
