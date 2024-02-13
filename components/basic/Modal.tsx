import { PropsWithChildren, useEffect, useRef } from 'react'
import { Button } from './Button'
import tw from 'twin.macro'

interface ModalProps {
  title: string
  isActive: boolean
  onCancel: () => void
  onSuccess: () => void
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { title, onCancel, onSuccess, isActive, children } = props
  const currentTop = useRef(window.scrollY)
  console.log(currentTop)
  useEffect(() => {
    if (isActive) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${currentTop.current}px;
      overflow-y: scroll;
      width: 100%;`
    }
    return () => {
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(currentTop.current + '' || '0', 10) * -1)
    }
  }, [isActive])

  return isActive ? (
    <>
      <div
        css={tw`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none `}
      >
        <div css={tw`relative w-auto my-6 mx-auto max-w-3xl `}>
          {/*content*/}
          <div
            css={tw`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-slate-700`}
          >
            {/*header*/}
            <div
              css={tw`flex items-start justify-between p-5 border-b border-solid  rounded-t`}
            >
              <h3 css={tw`text-3xl font-semibold`}>{title}</h3>
              <button
                css={tw`p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none`}
                onClick={() => onCancel}
              >
                <span
                  css={tw`bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none`}
                >
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div css={tw`relative p-6 flex-auto`}>{children}</div>
            {/*footer*/}
            <div
              css={tw`flex items-center justify-end p-6 border-t border-solid  gap-2 rounded-b`}
            >
              <Button buttonStyle={'weak'} onClick={onCancel}>
                취소
              </Button>
              <Button onClick={onSuccess}>저장</Button>
            </div>
          </div>
        </div>
      </div>
      <div css={tw`opacity-25 fixed inset-0 z-40 bg-black `}></div>
    </>
  ) : (
    <></>
  )
}
