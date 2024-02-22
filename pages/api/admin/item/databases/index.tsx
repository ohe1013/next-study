import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'

type Tag = {
  type: 'tag'
  label: string
  value: Set<string>
}
type Input = {
  type: 'input'
  label: string
  value: string | null
}

export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
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
  ;(Object.entries(req.body) as Entries<Record<string, Tag | Input>>).forEach(
    ([key, value]) => {
      switch (value.type) {
        case 'input':
          {
            properties[value.label] = {
              rich_text: [
                {
                  text: {
                    content: value.value,
                  },
                },
              ],
            }
          }
          break
        case 'tag': {
          properties[value.label] = {
            multi_select: {
              options: Array.from(value.value).map((item) => ({
                name: item,
              })),
            },
          }
          break
        }
      }
    },
  )
  let options

  switch (requestMethod) {
    default:
    case 'POST':
      options = {
        method: 'POST',
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
      break
  }

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}
