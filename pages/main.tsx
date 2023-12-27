import Layout from 'components/layout'
import { useRouter } from 'next/router'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import LoadingModal from '../components/LoadingModal'
import SelectBox from 'components/SelectBox'
import { SelectBoxItem } from 'types/selectBox'
import Card from 'components/Card'

type SelectMenu = {
  id: string
  properties: {
    up: { number: number }
    name: { title: { plain_text: any }[] }
  }
}

export default function Main({
  currentUser,
}: {
  currentUser: { id: string; up: number }
}): JSX.Element {
  const router = useRouter()
  const { data, isLoading } = useQuery(['menus'], queryFN, {
    staleTime: 1000,
  })

  const [selected1st, setSelected1st] = useState('')
  const [selected2nd, setSelected2nd] = useState('')
  const [disable, setDisable] = useState(false)
  const handleSelect = (selectFn: Dispatch<SetStateAction<string>>) => {
    return (e: ChangeEvent<HTMLSelectElement>) => selectFn(e.target.value)
  }
  const handleSubmit = async () => {
    if (!confirm('정말 선택하시겠습니까?')) {
      return
    }
    if (!selected1st || !selected2nd) {
      alert('선택을 비울 수 없습니다.')
      return
    }
    if (selected1st.startsWith('-') || selected2nd.startsWith('-')) {
      alert('선택을 비울 수 없습니다.')
      return
    }
    setDisable(!disable)
    await recommend(selected1st, selected2nd)
    await reduceUp(currentUser.id)
    alert('추천이 완료되었습니다.')
    router.push('/')
  }
  const selectBoxItemList: SelectBoxItem[] = data?.results
    ? [
        { id: '-', up: 0, plainText: '선택하세요' },
        ...data.results.map((menu: SelectMenu) => ({
          id: menu.id,
          up: menu.properties.up.number,
          plainText: menu.properties.name.title[0].plain_text,
        })),
      ]
    : []
  return (
    <Layout>
      {isLoading ? (
        <LoadingModal isLoading={true} />
      ) : (
        <section className="text-gray-600 py-12 body-font">
          <div className="container px-5  mx-auto">
            <div className="flex flex-wrap -m-4">
              {data?.results.map((result: any, idx: number) => (
                <Card key={idx} menu={result}></Card>
              ))}
            </div>
          </div>
          <div className="container w-9/12 px-5 mx-auto ">
            <div className="flex py-12 -m-4 gap-2">
              <SelectBox
                selectProps={{ id: 'getUpData1st' }}
                onChange={handleSelect(setSelected1st)}
                selectValue={selected1st}
                selectBoxItemList={selectBoxItemList}
                label="추천 1순위"
              ></SelectBox>
              <SelectBox
                selectProps={{ id: 'getUpData2nd' }}
                onChange={handleSelect(setSelected2nd)}
                selectValue={selected2nd}
                selectBoxItemList={selectBoxItemList}
                label="추천 2순위"
              ></SelectBox>
              {currentUser.up > 0 && disable === false ? (
                <button
                  onClick={handleSubmit}
                  className="inline-flex h-12 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg break-keep"
                >
                  추천
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="flex justify-center text-red-600">
            <span>
              1순위는 2점, 2순위는 1점이 들어갑니다. <br />
              중복선택 가능합니다.
            </span>
          </div>
          <LoadingModal isLoading={disable} />
        </section>
      )}
    </Layout>
  )
}
// 빌드 타임에 호출
const queryFN = async () => {
  return (await fetch('/api/menu/')).json()
}
const fetchUser = async (id: string) => {
  // return await (await res.GET()).json()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL + '/'
    : 'https://next-study-ochre.vercel.app/'
  return await fetch(`${baseUrl}api/person/${id}`)
}
export async function getServerSideProps(context: {
  query: { id: string; name: any }
}) {
  // const host = headers().get('host');
  const queryClient = new QueryClient()
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

const recommend = async function (item1: string, item2: string) {
  const parseItem1 = JSON.parse(item1)
  const parseItem2 = JSON.parse(item2)
  try {
    if (parseItem1.menuId === parseItem2.menuId) {
      const res = await fetch('/api/menu/' + parseItem1.menuId + `?up=3`)
      if (res.status != 200) throw Error('it has error')
    } else {
      const res = await fetch('/api/menu/' + parseItem1.menuId + `?up=2`)
      const res2 = await fetch('/api/menu/' + parseItem2.menuId + `?up=1`)

      if (res.status != 200) throw Error('it has error')
      if (res2.status != 200) throw Error('it has error')
    }
  } catch (error) {
    console.log(error)
  }
}

const reduceUp = async function (id: string) {
  await fetch('/api/user/' + id)
}
