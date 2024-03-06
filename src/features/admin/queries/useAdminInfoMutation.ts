import axios from 'axios'
import { useMutation } from 'react-query'

interface Data {
  code: string
  teamName: string
  adminName: string
  userKey: string
  itemKey: string
}

interface PostAdminInfoProps {
  params?: Record<string, string>
  data: Data
}
type PatchAdminInfoProps = {
  params?: Record<string, string>
  data: Data
}

const postFetcher = (props: PostAdminInfoProps) =>
  axios.post('/api/admin/pages', props.data)

const patchFetcher = (props: PatchAdminInfoProps) =>
  axios.patch('/api/admin/pages', props.data, { params: props.params })

const useAdminInfoPatchMutation = () => {
  return useMutation(patchFetcher)
}

const useAdminInfoPostMutation = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation(postFetcher, {
    onSuccess,
    retry: true,
  })
}

export { useAdminInfoPostMutation, useAdminInfoPatchMutation }
