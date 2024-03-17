import Link from 'next/link'
import tw from 'twin.macro'

export default function Footer() {
  return (
    <footer
      css={tw`[max-width: 1280px] mx-auto`}
      className=" translate-y-full b-0  bg-white rounded-lg shadow m-4 dark:bg-gray-800"
    >
      <div className="w-full  mx-auto max-w-screen-xl p-4 ">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©2024 OHK 투표사이트
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <span className="hover:underline me-4 md:me-6">
              ©투표 아이콘 제작자: Freepik - Flaticon
            </span>
          </li>
        </ul>
      </div>
    </footer>
  )
}
