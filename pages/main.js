import Layout from 'components/layout'
import { Client } from '@notionhq/client'
import { TOKEN, DATABASE_ID, DATABASE_ID_MENU } from '../config/index'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Main({ results }) {
  useEffect(() => {
    console.log(results)
  })
  const getDatabaseDisplay = () => {
    let jsx = []
    results.forEach((menu) => {
      jsx.push(
        <div key={menu.id} className="p-4 md:w-1/3">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <a
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
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={menu.cover ? menu.cover.file.url : ''}
                alt="blog"
              />
            </a>
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                {menu.properties.category.rich_text[0]
                  ? menu.properties.category.rich_text[0].text.content
                  : ''}
              </h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                {menu.properties.name.title[0]
                  ? menu.properties.name.title[0].text.content
                  : ''}
              </h1>
              <span> 대표메뉴 </span>
              <div className="leading-relaxed mb-3">
                {menu.properties.mainmenu.multi_select.length > 0
                  ? menu.properties.mainmenu.multi_select.map((element) => (
                      <div
                        key={element.id}
                        className="ml-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border-2"
                      >
                        {element.name}
                      </div>
                    ))
                  : ''}
              </div>
              <span> 대표후기 </span>
              <div className="leading-relaxed mb-3">
                {menu.properties.detail.multi_select.length > 0
                  ? menu.properties.detail.multi_select.map(
                      (element, index) => (
                        <a
                          key={element.id}
                          className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full"
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
                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  1.2K
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  6
                </span>
              </div>
            </div>
          </div>
        </div>,
      )
    })
    jsx.push()
    return jsx
  }
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">{getDatabaseDisplay()}</div>
        </div>
      </section>
    </Layout>
  )
}
// 빌드 타임에 호출
export async function getServerSideProps() {
  const notion = new Client({ auth: TOKEN })
  const resultUpdate = await notion.pages.update({
    page_id: 'fe82004e-dbba-4bd3-a0d5-0af18f924497',
    properties: {
      설명: {
        rich_text: [
          {
            text: {
              content: '업데이트중입니다 ',
              link: null,
            },
          },
        ],
      },
    },
  })
  const result = await notion.databases.query({
    database_id: DATABASE_ID_MENU,
  })
  return {
    props: {
      results: result.results,
    },
  }
}
