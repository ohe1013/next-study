import { useState } from 'react'
import tw from 'twin.macro'

interface CardHeaderProps {
  deleteCb: (...args: any) => void
  editCb: (...args: any) => void
}

export default function CardHeader(props: CardHeaderProps) {
  const [show, setShow] = useState(false)
  const [onEdit, setOnEdit] = useState(false)

  const { deleteCb, editCb } = props
  const onDeleteHandler = () => {
    deleteCb()
    setShow(false)
  }
  const onEditHandler = (type: boolean) => {
    editCb()
    setOnEdit(type)
    setShow(false)
  }
  return (
    <div css={tw`flex justify-between px-4 pt-4 relative`}>
      <span>{onEdit ? '🛠️' : ''}</span>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        css={tw`inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5`}
        type="button"
        onClick={() => setShow(true)}
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
          tw`right-0 z-10 mt-10 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700`,
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
  )
}
