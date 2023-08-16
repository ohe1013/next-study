import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { TOKEN } from '../../../config'
export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req
  const { id } = query
  const options = {
    method: 'patch',
    url: `https://api.notion.com/v1/pages/${id}`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
    data: {
      properties: {
        up: 0,
      },
    },
  }
  const _res = await axios.request(options)
  return await res.status(200).json(_res.data)
}
