import { BottomCTA } from 'components/basic/BottomCTA'
import { Button } from 'components/basic/Button'
import Input from 'components/basic/Input'
import { Vote } from 'pages/admin'
import { Dispatch, SetStateAction, useState } from 'react'
import tw from 'twin.macro'

interface UserRegisterProps {
  dtUserList: string[]
  setDtUserList: Dispatch<SetStateAction<string[]>>
  onNext: (reqData: Pick<Vote, 'userKey'>) => void
}

export default function UserRegister(props: UserRegisterProps) {
  const { dtUserList, setDtUserList } = props
  const [user, setUser] = useState<string>('')
  const onAddClickHandler = () => {
    setDtUserList([...dtUserList, user])
  }
  const onNextHandler = () => {
    props.onNext({ userKey: '' })
  }

  return (
    <>
      <div css={tw`flex justify-center m-5`}>
        <Input
          label={'유저'}
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
        gap-4`
      }
      >
        {dtUserList &&
          dtUserList.map((user, idx) =>
            DtUserListItem(user, idx, setDtUserList),
          )}
      </div>
      <BottomCTA
      onClick={onNextHandler}>제출</BottomCTA>
    </>
  )
}

function DtUserListItem(
  name: string,
  idx: number,
  setDtUserList: Dispatch<SetStateAction<string[]>>,
) {
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
      <div css={tw`flex justify-between px-4 pt-4`}>
        <span>{onEdit ? '🛠️' : ''}</span>
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          css={tw`inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5`}
          type="button"
          onClick={()=>setShow(true)}
        >
          <span css={tw`sr-only`}>open dropdown</span>
          <svg
            css={tw`w-5 h-5`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <div
          id="dropdown"
          css={[
            tw`z-10 mt-10 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700`,
            !show && tw`hidden`,
          ]}
        >
          <ul css={tw`py-2`} aria-labelledby="dropdownButton">
            <li>
              <button
                onClick={() => onEditHandler(true)}
                css={tw`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={onDeleteHandler}
                css={tw` block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
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
