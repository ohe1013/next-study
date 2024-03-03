import Link from 'next/link'
import { DtRegisterItem } from 'pages/admin'
import { useState } from 'react'
import tw from 'twin.macro'

export default function TeamRegisterList({
  dTItemList,
}: {
  dTItemList: DtRegisterItem[]
}) {
  return (
    <div className="flex">
      {dTItemList.map((item, idx) => (
        <DtRegisterItemComponent
          key={item.storeName.value + idx}
          item={item}
        ></DtRegisterItemComponent>
      ))}
    </div>
  )
}

function DtRegisterItemComponent({ item }: { item: DtRegisterItem }) {
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
    <div className="p-4 md:w-1/3 relative">
      <div css={tw`flex justify-between px-4 pt-4`}>
        <span>{onEdit ? '🛠️' : ''}</span>
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          css={tw`inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5`}
          type="button"
          onClick={() => setShow(!show)}
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
            tw`z-10 mt-10 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700 right-0`,
            !show && tw`hidden`,
          ]}
        >
          <ul css={tw`py-2`} aria-labelledby="dropdownButton">
            <li>
              <button
                onClick={() => onEditHandler(true)}
                css={tw`w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={onDeleteHandler}
                css={tw`w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {item.storeName.value}
          </h1>
          <span className="dark:text-white">
            {' '}
            {item.representNameList.label}{' '}
          </span>
          <h2 className="ml-2 tracking-widest title-font font-medium mb-1">
            {item.representNameList
              ? Array.from(item.representNameList.value).map((item) => (
                  <span key={item}>{item}</span>
                ))
              : ''}
          </h2>
          <span className="text-green-600"> {item.advantageList.label} </span>
          <div className="ml-2 leading-relaxed mb-3">
            {item.advantageList
              ? Array.from(item.advantageList.value).map((item) => (
                  <span key={item}>{item}</span>
                ))
              : ''}
          </div>
          <span className="text-red-600"> {item.disAdvantageList.label} </span>
          <div className="ml-2 leading-relaxed mb-3">
            {item.disAdvantageList
              ? Array.from(item.disAdvantageList.value).map((item) => (
                  <span key={item}>{item}</span>
                ))
              : ''}
          </div>
          <span className="dark:text-white">{item.reviewLinkList.label} </span>
          <div className="leading-relaxed mb-3">
            {item.reviewLinkList.value.size > 0
              ? Array.from(item.reviewLinkList.value).map((item, index) => (
                  <a
                    key={item}
                    className="ml-2 text-xs inline-flex items-center  leading-sm uppercase px-3 py-1 bg-indigo-600 text-white rounded-md"
                    href={item}
                    target="_blank"
                    rel="noreferrer"
                  >
                    후기{index + 1}
                  </a>
                ))
              : ''}
          </div>
          <div className="flex items-center flex-wrap ">
            <Link
              href={item.storeLink.value}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              {item.storeLink.label}
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
