import axios from 'axios'
import { TOKEN, DATABASE_ID_MENU } from '../../../config'
import { NextApiRequest, NextApiResponse } from 'next'
import { MenuAPi } from './MenuAPi'

export default async function menu(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    method: 'post',
    url: `https://api.notion.com/v1/databases/${DATABASE_ID_MENU}/query`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
  }
  const _res = await axios.request<MenuAPi>(options)

  return res.status(200).json(_res.data)
}
