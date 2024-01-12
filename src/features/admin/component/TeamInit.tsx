import { BottomCTA } from 'components/basic/BottomCTA'
import { Button } from 'components/basic/Button'
import Input from 'components/basic/Input'
import { randomUUID } from 'crypto'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'

interface TeamRegisterProps {
  id: string
  name: string
  onNext: ({ id, name }: { id: string; name: string }) => void
}

export default function TeamRegister({
  id: _id,
  name: _name,
  onNext,
}: TeamRegisterProps) {
  const [id, setId] = useState(_id)
  const [name, setName] = useState(_name)
  const [alert, setAlert] = useRecoilState(alertState)
  const [code, setCode] = useState('')
  const isValid = <T extends string>(props: [T, ...T[]]) => {
    for (const prop of props) {
      if (prop === '') return false
    }
    return true
  }
  const createCode = () => {
    if (isValid([id, name])) {
      setAlert({ type: 'success', message: '성공', visible: true })
      setCode((Math.random() + 1).toString(36).substring(7))
    } else {
      setAlert({
        type: 'warn',
        message: '입력란을 모두 채워주세요',
        visible: true,
      })
    }
  }

  const onClick = () => {
    onNext({ id, name })
  }
  return (
    <>
      <div css={[`padding:16px`]}>
        <Input
          label={'투표명'}
          labelHtmlFor={id}
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></Input>
      </div>
      <div css={[`padding:16px`]}>
        <Input
          label={'관리자ID'}
          labelHtmlFor={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </div>
      {code && <span>{code}</span>}
      <div css={[`padding:16px`]}>
        <Button disabled={!isValid([id, name])} onClick={createCode}>
          코드 발급받기
        </Button>
      </div>
      <BottomCTA disabled={!isValid([id, name, code])} onClick={onClick}>
        다음
      </BottomCTA>
    </>
  )
}
