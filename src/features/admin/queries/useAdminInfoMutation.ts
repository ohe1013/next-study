import axios from 'axios'
import { useMutation } from 'react-query'

interface PostAdminInfoProps {
  id: string
  adminName: string
  teamName: string
}

const fetcher = (props: PostAdminInfoProps) => axios.post('/api/admin', props)
const fetcher2 = (
  props: PostAdminInfoProps & { itemKey: string; page_id: string },
) => axios.patch('/api/admin?page_id=' + props.page_id, props)
const useAdminInfoPatchMutation = () => {
  return useMutation(fetcher2)
}
const useAdminInfoPostMutation = () => {
  return useMutation(fetcher)
}

export { useAdminInfoPostMutation, useAdminInfoPatchMutation }
