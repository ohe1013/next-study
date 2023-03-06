import Layout from 'components/layout'
import { Client } from '@notionhq/client'
import { useRouter } from 'next/router'
import {
  TOKEN,
  DATABASE_ID,
  DATABASE_ID_MENU,
  DATABASE_ID_USER,
} from '../config/index'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

export default function Main({ results, currentUser }) {

  const router = useRouter()


  const [Selected, setSelected] = useState('')
  const handleSelect = (e) => {
    setSelected(e.target.value)
  }
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
              </div>
            </div>
          </div>
        </div>,
      )
    })

    return jsx
  }
  const GetUpDataVote = () => {
    let votes = []
    results.forEach((menu) => {
      votes.push(
          <option key={menu.id} value={menu.id}>
            {menu.properties.name.title[0].plain_text}
          </option>
        ,
      )
    })
    return votes
  }
  const getDownDataVote = () => {
    let votes = []
    votes.push(<option value={null}>없음</option>)
    results.forEach((menu) => {
      votes.push(
        <>
          <option key={menu.id} value={menu.id}>
            {menu.properties.name.title[0].plain_text}
          </option>
        </>,
      )
    })
    return votes
  }
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">{getDatabaseDisplay()}</div>
        </div>
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            <label
              htmlFor="getUpData"
              className="content-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              추천
            </label>
            <select
              id="getUpData"
              name="getUpData"
              onChange={handleSelect}
              value={Selected}
              className="ml-5 w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <GetUpDataVote></GetUpDataVote>
            </select>
            {currentUser.up >0 ? (
              <button
                onClick={()=> {s4(DATABASE_ID_MENU)}}
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                추천
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
// 빌드 타임에 호출
export async function getServerSideProps(context) {
  
  const notion = new Client({ auth: TOKEN })
  const result = await notion.databases.query({
    database_id: DATABASE_ID_MENU,
  })
  return {
    props: {
      results: result.results,
      currentUser: {name : context.query.name,up : context.query.up}
    },
  }
}

const s4 = async function () {
  console.log(DATABASE_ID_MENU)
  console.log(await fetch('api/menu'))
  fetch('/api/menu')  
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });
}
