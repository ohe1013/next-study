import { Button } from 'components/basic/Button'
import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import TagList from 'components/basic/TagList'
import { useState } from 'react'
import tw from 'twin.macro'

interface RegisterState {
  storeName: string
  storeLink: string
  representNameList: string[]
  advantageList: string[]
  disAdvantageList: string[]
}
const defaultRegisterState: RegisterState = {
  storeName: '',
  storeLink: '',
  representNameList: [],
  advantageList: [],
  disAdvantageList: [],
}

export function TeamRegister() {
  const [isActive, setIsActive] = useState(false)
  const [registerState, setRegisterState] =
    useState<RegisterState>(defaultRegisterState)

  const onSuccessEventHandler = () => {
    setIsActive(false)
  }
  const onCancelEventHandler = () => {
    setIsActive(false)
  }
  return (
    <>
      <Modal
        title={'등록하기'}
        isActive={isActive}
        onSuccess={onSuccessEventHandler}
        onCancel={onCancelEventHandler}
      >
        <div css={tw`max-w-md mx-auto [min-width: 384px] w-96 `}>
          <form>
            <div className="relative z-0 w-full mb-5 group">
              <Input
                label={'매장명'}
                value={registerState.storeName}
                onChange={(e) =>
                  setRegisterState((state) => ({
                    ...state,
                    storeName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Input
                label={'매장링크'}
                value={registerState.storeLink}
                onChange={(e) =>
                  setRegisterState((state) => ({
                    ...state,
                    storeLink: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TagList></TagList>
              <Input label={'메뉴리스트'} />
            </div>
            <div css={tw`grid md:grid-cols-2 md:gap-6`}>
              <div className="relative z-0 w-full mb-5 group">
                <Input label={'장점'} />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Input label={'단점'} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group"></div>
              <div className="relative z-0 w-full mb-5 group"></div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
      <Button onClick={() => setIsActive(true)}>등록하기</Button>
    </>
  )
}
