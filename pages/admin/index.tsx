import Complete from 'src/features/admin/component/Complete'
import Init from 'src/features/admin/component/Init'
import { ItemRegister } from 'src/features/admin/component/ItemRegister'
import TeamInit, { TeamInitProps } from 'src/features/admin/component/TeamInit'
import UserRegister from 'src/features/admin/component/UserRegister'
import { useCreatevote } from 'src/features/admin/hooks/useCreateVote'

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

export default function Admin() {
  const {
    Funnel,
    setStep,
    dtItemList,
    setDtItemList,
    vote,
    setVote,
    dtUserList,
    setDtUserList,
    completeHandler,
  } = useCreatevote()

  return (
    <div className="bg-primary min-h-body flex-col flex relative">
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
