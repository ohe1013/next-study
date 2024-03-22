import { useRouter } from 'next/router'
import { DtRegisterItem, DtRegisterUser, Vote } from 'pages/admin'
import { useEffect, useState } from 'react'
import { useFunnel } from 'src/hooks/useFunnel/useFunnel'
import {
  useAdminItemPostDBMutation,
  useAdminItemPostPageMutation,
} from '../queries/useAdminItemMutation'
import {
  useAdminUserPostDBMutation,
  useAdminUserPostPageMutation,
} from '../queries/useAdminUserMutation'
import { useAdminInfoPagePostMutation } from '../queries/useAdminInfoMutation'
import { usePrevious } from 'src/hooks/usePrevious/usePrevious'
import { Entries } from 'types/util'

const defaultVote = {
  id: '',
  name: '',
  code: '',
  itemKey: '',
  userKey: '',
}
export const defaultDtRegisterItem: DtRegisterItem = {
  storeName: { value: '', type: 'input', label: '매장명' },
  storeLink: { value: '', type: 'input/link', label: '매장링크' },
  representNameList: {
    value: new Set(),
    type: 'tag',
    label: '대표메뉴',
    buttonLabel: '추가',
  },
  advantageList: {
    value: new Set(),
    type: 'tag',
    label: '장점',
    buttonLabel: '추가',
  },
  disAdvantageList: {
    value: new Set(),
    type: 'tag',
    label: '단점',
    buttonLabel: '추가',
  },
  reviewLinkList: {
    value: new Set(),
    type: 'tag/link',
    label: '후기',
    buttonLabel: '추가',
  },
}
export const useCreatevote = () => {
  const [Funnel, setStep] = useFunnel(
    ['init', 'teamInit', 'registerItem', 'registerUser', 'complete'] as const,
    {
      initialStep: 'init',
    },
  )
  const router = useRouter()
  const [vote, setVote] = useState<Vote>(defaultVote)
  const [dtItemList, setDtItemList] = useState<DtRegisterItem[]>([])
  const [dtUserList, setDtUserList] = useState<DtRegisterUser[]>([])

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

  const completeHandler = () => {
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

  return {
    Funnel,
    setStep,
    dtItemList,
    setDtItemList,
    vote,
    setVote,
    dtUserList,
    setDtUserList,
    completeHandler,
  }
}
