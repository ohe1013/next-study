import axios from 'axios'
import { TOKEN } from '../../../config'
import { NextApiRequest, NextApiResponse } from 'next'

async function getMenu({ id }: { id: any }) {
  const options = {
    method: 'get',
    url: `https://api.notion.com/v1/pages/${id}`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
  }
  const res = await axios.request(options)
  return res.data.properties.up.number
}

export default async function menu(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req
  const { id, up } = query
  const menu = await getMenu({ id })
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
        up: +menu + parseInt(up as string),
      },
    },
  }
  const _res = await axios.request(options)
  return await res.status(200).json(_res.data)
}
