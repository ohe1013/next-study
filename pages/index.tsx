'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'components/basic/Button'
import tw from 'twin.macro'
import Input from 'components/basic/Input'
import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from 'react'
import { useAdminInfoDBPostMutation } from 'src/features/admin/queries/useAdminInfoMutation'
import { alertState } from 'src/recoil/alert/alert'
import { useSetRecoilState } from 'recoil'
import { configState } from 'src/recoil/personal'
import { AxiosResponse } from 'axios'

export default function Home() {
  const router = useRouter()
  const setAlert = useSetRecoilState(alertState)
  const setConfig = useSetRecoilState(configState)
  const [code, setCode] = useState('')
  const { mutate } = useAdminInfoDBPostMutation({
    onSuccess: (data: AxiosResponse) => {
      if (!data.data) {
        setAlert({
          message: '코드를 확인해주세요. ',
          type: 'warn',
          visible: true,
        })
      } else {
        setConfig({ ...data.data })
        router.push({ pathname: '/enter' })
      }
    },
  })

  const handleChangeCode: ChangeEventHandler<HTMLInputElement> = (e) =>
    setCode(e.target.value)
  const handleEnterKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      enterVote(code)
    }
  }

  const enterVote = (code: string) => {
    mutate({ data: { code }, params: { type: 'QUERY' } })
  }

  return (
    <div className="bg-primary">
      <section className="py-24 flex items-center text-gray-600 body-font">
        <div css={tw` flex-1 `}>
          <div css={tw`m-auto mt-20`}>
            <Image
              unoptimized
              height={200}
              width={300}
              alt="vote"
              src="../../../assets/vote.png"
              priority={false}
              css={tw`mx-auto`}
            ></Image>
          </div>
          <div css={[`padding:16px; display:flex;width:100%`]}>
            <Input
              css={tw`flex-1`}
              label={'코드'}
              id={code}
              onChange={handleChangeCode}
              onKeyDown={handleEnterKeydown}
              value={code}
            ></Input>
            <Button className={tw`w-40`} onClick={() => enterVote(code)}>
              회식 참가하기
            </Button>
          </div>
          <Button
            buttonStyle="weak"
            onClick={() =>
              router.push({
                pathname: 'admin',
                query: { 'vote-create-step': 'init' },
              })
            }
          >
            회식 만들기
          </Button>
        </div>
      </section>
    </div>
  )
}
