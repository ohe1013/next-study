import { BottomCTA } from 'components/basic/BottomCTA'
import { Button } from 'components/basic/Button'
import Input from 'components/basic/Input'
import { Vote } from 'pages/admin'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import {
  useAdminInfoPatchMutation,
  useAdminInfoPostMutation,
} from '../queries/useAdminInfoMutation'

export interface TeamInitProps {
  id: string
  name: string
  code: string
  onNext: (state: Pick<Vote, keyof Omit<TeamInitProps, 'onNext'>>) => void
}

export default function TeamRegister({
  id: _id,
  name: _name,
  code: _code,
  onNext,
}: TeamInitProps) {
  const [id, setId] = useState(_id)
  const [name, setName] = useState(_name)
  const [, setAlert] = useRecoilState(alertState)
  const [code, setCode] = useState(_code)
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
  const {
    mutate: postAdminInfoMuatate,
    data: postAdminInfoData,
    status: postAdminInfoStatus,
  } = useAdminInfoPostMutation()

  const { mutate: patchAdminInfohMutate } = useAdminInfoPatchMutation()
  if (postAdminInfoStatus === 'success') {
    onNext({ id, name, code })
    const page_id = postAdminInfoData.data.id
    patchAdminInfohMutate({
      data: {
        adminName: name,
        teamName: id,
        id: code,
        userKey: 'it test',
      },
      params: {
        page_id,
      },
    })
  }
  const handleNextButton = () => {
    postAdminInfoMuatate({ data: { adminName: name, teamName: id, id: code } })
  }
  return (
    <>
      <div css={[`padding:16px`]}>
        <Input
          label={'투표명'}
          id={id}
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></Input>
      </div>
      <div css={[`padding:16px`]}>
        <Input
          label={'관리자ID'}
          id={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </div>
      {code && (
        <div css={[`padding:16px`]}>
          <Input label={'코드'} id={code} value={code} disabled={true}></Input>
        </div>
      )}
      <div css={[`padding:16px`]}>
        <Button disabled={!isValid([id, name])} onClick={createCode}>
          코드 발급받기
        </Button>
      </div>
      <BottomCTA
        disabled={!isValid([id, name, code])}
        onClick={handleNextButton}
      >
        다음
      </BottomCTA>
    </>
  )
}
