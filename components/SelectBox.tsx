import { ChangeEventHandler } from 'react'
import { SelectBoxItem } from 'types/selectBox'

export default function SelectBox({
  selectProps,
  onChange,
  selectValue,
  selectBoxItemList,
}: {
  selectProps: { id: string }
  onChange: ChangeEventHandler<HTMLSelectElement>
  selectValue: string
  selectBoxItemList: SelectBoxItem[]
}) {
  return (
    <>
      <label
        htmlFor={selectProps.id}
        className="content-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 break-keep"
      >
        추천 1순위
      </label>
      <select
        id={selectProps.id}
        name={selectProps.id}
        onChange={onChange}
        value={selectValue}
        className="ml-5 h-12 w-9/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {selectBoxItemList.map((selectBoxItem) => (
          <option
            key={selectBoxItem.id}
            value={JSON.stringify({
              menuId: selectBoxItem.id,
              up: selectBoxItem.up,
            })}
          >
            {selectBoxItem.plainText}
          </option>
        ))}
      </select>
    </>
  )
}
