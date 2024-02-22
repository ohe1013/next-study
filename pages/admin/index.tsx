import { createContext, useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import TeamInit, { TeamInitProps } from 'src/features/admin/component/TeamInit'
import { TeamRegister } from 'src/features/admin/component/TeamRegister'
import { useFunnel } from 'src/hooks/useFunnel/useFunnel'
import { adminFunnelRollback } from 'src/recoil/admin'

export interface Vote {
  id: string
  name: string
  code: string
  registerList: RegisterState[]
}

interface FormImgData {
  value: any
  type: 'img'
  label: string
}

interface FormInputData {
  value: string
  type: 'input'
  label: string
}
interface FormTagData<T> {
  value: Set<T>
  type: 'tag'
  label: string
  buttonLabel: string
}

export interface RegisterState {
  representImg: FormImgData
  storeName: FormInputData
  storeLink: FormInputData
  representNameList: FormTagData<string>
  advantageList: FormTagData<string>
  disAdvantageList: FormTagData<string>
  reviewLinkList: FormTagData<string>
}
export default function Admin() {
  const [Funnel, setStep] = useFunnel(['init', 'register'] as const, {
    initialStep: 'init',
  })
  const [vote, setVote] = useState<Vote>({
    id: '',
    name: '',
    code: '',
    registerList: [],
  })
  const [rollback, setRollback] = useRecoilState(adminFunnelRollback)
  return (
    <div className="min-h-body flex-col flex">
      <Funnel>
        <Funnel.Step name="init">
          <TeamInit
            id={vote.id}
            name={vote.name}
            code={vote.code}
            onNext={(reqData: Omit<TeamInitProps, 'onNext'>) => {
              setVote({
                ...vote,
                id: reqData.id,
                name: reqData.name,
                code: reqData.code,
              })
              setStep('register')
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="register">
          <TeamRegister registerList={vote.registerList} />
        </Funnel.Step>
      </Funnel>
    </div>
  )
}
