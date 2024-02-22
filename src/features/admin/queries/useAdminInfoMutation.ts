import axios from 'axios'
import { useMutation } from 'react-query'

interface Data {
  id: string
  adminName: string
  teamName: string
}

interface PostAdminInfoProps {
  params?: Record<string, string>
  data: Data
}
type PatchAdminInfoProps = {
  params?: Record<string, string>
  data: Data & { userKey: string }
}

const postFetcher = (props: PostAdminInfoProps) =>
  axios.post('/api/admin/pages', props.data)

const patchFetcher = (props: PatchAdminInfoProps) =>
  axios.patch('/api/admin/pages', props.data, { params: props.params })

const useAdminInfoPatchMutation = () => {
  return useMutation(patchFetcher)
}

const useAdminInfoPostMutation = () => {
  return useMutation(postFetcher)
}

export { useAdminInfoPostMutation, useAdminInfoPatchMutation }
