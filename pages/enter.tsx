import { Client } from '@notionhq/client'
import { TOKEN, DATABASE_ID_USER } from '../config/index'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import { configState } from 'src/recoil/personal'
import { useAdminUserPostDBMutation } from 'src/features/admin/queries/useAdminUserMutation'
import Input from 'components/basic/Input'
import { Button } from 'components/basic/Button'

type User = {
  [name: string]: {
    up: number
    id: string
  }
}
interface SubmitProps {
  name: string
}
export default function Enter() {
  const router = useRouter()
  const [config] = useRecoilState(configState)
  const { mutate } = useAdminUserPostDBMutation({
    onSuccess: (data: any) => {
      if (data.data !== 'ok') {
        setAlert({
          ...alert,
          type: 'danger',
          visible: true,
          message: '해당 이름은 존재하지 않습니다.',
        })
      } else {
        router.push({ pathname: 'main' }, 'main')
      }
    },
  })
  const [alert, setAlert] = useRecoilState(alertState)
  const submitHandler = ({ name }: SubmitProps) => {
    mutate({
      params: { type: 'QUERY', database_id: config.userKey },
      data: { name },
    })
  }

  const [userName, setUserName] = useState<string>('')

  const onEnterKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      submitHandler({ name: userName })
    }
  }
  const onChangeUserName: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUserName(e.target.value)

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
                  alt="vote"
                  src="../assets/vote.png"
                  priority={false}
                ></Image>
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  {config.teamName}
                </h1>
                {/*
                <h2 className="title-font sm:text-xl text-l mb-4 font-medium text-gray-900">
                  날짜 : xx월 xx일 ~ yy월 yy일
                </h2> */}
                <div className="leading-relaxed">
                  <span>추천 2회 가능합니다. [1순위, 2순위]</span>
                </div>
                <div className="mb-8 leading-relaxed text-red-500">
                  *추천은 1회만 가능하며, 변경은 불가능합니다.*
                </div>
                <div className="flex w-full md:justify-start justify-center items-end">
                  <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                    <Input
                      label={'이름'}
                      onChange={onChangeUserName}
                      onKeyDown={onEnterKeydown}
                      value={userName}
                    />
                  </div>
                  <Button
                    buttonStyle="addone"
                    onClick={() => router.push('admin')}
                  >
                    입장
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
// export async function getServerSideProps() {
//   const notion = new Client({ auth: TOKEN })

//   const result = await notion.databases.query({
//     database_id: DATABASE_ID_USER!,
//   })
//   const _users = result.results
//   const users: User = {}
//   _users.forEach((_user: any) => {
//     users[_user.properties.name.title[0].plain_text] = {
//       up: _user.properties.up.number,
//       id: _user.id,
//     }
//   })
//   return {
//     props: {
//       users,
//     },
//   }
// }
