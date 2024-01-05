import { useState } from 'react'
import TeamRegister from 'src/features/admin/component/TeamRegister'
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
          <TeamRegister
            id={vote.id}
            name={vote.name}
            onNext={(reqData: { id: string; name: string }) => {
              setVote({ ...vote, id: reqData.id, name: reqData.name })
              setStep('register')
            }}
          />
          <button onClick={() => setStep('register')}>ee</button>
        </Funnel.Step>
        <Funnel.Step name="register">
          <button onClick={() => setStep('init')}>init</button>
        </Funnel.Step>
      </Funnel>
    </div>
  )
}
