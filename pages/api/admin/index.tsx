import axios from 'axios'
import { DATABASE_ID_ADMININFO, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'
export default async function adminInfo(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestMethod = req.method
  const { page_id } = req.query
  console.log(req.query)
  const properties: any = {}
  const createText = (value: string) => [
    {
      text: { content: value },
    },
  ]
  ;(Object.entries(req.body) as Entries<Record<string, string>>).forEach(
    ([key, value]) => {
      if (key === 'id') {
        properties[key] = {
          title: createText(value),
        }
      } else {
        properties[key] = {
          rich_text: createText(value),
        }
      }
    },
  )
  let options
  switch (requestMethod) {
    case 'PATCH': {
      options = {
        method: requestMethod,
        url: `https://api.notion.com/v1/pages/${page_id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Notion-Version': '2022-06-28',
          'content-type': 'application/json',
        },
        data: {
          properties,
        },
      }
      break
    }
    default: {
      options = {
        method: requestMethod,
        url: `https://api.notion.com/v1/pages`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Notion-Version': '2022-06-28',
          'content-type': 'application/json',
        },
        data: {
          parent: {
            type: 'database_id',
            database_id: DATABASE_ID_ADMININFO,
          },
          properties,
        },
      }
    }
  }

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}
