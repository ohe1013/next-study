import axios from 'axios'
import { TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'
export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  const { database_id } = req.query
  const properties: any = {
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
  ).forEach(([key, value]) => {
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
  let options

  switch (requestMethod) {
    default:
    case 'POST':
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
            database_id: database_id,
          },
          properties,
        },
      }
      break
  }

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}
