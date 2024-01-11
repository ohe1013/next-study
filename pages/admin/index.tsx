import { Button } from 'components/basic/Button'
import { useState } from 'react'
import TeamInit from 'src/features/admin/component/TeamInit'
import { TeamRegister } from 'src/features/admin/component/TeamRegister'
import { useFunnel } from 'src/hooks/useFunnel/useFunnel'

interface Vote {
  id: string
  name: string
  items: Array<any>
}

export default function Admin() {
  const [Funnel, setStep] = useFunnel(['init', 'register'] as const, {
    initialStep: 'init',
  })
  const [vote, setVote] = useState<Vote>({ id: '', name: '', items: [] })
  return (
    <div className="min-h-body flex-col flex">
      <Funnel>
        <Funnel.Step name="init">
          <TeamInit
            id={vote.id}
            name={vote.name}
            onNext={(reqData: { id: string; name: string }) => {
              setVote({ ...vote, id: reqData.id, name: reqData.name })
              setStep('register')
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="register">
          <TeamRegister />
        </Funnel.Step>
      </Funnel>
    </div>
  )
}
