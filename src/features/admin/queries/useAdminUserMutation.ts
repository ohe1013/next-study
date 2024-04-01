import axios from 'axios'
import { useMutation } from 'react-query'

type Data = { label: string; value?: string }[]
interface Params {
  type: 'CREATE' | 'UPDATE' | 'QUERY'
}

interface PostPageProps {
  params?: Record<string, string>
  data: Data
}
interface PostDBProps {
  params?: Params & Record<string, string>
  data?: Data
}
interface PostDBQueryProps {
  params: { type: 'QUERY'; database_id: string } & Record<string, string>
  data: { name: string }
}
const postDBFetcher = (props: PostDBProps | PostDBQueryProps) =>
  axios.post('/api/admin/user/databases', props.data, { params: props.params })

const postPageFetcher = (props: PostPageProps) =>
  axios.post('/api/admin/user/pages', props.data, { params: props.params })

const useAdminUserPostDBMutation = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation(postDBFetcher, { onSuccess, retry: true })
}
const useAdminUserPostPageMutation = () => {
  return useMutation(postPageFetcher)
}

export { useAdminUserPostDBMutation, useAdminUserPostPageMutation }
