import axios from 'axios'
import { useMutation } from 'react-query'

type Data = { label: string; value?: string }[]
interface PostAdminUserProps {
  params?: Record<string, string>
  data: Data
}
const postDBFetcher = (props: PostAdminUserProps) =>
  axios.post('/api/admin/user/databases', props.data)

const postPageFetcher = (props: PostAdminUserProps) =>
  axios.post('/api/admin/user/pages', props.data, { params: props.params })

const useAdminUserPostDBMutation = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation(postDBFetcher, { onSuccess, retry: true })
}
const useAdminUserPostPageMutation = () => {
  return useMutation(postPageFetcher)
}

export { useAdminUserPostDBMutation, useAdminUserPostPageMutation }
