import { useFunnel } from 'src/hooks/useFunnel/useFunnel'

export default function Admin() {
  const [Funnel, setStep] = useFunnel(['init', 'ee'] as const, {
    initialStep: 'init',
  })
  return (
    <div className="min-h-body flex-col flex">
      <Funnel>
        <Funnel.Step name="init">
          <div>init</div>
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
