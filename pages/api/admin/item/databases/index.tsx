import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'
export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  const { database_id } = req.query
  const properties: any = {
    id: {
      title: {},
    },
    up: {
      number: {
        format: 'number',
      },
    },
    down: {
      number: {
        format: 'number',
      },
    },
  }
  ;(
    Object.entries(req.body) as Entries<
      Record<string, { type: 'tag' | 'input'; label: string }>
    >
  ).forEach(([, value]) => {
    switch (value.type) {
      case 'input':
        {
          properties[value.label] = {
            rich_text: {},
          }
        }
        break
      case 'tag': {
        properties[value.label] = {
          multi_select: {},
        }
        break
      }
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
