import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  const properties: any = {
    id: {
      title: {},
    },
  }
  req.body.forEach((data: string) => {
    properties[data] = {
      rich_text: {},
    }
  })
  const options = {
    method: requestMethod,
    url: `https://api.notion.com/v1/databases`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
    data: {
      parent: {
        type: 'page_id',
        page_id: PARENT_PAGE_ID,
      },
      properties,
    },
  }

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}
