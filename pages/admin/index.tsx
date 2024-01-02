import { useState } from 'react'
import TeamRegister from 'src/features/admin/component/TeamRegister'
import { useFunnel } from 'src/hooks/useFunnel/useFunnel'

interface Vote {
  id: string
  name: string
  items: Array<any>
}

export default function Admin() {
  const [Funnel, setStep] = useFunnel(['init', 'ee'] as const, {
    initialStep: 'init',
  })
  const [vote, setVote] = useState<Vote>({ id: '', name: '', items: [] })
  const setId = (val: string) => setVote({ ...vote, id: val })
  const setName = (val: string) => setVote({ ...vote, name: val })
  return (
    <div className="min-h-body flex-col flex">
      <Funnel>
        <Funnel.Step name="init">
          <TeamRegister
            id={vote.id}
            name={vote.name}
            setId={setId}
            setName={setName}
            onClick={() => setStep('ee')}
          />
          <button onClick={() => setStep('ee')}>ee</button>
        </Funnel.Step>
        <Funnel.Step name="ee">
          <div>ee</div>
          <button onClick={() => setStep('init')}>init</button>
        </Funnel.Step>
      </Funnel>
    </div>
  )
}
