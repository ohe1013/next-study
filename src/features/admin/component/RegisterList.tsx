import Image from 'next/image'
import Link from 'next/dist/client/link'
import { Key } from 'react'
export default function Card({ menu }: { menu: any }) {
  let rooms: Array<{ name: string; count: number; src: string }> = []
  if (menu.properties.category.rich_text[0]) {
    const menuRooms = JSON.parse(
      menu.properties.category.rich_text[0].text.content.slice(
        1,
        menu.properties.category.rich_text[0].text.content.length - 1,
      ),
    )
    Object.keys(menuRooms).forEach((key) => {
      rooms.push(menuRooms[key])
    })
  }

  return (
    <div key={menu.id} className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <Link
          href={
            menu.properties.search.rich_text[0]
              ? menu.properties.search.rich_text[0].href
              : ''
          }
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width={200}
            height={200}
            unoptimized
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={menu.cover ? menu.cover.file.url : ''}
            alt="blog"
          />
        </Link>
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {menu.properties.name.title[0]
              ? menu.properties.name.title[0].text.content
              : ''}
          </h1>
          <span className="dark:text-white"> 예약 예정 숙소(링크) </span>
          <h2 className="ml-2 tracking-widest title-font font-medium mb-1">
            {rooms
              ? rooms.map((room) => (
                  <a
                    className="text-sm inline-flex items-center ml-2 uppercase px-3 py-1 bg-indigo-600 text-white rounded-md"
                    key={room.src}
                    href={'http://www.' + room.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {room.name} [{room.count}개]{' '}
                  </a>
                ))
              : ''}
          </h2>
          <span className="text-green-600"> 장점 </span>
          <div className="ml-2 leading-relaxed mb-3">
            <span className="dark:text-white">
              {menu.properties.good.rich_text[0]
                ? menu.properties.good.rich_text[0].text.content
                : ''}
            </span>
          </div>
          <span className="text-red-600"> 단점 </span>
          <div className="ml-2 leading-relaxed mb-3">
            <span className="dark:text-white">
              {menu.properties.bad.rich_text[0]
                ? menu.properties.bad.rich_text[0].text.content
                : ''}
            </span>
          </div>
          <span className="dark:text-white">블로그 및 후기 </span>
          <div className="leading-relaxed mb-3">
            {menu.properties.detail.multi_select.length > 0
              ? menu.properties.detail.multi_select.map(
                  (
                    element: {
                      id: Key | null | undefined
                      name: string | undefined
                    },
                    index: number,
                  ) => (
                    <a
                      key={element.id}
                      className="ml-2 text-xs inline-flex items-center  leading-sm uppercase px-3 py-1 bg-indigo-600 text-white rounded-md"
                      href={element.name}
                      target="_blank"
                      rel="noreferrer"
                    >
                      후기{index + 1}
                    </a>
                  ),
                )
              : ''}
          </div>
          <div className="flex items-center flex-wrap ">
            <a
              href={
                menu.properties.location.rich_text[0]
                  ? menu.properties.location.rich_text[0].href
                  : ''
              }
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              위치보기
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
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
