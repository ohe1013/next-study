import { useRouter } from 'next/router'
import { FunnelProps, StepProps, Step, Funnel } from './Funnel'
import { NonEmptyArray } from './models'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { assert } from 'src/utils/assert'

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  'steps' | 'step'
>

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>,
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element
}

interface SetStepOptions {
  stepChangeType?: 'push' | 'replace'
  preserveQuery?: boolean
  query?: Record<string, any>
}

const DEFAULT_STEP_QUERY_KEY = 'funnel-step'

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string
    initialStep?: Steps[number]
    onStepChange?: (name: Steps[number]) => void
  },
): readonly [
  FunnelComponent<Steps>,
  (step: Steps[number], options?: SetStepOptions) => void,
] => {
  const router = useRouter()
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY
  const [currentStep, setCurrentStep] = useState<Steps[number]>(
    options?.initialStep || steps[0],
  )
  useEffect(() => {
    // URL 변경을 감지하여 현재 단계를 업데이트합니다.
    const handleRouteChange = () => {
      const newStep = router.query[stepQueryKey] as Steps[number]
      if (newStep && steps.includes(newStep)) {
        setCurrentStep(newStep)
        options?.onStepChange?.(newStep)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    handleRouteChange()
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [options, router.query, router.events, stepQueryKey, steps])
  assert(steps.length > 0, 'steps가 비어있습니다.')

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          // 현재 단계를 사용하여 Funnel을 렌더링합니다.
          return <Funnel<Steps> steps={steps} step={currentStep} {...props} />
        },
        {
          Step,
        },
      ),
    [currentStep, steps],
  )

  const setStep = useCallback(
    (step: Steps[number], setStepOptions?: SetStepOptions) => {
      const { preserveQuery = true, query = {} } = setStepOptions ?? {}

      const url = `${createQueryString({
        ...(preserveQuery ? router.query : undefined),
        ...query,
        [stepQueryKey]: step,
      })}`

      options?.onStepChange?.(step)

      switch (setStepOptions?.stepChangeType) {
        case 'replace':
          router.replace(url, undefined, {
            shallow: true,
          })
          return
        case 'push':
        default:
          router.push(url, undefined, {
            shallow: true,
          })
          return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, router],
  )

  return [FunnelComponent, setStep] as const
}

export function createQueryString(params: Record<string, any>) {
  const queryString = createSearchParamString(params)

  if (queryString === '') {
    return ''
  }

  return `?${queryString}`
}

export function createSearchParamString(params: Record<string, any>) {
  return (
    new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((x) => [key, x])
          }
          return [[key, value]]
        })
        .flat(),
    )
      .toString()
      // RFC1738 -> RFC3986 스펙에 맞게 space character를 변환합니다.
      .replace(/\+/g, '%20')
  )
}
