import { Client } from '@notionhq/client'
import { TOKEN, DATABASE_ID_USER } from '../config/index'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'

type User = {
  [name: string]: {
    up: number
    id: string
  }
}
interface SubmitProps {
  name: string
}
export default function Home({ users }: { users: User }) {
  const router = useRouter()
  const [alert, setAlert] = useRecoilState(alertState)
  const isValidUser = (name: string) => {
    return uesrNameArr.includes(name)
  }
  const submitHandler = ({ name }: SubmitProps) => {
    if (isValidUser(name)) {
      const id = users[userName].id
      router.push({ pathname: 'main', query: { name, id } }, 'main')
    } else {
      setAlert({
        ...alert,
        type: 'danger',
        visible: true,
        message: '해당 이름은 존재하지 않습니다.',
      })
    }
  }
  const uesrNameArr = Object.keys(users)
  const [userName, setUserName] = useState<string>('')
  const onChangeUserName = (e: any) => {
    setUserName(e.target.value)
  }
  return (
    <div className="bg-primary">
      <section className="flex min-h-fit flex-col items-center text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 flex-col items-center">
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <Image
                  unoptimized
                  height={200}
                  width={426}
                  alt="jungo"
                  src="../assets/vote.png"
                ></Image>
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  OHK투표사이트
                </h1>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  e.g. 숙소투표
                </h1>
                <h2 className="title-font sm:text-xl text-l mb-4 font-medium text-gray-900">
                  날짜 : xx월 xx일 ~ yy월 yy일
                </h2>
                <div className="leading-relaxed">
                  <span>추천 2회 가능합니다. [1순위, 2순위]</span>
                </div>
                <div className="mb-8 leading-relaxed text-red-500">
                  *추천은 1회만 가능하며, 변경은 불가능합니다.*
                </div>
                <div className="flex w-full md:justify-start justify-center items-end">
                  <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                    <label
                      htmlFor="hero-field"
                      className="leading-7 text-sm text-gray-600"
                    >
                      이름(오현근으로 접속가능)
                    </label>
                    <input
                      type="text"
                      id="hero-field"
                      name="hero-field"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      required
                      value={userName}
                      onChange={onChangeUserName}
                    />
                  </div>
                  <button
                    onClick={() =>
                      submitHandler({
                        name: userName,
                      })
                    }
                    type="submit"
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    입장
                  </button>
                  {/* )} */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps() {
  const notion = new Client({ auth: TOKEN })
  const result = await notion.databases.query({
    database_id: DATABASE_ID_USER!,
  })
  const _users = result.results
  const users: User = {}
  _users.forEach((_user: any) => {
    users[_user.properties.name.title[0].plain_text] = {
      up: _user.properties.up.number,
      id: _user.id,
    }
  })
  return {
    props: {
      users,
    },
  }
}
