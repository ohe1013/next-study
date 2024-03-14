import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'components/basic/Button'
import tw from 'twin.macro'
import Input from 'components/basic/Input'
import { useState } from 'react'
import { useAdminInfoDBPostMutation } from 'src/features/admin/queries/useAdminInfoMutation'
import { alertState } from 'src/recoil/alert/alert'
import { useRecoilState } from 'recoil'

export default function Home() {
  const router = useRouter()
  const [, setAlert] = useRecoilState(alertState)
  const [code, setCode] = useState('')
  const { mutate } = useAdminInfoDBPostMutation({
    onSuccess: (data: any) => {
      if (!data.data) {
        setAlert({
          message: '코드를 확인해주세요. ',
          type: 'warn',
          visible: true,
        })
      } else {
        router.push({ href: '/enter' })
      }
    },
  })
  const enterVote = (code: string) => {
    mutate({ data: { code }, params: { type: 'QUERY' } })
  }

  return (
    <div css={tw`flex-1 `}>
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
          onChange={(e) => setCode(e.target.value)}
          value={code}
        ></Input>
        <Button className={tw`w-40`} onClick={() => enterVote(code)}>
          회식 참가하기
        </Button>
      </div>
      <Button buttonStyle="weak" onClick={() => router.push('admin')}>
        회식 만들기
      </Button>
    </div>
  )
}
