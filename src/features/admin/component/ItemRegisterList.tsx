import CardHeader from 'components/CardHeader'
import Link from 'next/link'
import { DtRegisterItem } from 'pages/admin'
import { Dispatch, SetStateAction, useState } from 'react'

type DeleteFn = (idx: number) => void

type EditFn = (item: DtRegisterItem, idx: number) => void

export default function TeamRegisterList({
  dTItemList,
  setDtItemList,
  onEdit,
}: {
  dTItemList: DtRegisterItem[]
  setDtItemList: Dispatch<SetStateAction<DtRegisterItem[]>>
  onEdit: EditFn
}) {
  const deleteFn: DeleteFn = (idx: number) => {
    const newDtItemList = [...dTItemList]
    newDtItemList.splice(idx, 1)
    setDtItemList(newDtItemList)
  }

  return (
    <div>
      {dTItemList.map((item, idx) => (
        <DtRegisterItemComponent
          key={item.storeName.value + idx}
          item={item}
          onEditFn={() => onEdit(item, idx)}
          deleteFn={() => deleteFn(idx)}
        ></DtRegisterItemComponent>
      ))}
    </div>
  )
}

function DtRegisterItemComponent({
  item,
  onEditFn,
  deleteFn,
}: {
  item: DtRegisterItem
  onEditFn: any
  deleteFn: DeleteFn
}) {
  const onDeleteHandler = () => {}
  const onEditHandler = (isEdit: boolean) => {
    onEditFn()
  }

  return (
    <div className="w-full border-2 border-gray-200 border-opacity-60">
      <CardHeader
        title={item.storeName.value}
        deleteCb={deleteFn}
        editCb={onEditHandler}
      />
      <div className="h-full  rounded-lg overflow-hidden">
        <div className="p-6">
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
              href={item.storeLink.value ?? ''}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center mb-2 lg:mb-0"
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
