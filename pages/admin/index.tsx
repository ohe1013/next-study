import Link from 'next/link'
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
import { Entries } from 'types/util'

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

type FormInputType = 'input' | 'input/link'
type FormTagType = 'tag' | 'tag/link'
interface FormInputItem<Type extends FormInputType, ValueType> {
  type: Type
  value: ValueType
  label: string
}

interface FormTagItem<Type extends FormTagType, ValueType> {
  value: Set<ValueType>
  type: Type
  label: string
  buttonLabel: string
}

type FormItem<
  Type extends FormTagType | FormInputType,
  ValueType,
> = Type extends FormInputType
  ? FormInputItem<Type, ValueType>
  : Type extends FormTagType
  ? FormTagItem<Type, ValueType>
  : never

export interface DtRegisterItem {
  storeName: FormItem<'input', string>
  storeLink: FormItem<'input/link', string>
  representNameList: FormItem<'tag', string>
  advantageList: FormItem<'tag', string>
  disAdvantageList: FormItem<'tag', string>
  reviewLinkList: FormTagItem<'tag/link', string>
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

  // const {
  //   mutate: itemDbMutate,
  //   data: itemDbData,
  //   isSuccess: itemSuccess,
  // } = useAdminItemPostDBMutation()
  const { mutate: itemPageMutate, data: itemPageData } =
    useAdminItemPostPageMutation()

  // if (itemSuccess) {
  //   const { id: itemDatabaseId } = itemDbData.data
  //   const dtRegisterDB = dtItemList.map((dtItem) =>
  //     (Object.entries(dtItem) as Entries<DtRegisterItem>).map(
  //       ([key, value]) => ({
  //         type: value.type.indexOf('input') > -1 ? 'input' : 'tag',
  //         label: value.label,
  //         value:
  //           value.type.indexOf('input') > -1
  //             ? value.value
  //             : Array.from(value.value),
  //       }),
  //     ),
  //   )
  //   itemPageMutate({
  //     data: dtRegisterDB,
  //     params: { database_id: itemDatabaseId },
  //   })
  //   Link({ href: '/' })
  // }
  const { mutate: itemDbMutate, isSuccess: itemSuccess } =
    useAdminItemPostDBMutation({
      onSuccess: (data: any) => {
        const { id: itemDatabaseId } = data.data
        const dtRegisterDB = dtItemList.map((dtItem) =>
          (Object.entries(dtItem) as Entries<DtRegisterItem>).map(
            ([key, value]) => ({
              type: value.type.indexOf('input') > -1 ? 'input' : 'tag',
              label: value.label,
              value:
                value.type.indexOf('input') > -1
                  ? value.value
                  : Array.from(value.value),
            }),
          ),
        )
        itemPageMutate({
          data: dtRegisterDB,
          params: { database_id: itemDatabaseId },
        })
        Link({ href: '/' })
      },
    })
  const completeHandler = async () => {
    const dtRegisterDB = Object.entries(defaultDtRegisterItem).map(
      ([key, value]) => ({
        type: value.type.indexOf('input') > -1 ? 'input' : 'tag',
        label: value.label,
      }),
    )
    itemDbMutate({ data: dtRegisterDB })
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
