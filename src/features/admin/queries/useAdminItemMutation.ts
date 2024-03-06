import axios from 'axios'
import { useMutation } from 'react-query'

type Data = {
  type: string
  label: string
  value?: any
}[]
interface PostPageProps {
  params?: Record<string, string>
  data: Data[]
}
interface PostDBProps {
  params?: Record<string, string>
  data: Data
}
const postDBFetcher = (props: PostDBProps) =>
  axios.post('/api/admin/item/databases', props.data)

const postPageFetcher = (props: PostPageProps) =>
  axios.post('/api/admin/item/pages', props.data, { params: props.params })

const useAdminItemPostDBMutation = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation(postDBFetcher, {
    onSuccess,
  })
}
const useAdminItemPostPageMutation = () => {
  return useMutation(postPageFetcher)
}

export { useAdminItemPostDBMutation, useAdminItemPostPageMutation }
