import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import Complete from 'src/features/admin/component/Complete'
import Init from 'src/features/admin/component/Init'
import { ItemRegister } from 'src/features/admin/component/ItemRegister'
import { defaultDtRegisterItem } from 'src/features/admin/component/ItemRegisterModal'
import TeamInit, { TeamInitProps } from 'src/features/admin/component/TeamInit'
import UserRegister from 'src/features/admin/component/UserRegister'
import { useAdminInfoPostMutation } from 'src/features/admin/queries/useAdminInfoMutation'
import {
  useAdminItemPostDBMutation,
  useAdminItemPostPageMutation,
} from 'src/features/admin/queries/useAdminItemMutation'
import {
  useAdminUserPostDBMutation,
  useAdminUserPostPageMutation,
} from 'src/features/admin/queries/useAdminUserMutation'
import { useFunnel } from 'src/hooks/useFunnel/useFunnel'

// DT = Dining Together
export interface Vote {
  id: string
  name: string
  code: string
  userKey: string
  itemKey: string
}
type ItemList = DtRegisterItem[]

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
interface FormInputLinkData {
  value: string
  type: 'input/link'
  label: string
}
interface FormTagData<T> {
  value: Set<T>
  type: 'tag'
  label: string
  buttonLabel: string
}
interface FormTagLinkData<T> {
  value: Set<T>
  type: 'tag/link'
  label: string
  buttonLabel: string
}

export interface DtRegisterItem {
  storeName: FormInputData
  storeLink: FormInputLinkData
  representNameList: FormTagData<string>
  advantageList: FormTagData<string>
  disAdvantageList: FormTagData<string>
  reviewLinkList: FormTagLinkData<string>
}
const defaultVote = {
  id: '',
  name: '',
  code: '',
  itemKey: '',
  userKey: '',
}
export default function Admin() {
  const [Funnel, setStep] = useFunnel(
    ['init', 'teamInit', 'registerItem', 'registerUser', 'complete'] as const,
    {
      initialStep: 'init',
    },
  )

  const [vote, setVote] = useState<Vote>(defaultVote)
  const [dtItemList, setDtItemList] = useState<DtRegisterItem[]>([])
  const [dtUserList, setDtUserList] = useState<string[]>([])

  const {
    mutate: itemDbMutate,
    data: itemDbData,
    isSuccess: itemSuccess,
  } = useAdminItemPostDBMutation()
  const { mutate: itemPageMutate, data: itemPageData } =
    useAdminItemPostPageMutation()
  const {
    mutate: userDBMutate,
    data: userDbData,
    isSuccess: userSuccess,
  } = useAdminUserPostDBMutation()
  const { mutate: userPageMutate, data: userPageData } =
    useAdminUserPostPageMutation()
  const { mutate } = useAdminInfoPostMutation()

  if (itemSuccess) {
    const { id: itemDatabaseId } = itemDbData.data
    // const { id: userDatabaseId } = userDbData.data
    const dtRegisterDB = dtItemList.map((dtItem) =>
      Object.entries(dtItem).map(([key, value]) => ({
        type: value.type,
        label: value.label,
      })),
    )
    itemPageMutate({ data: dtRegisterDB, params: { page_id: itemDatabaseId } })
  }
  const completeHandler = async () => {
    const dtRegisterDB = Object.entries(defaultDtRegisterItem).map(
      ([key, value]) => ({
        type: value.type,
        label: value.label,
      }),
    )
    // const dtUserDB = [{ label: '이름' }]
    itemDbMutate({ data: dtRegisterDB })
    // userDBMutate({ data: dtUserDB })
  }

  return (
    <div className="min-h-body flex-col flex">
      <Funnel>
        <Funnel.Step name="init">
          <Init
            itemList={{ dtItemList, setDtItemList }}
            userList={{ dtUserList, setDtUserList }}
            onNext={(type: 'create' | 'update') =>
              setStep(type === 'create' ? 'teamInit' : 'registerItem')
            }
          ></Init>
        </Funnel.Step>

        <Funnel.Step name="teamInit">
          <TeamInit
            id={vote.id}
            name={vote.name}
            code={vote.code}
            onNext={(reqData: Pick<TeamInitProps, 'id' | 'name' | 'code'>) => {
              setVote({
                ...vote,
                id: reqData.id,
                name: reqData.name,
                code: reqData.code,
              })
              setStep('registerItem')
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="registerItem">
          <ItemRegister
            dtItemList={dtItemList}
            setDtItemList={setDtItemList}
            onNext={(reqData: Pick<Vote, 'itemKey'>) => {
              setVote({
                ...vote,
                itemKey: reqData.itemKey,
              })
              setStep('registerUser')
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="registerUser">
          <UserRegister
            dtUserList={dtUserList}
            setDtUserList={setDtUserList}
            onNext={(reqData: Pick<Vote, 'userKey'>) => {
              setVote({
                ...vote,
                userKey: reqData.userKey,
              })
              completeHandler()
              setStep('complete')
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="complete">
          <Complete />
        </Funnel.Step>
      </Funnel>
    </div>
  )
}
