import axios from 'axios'
import { useMutation } from 'react-query'

type Data = {
  label: string
  value?: any
}[]
interface PostAdminUserProps {
  params?: Record<string, string>
  data: Data
}
const postDBFetcher = (props: PostAdminUserProps) =>
  axios.post('/api/admin/user/databases', props.data)

const postPageFetcher = (props: PostAdminUserProps) =>
  axios.post('/api/admin/user/pages', props.data)

const useAdminUserPostDBMutation = () => {
  return useMutation(postDBFetcher)
}
const useAdminUserPostPageMutation = () => {
  return useMutation(postPageFetcher)
}

export { useAdminUserPostDBMutation, useAdminUserPostPageMutation }
