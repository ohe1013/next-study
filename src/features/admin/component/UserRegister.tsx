import CardHeader from 'components/CardHeader'
import { BottomCTA } from 'components/basic/BottomCTA'
import { Button } from 'components/basic/Button'
import Input from 'components/basic/Input'
import { uniqueId } from 'lodash'
import { Vote } from 'pages/admin'
import { Dispatch, SetStateAction, useState } from 'react'
import tw from 'twin.macro'

interface DtUser {
  label: string
  value: string
}
interface UserRegisterProps {
  dtUserList: DtUser[]
  setDtUserList: Dispatch<SetStateAction<DtUser[]>>
  onNext: (reqData: Pick<Vote, 'userKey'>) => void
}

export default function UserRegister(props: UserRegisterProps) {
  const { dtUserList, setDtUserList, onNext } = props
  const [user, setUser] = useState<DtUser>({ label: '', value: '' })
  const onAddClickHandler = () => {
    setDtUserList([...dtUserList, user])
  }
  const checkValid = (userList: DtUser[]) => {
    if (userList.length === 0) return false
    return true
  }
  const onNextHandler = () => {
    if (checkValid(dtUserList)) onNext({ userKey: '' })
  }

  return (
    <>
      <div css={tw`flex justify-center m-5`}>
        <Input
          label={'유저'}
          type="text"
          value={user.value}
          onChange={(e) => setUser({ ...user, value: e.target.value })}
        />
        <Button className={tw`w-24`} onClick={onAddClickHandler}>
          추가
        </Button>
      </div>
      <div
        css={tw`m-5 grid 
        xsm:grid-cols-1
        sm:grid-cols-2
        m:grid-cols-3
        xl:grid-cols-4
        3xl:grid-cols-5
        gap-4`}
      >
        {dtUserList &&
          dtUserList.map((user, idx) => (
            <DtUserListItem
              name={user.value}
              idx={idx}
              key={uniqueId()}
              setDtUserList={setDtUserList}
            />
          ))}
      </div>
      <BottomCTA onClick={onNextHandler}>완료</BottomCTA>
    </>
  )
}

function DtUserListItem({
  name,
  idx,
  setDtUserList,
}: {
  name: string
  idx: number
  setDtUserList: Dispatch<SetStateAction<DtUser[]>>
}) {
  const [show, setShow] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [curName, setCurName] = useState(name)

  const onDeleteHandler = () => {
    setDtUserList((dtUserList) => {
      return dtUserList.filter((_, i) => i !== idx)
    })
    setShow(false)
  }
  const onEditHandler = (type: boolean) => {
    setOnEdit(type)
    setShow(false)
  }
  return (
    <div
      css={tw`w-full
      justify-self-center
      [max-width:320px]
      [min-width: 240px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
    >
      <CardHeader deleteCb={onDeleteHandler} editCb={onEditHandler} />
      <div css={tw`flex  items-center px-10 pb-10`}>
        <Input
          type="text"
          label={''}
          onChange={(e) => setCurName(e.target.value)}
          focused={true}
          value={curName}
          disabled={!onEdit}
        />
        {onEdit ? (
          <Button
            className={tw`md:[min-width: 80px] w-20`}
            onClick={() => onEditHandler(false)}
          >
            🛠️
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
