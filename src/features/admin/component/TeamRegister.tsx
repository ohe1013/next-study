import { Button } from 'components/basic/Button'
import Input from 'components/basic/Input'
import Modal from 'components/basic/Modal'
import TagList from 'components/basic/TagList'
import { useState } from 'react'
import tw from 'twin.macro'

interface RegisterState {
  storeName: string
  storeLink: string
  representNameList: Set<string>
  advantageList: Set<string>
  disAdvantageList: Set<string>
  reviewLinkList: Set<string>
}
const defaultRegisterState: RegisterState = {
  storeName: '',
  storeLink: '',
  representNameList: new Set(),
  advantageList: new Set(),
  disAdvantageList: new Set(),
  reviewLinkList: new Set(),
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
    setRegisterState(defaultRegisterState)
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
          <form onSubmit={(e) => e.preventDefault()}>
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
              <TagList
                tagList={registerState.representNameList}
                setTagList={(newTagList) =>
                  setRegisterState((state) => ({
                    ...state,
                    representNameList: newTagList,
                  }))
                }
                title={'메뉴리스트'}
                buttonLabel={'추가'}
              ></TagList>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TagList
                tagList={registerState.advantageList}
                setTagList={(newTagList) =>
                  setRegisterState((state) => ({
                    ...state,
                    advantageList: newTagList,
                  }))
                }
                title={'장점'}
                buttonLabel={'추가'}
              ></TagList>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TagList
                tagList={registerState.disAdvantageList}
                setTagList={(newTagList) =>
                  setRegisterState((state) => ({
                    ...state,
                    disAdvantageList: newTagList,
                  }))
                }
                title={'단점'}
                buttonLabel={'추가'}
              ></TagList>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TagList
                tagList={registerState.reviewLinkList}
                setTagList={(newTagList) =>
                  setRegisterState((state) => ({
                    ...state,
                    reviewLinkList: newTagList,
                  }))
                }
                title={'후기'}
                buttonLabel={'추가'}
              ></TagList>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group"></div>
              <div className="relative z-0 w-full mb-5 group"></div>
            </div>
          </form>
        </div>
      </Modal>
      <Button onClick={() => setIsActive(true)}>등록하기</Button>
    </>
  )
}
