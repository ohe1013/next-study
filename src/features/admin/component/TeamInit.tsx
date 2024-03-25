import { BottomCTA } from 'components/basic/BottomCTA'
import { Button } from 'components/basic/Button'
import DatePicker from 'components/basic/DatePicker'
import Input from 'components/basic/Input'
import { ChangeEvent, useCallback, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { alertState } from 'src/recoil/alert/alert'
import tw from 'twin.macro'

export interface InitVoteProps {
  id: string
  name: string
  code: string
  date: string
}
export type TeamInitNextStepState = Pick<
  TeamInitProps['initVoteProps'],
  'id' | 'name' | 'code' | 'date'
>
export interface TeamInitProps {
  initVoteProps: InitVoteProps
  onNext: (state: TeamInitNextStepState) => void
}

export default function TeamInit({ initVoteProps, onNext }: TeamInitProps) {
  const [initVoteData, setInitVoteData] = useState(initVoteProps)
  const setAlert = useSetRecoilState(alertState)
  const checkValid = <T extends string>(props: [T, ...T[]]) => {
    for (const prop of props) {
      if (prop === '') return false
    }
    return true
  }
  const createCode = () => {
    if (checkValid([initVoteData.id, initVoteData.name])) {
      setAlert({ type: 'success', message: '성공', visible: true })
      setInitVoteData({
        ...initVoteData,
        code: Math.random().toString(36).substring(7),
      })
    } else {
      setAlert({
        type: 'warn',
        message: '입력란을 모두 채워주세요',
        visible: true,
      })
    }
  }

  const handleNextButton = () => {
    onNext({
      id: initVoteData.id,
      name: initVoteData.name,
      code: initVoteData.code,
      date: initVoteData.date,
    })
  }
  const handleChangeData =
    (key: keyof InitVoteProps) => (e: ChangeEvent<HTMLInputElement>) =>
      setInitVoteData({ ...initVoteData, [key]: e.target.value })

  const handleChangeDate = useCallback((date: string) => {
    setInitVoteData((data) => ({ ...data, date }))
  }, [])
  return (
    <>
      <div css={[`padding:16px`]}>
        <Input
          label={'투표명'}
          id={initVoteData.id}
          value={initVoteData.id}
          onChange={handleChangeData('id')}
        ></Input>
      </div>
      <div css={[`padding:16px`]}>
        <Input
          label={'관리자명'}
          id={initVoteData.name}
          value={initVoteData.name}
          onChange={handleChangeData('name')}
        ></Input>
      </div>
      <div css={[`padding:16px; display:flex;width:100%`]}>
        <Input
          css={tw`flex-1`}
          label={'코드'}
          id={initVoteData.code}
          value={initVoteData.code}
          onChange={handleChangeData('code')}
          disabled={true}
        ></Input>
        <Button
          className={tw`w-40`}
          disabled={
            !checkValid([initVoteData.id, initVoteData.name]) ||
            !!initVoteData.code
          }
          onClick={createCode}
        >
          코드 발급받기
        </Button>
      </div>
      <DatePicker setDate={handleChangeDate} />
      <BottomCTA
        disabled={
          !checkValid([initVoteData.id, initVoteData.name, initVoteData.code])
        }
        onClick={handleNextButton}
      >
        다음
      </BottomCTA>
    </>
  )
}
