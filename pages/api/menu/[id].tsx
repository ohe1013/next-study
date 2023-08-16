import axios from 'axios'
import { TOKEN } from '../../../config'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function menu(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req
  const { id, up } = query
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
        up: parseInt(up as string),
      },
    },
  }
  const _res = await axios.request(options)
  return await res.status(200).json(_res.data)
}
