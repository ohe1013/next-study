import axios from 'axios'
import { useMutation } from 'react-query'

type Data = {
  type: 'tag' | 'input'
  label: string
}[]
interface PostAdminItemProps {
  params?: Record<string, string>
  data: Data
}
const postDBFetcher = (props: PostAdminItemProps) =>
  axios.post('/api/admin/item/databases', props.data)

const postPageFetcher = (props: PostAdminItemProps) =>
  axios.post('/api/admin/item/pages', props.data)

const useAdminItemPostDBMutation = () => {
  return useMutation(postDBFetcher)
}
const useAdminItemPostPageMutation = () => {
  return useMutation(postPageFetcher)
}

export { useAdminItemPostDBMutation, useAdminItemPostPageMutation }
