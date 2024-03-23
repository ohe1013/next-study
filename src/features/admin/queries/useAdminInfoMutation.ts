import axios from 'axios'
import { useMutation } from 'react-query'

interface Data {
  code: string
  teamName: string
  adminName: string
  userKey: string
  itemKey: string
  date: string
}
interface CreateAmdinInfoProps {
  params: { type: 'CREATE' } & Record<string, any>
  data: Data
}
interface QueryAdminInfoProps {
  params: { type: 'QUERY' } & Record<string, any>
  data: Pick<Data, 'code'>
}

type PostAdminInfoProps = CreateAmdinInfoProps | QueryAdminInfoProps
type PatchAdminInfoProps = {
  params?: Record<string, string>
  data: Data
}

const postPageFetcher = (props: PostAdminInfoProps) =>
  axios.post(`/api/admin/pages`, props.data, { params: props.params })

const postDBFetcher = (props: PostAdminInfoProps) =>
  axios.post(`/api/admin/databases`, props.data, { params: props.params })

const patchFetcher = (props: PatchAdminInfoProps) =>
  axios.patch('/api/admin/pages', props.data, { params: props.params })

const useAdminInfoPatchMutation = () => {
  return useMutation(patchFetcher)
}

const useAdminInfoDBPostMutation = (props: { onSuccess: any }) => {
  return useMutation(postDBFetcher, {
    onSuccess: props.onSuccess,
    retry: true,
  })
}
const useAdminInfoPagePostMutation = (props: { onSuccess: any }) => {
  return useMutation(postPageFetcher, {
    onSuccess: props.onSuccess,
    retry: true,
  })
}

export {
  useAdminInfoDBPostMutation,
  useAdminInfoPagePostMutation,
  useAdminInfoPatchMutation,
}
