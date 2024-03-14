import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Complete from 'src/features/admin/component/Complete'
import Init from 'src/features/admin/component/Init'
import { ItemRegister } from 'src/features/admin/component/ItemRegister'
import { defaultDtRegisterItem } from 'src/features/admin/component/ItemRegisterModal'
import TeamInit, { TeamInitProps } from 'src/features/admin/component/TeamInit'
import UserRegister from 'src/features/admin/component/UserRegister'
import { useAdminInfoPagePostMutation } from 'src/features/admin/queries/useAdminInfoMutation'
import {
  useAdminItemPostDBMutation,
  useAdminItemPostPageMutation,
} from 'src/features/admin/queries/useAdminItemMutation'
import {
  useAdminUserPostDBMutation,
  useAdminUserPostPageMutation,
} from 'src/features/admin/queries/useAdminUserMutation'
import { useFunnel } from 'src/hooks/useFunnel/useFunnel'
import { usePrevious } from 'src/hooks/usePrevious/usePrevious'
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
export interface DtRegisterUser {
  label: string
  value: string
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
  const router = useRouter()
  const [vote, setVote] = useState<Vote>(defaultVote)
  const [dtItemList, setDtItemList] = useState<DtRegisterItem[]>([])
  const [dtUserList, setDtUserList] = useState<
    { label: string; value: string }[]
  >([])

  const { mutate: itemPageMutate, isSuccess: itemSuccess } =
    useAdminItemPostPageMutation()
  const { mutate: userPageMutate, isSuccess: userSuccess } =
    useAdminUserPostPageMutation()
  const { mutate } = useAdminInfoPagePostMutation({
    onSuccess: () => router.push('/'),
  })
  const prevItemSuccess = usePrevious(itemSuccess && userSuccess)
  useEffect(() => {
    if (!prevItemSuccess && itemSuccess && userSuccess) {
      mutate({
        params: { type: 'CREATE' },
        data: {
          code: vote.code,
          teamName: vote.id,
          adminName: vote.name,
          userKey: itemData?.data.id,
          itemKey: userData?.data.id,
        },
      })
    }
  }, [itemSuccess, userSuccess])

  const { mutate: itemDbMutate, data: itemData } = useAdminItemPostDBMutation({
    onSuccess: (data: any) => {
      const { id: itemDatabaseId } = data.data
      const dtRegisterPage = dtItemList.map((dtItem) =>
        (Object.entries(dtItem) as Entries<DtRegisterItem>).map(
          ([, value]) => ({
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
        data: dtRegisterPage,
        params: { database_id: itemDatabaseId },
      })
    },
  })

  const { mutate: userDbMutate, data: userData } = useAdminUserPostDBMutation({
    onSuccess: (data: any) => {
      const { id: userDatabaseId } = data.data
      const dtUserPage = dtUserList.map((dtUser) => ({
        label: '이름',
        value: dtUser.value,
      }))
      userPageMutate({
        data: dtUserPage,
        params: { database_id: userDatabaseId },
      })
    },
  })

  const completeHandler = async () => {
    const dtRegisterDB = Object.entries(defaultDtRegisterItem).map(
      ([key, value]) => ({
        type: value.type.indexOf('input') > -1 ? 'input' : 'tag',
        label: value.label,
      }),
    )
    const dtUserPage = [{ label: '이름' }]
    itemDbMutate({
      data: dtRegisterDB,
      params: {
        type: 'CREATE',
      },
    })
    userDbMutate({
      data: dtUserPage,
      params: {
        type: 'CREATE',
      },
    })
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
