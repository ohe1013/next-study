import Layout from 'components/layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import Link from 'next/dist/client/link'
import { headers } from 'next/headers'
export default function Main({ currentUser }) {
  const router = useRouter()
  const { data, isLoading } = useQuery(['menus'], queryFN, {
    staleTime: 5 * 1000,
  })

  const [selected1st, setSelected1st] = useState('')
  const [selected2nd, setSelected2nd] = useState('')
  const handleSelect1st = (e) => {
    setSelected1st(e.target.value)
  }
  const handleSelect2nd = (e) => {
    setSelected2nd(e.target.value)
  }
  const getDatabaseDisplay = () => {
    let jsx = []
    data.results.forEach((menu) => {
      jsx.push(
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
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={menu.cover ? menu.cover.file.url : ''}
                alt="blog"
              />
            </Link>
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
    votes.push(<option key={1}>-선택-</option>)
    data.results.forEach((menu) => {
      votes.push(
        <option
          key={menu.id}
          value={JSON.stringify({
            menuId: menu.id,
            up: menu.properties.up.number,
          })}
        >
          {menu.properties.name.title[0].plain_text}
        </option>,
      )
    })
    return votes
  }
  const getDownDataVote = () => {
    let votes = []
    votes.push(<option value={null}>없음</option>)

    data.results.forEach((menu) => {
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
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <section className="text-gray-600 pt-10 body-font">
          <div className="container px-5  mx-auto">
            <div className="flex flex-wrap -m-4">{getDatabaseDisplay()}</div>
          </div>
          <div className="container w-9/12 px-5 mx-auto ">
            <div className="flex py-12 -m-4 gap-2">
              <label
                htmlFor="getUpData1st"
                className="content-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 break-keep"
              >
                추천 1순위
              </label>
              <select
                id="getUpData1st"
                name="getUpData1st"
                onChange={handleSelect1st}
                value={selected1st}
                className="ml-5 h-12 w-9/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <GetUpDataVote></GetUpDataVote>
              </select>
              <label
                htmlFor="getUpData2nd"
                className="content-center block mb-2 text-sm font-medium text-gray-900 break-keep dark:text-gray-400"
              >
                추천 2순위
              </label>
              <select
                id="getUpData2nd"
                name="getUpData2nd"
                onChange={handleSelect2nd}
                value={selected2nd}
                className="ml-5 h-12 w-9/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <GetUpDataVote></GetUpDataVote>
              </select>
              {currentUser.up > 0 ? (
                <button
                  onClick={async () => {
                    if (!confirm('정말 선택하시겠습니까?')) {
                      return
                    }
                    await recommend(selected1st, selected2nd)
                    await reduceUp(currentUser.id)

                    router.push('/')
                  }}
                  className="inline-flex h-12 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg break-keep"
                >
                  추천
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
// 빌드 타임에 호출

const queryFN = async () => {
  return (await fetch('/api/menu/')).json()
}
const fetchUser = async (id) => {
  // const res = await import(`./api/person/${id}`)
  // console.log(res)
  // return await (await res.GET()).json()
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL + '/' ||
    'https://next-study-ochre.vercel.app/'
  return await fetch(`${baseUrl}api/person/${id}`)
}
export async function getServerSideProps(context) {
  // const host = headers().get('host');
  const queryClient = new QueryClient(['menus'], (host) => queryFN)
  await queryClient.prefetchQuery(['menu', queryFN])
  const fetchedUser = await fetchUser(context.query.id)

  const user = await fetchedUser.json()
  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
      currentUser: {
        name: context.query.name,
        up: user.properties.up.number,
        id: context.query.id,
      },
    },
  }
}

const recommend = async function (item) {
  const { menuId, up } = JSON.parse(item)
  try {
    const res = await fetch('/api/menu/' + menuId + `?up=${up}`)
    if (res.status != 200) throw Error('it has error')
  } catch (error) {
    console.log(error)
  }
}

const reduceUp = async function (id) {
  await fetch('/api/user/' + id)
}
