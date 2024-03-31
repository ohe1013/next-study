import axios from 'axios'
import { TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'

type Tag = {
  type: `tag${string}`
  label: string
  value: Array<string>
}
type Input = {
  type: `input${string}`
  label: string
  value: string | null
}
type Data = {
  type: 'tag' | 'input'
  label: string
  value?: any
}[]

export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const { database_id } = req.query
  const properties: Record<string, any>[] = []
  const dataList = req.body as Data[]
  dataList.forEach((data, idx) => {
    properties[idx] = {
      id: {
        title: [
          {
            text: { content: database_id },
          },
        ],
      },
      up: {
        number: 0,
      },
      down: {
        number: 0,
      },
    }
    ;(Object.entries(data) as Entries<Record<string, Tag | Input>>).forEach(
      ([key, value]) => {
        switch (true) {
          case value.type.startsWith('input'):
            {
              properties[idx][value.label] = {
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
          case value.type.startsWith('tag'): {
            properties[idx][value.label] = {
              multi_select: [
                ...(value.value as Tag['value']).map((item) => ({
                  name: item,
                })),
              ],
            }
            break
          }
        }
      },
    )
  })

  let options = (properties: Record<string, any>) => ({
    method: 'POST',
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
  })
  const promises: any[] = []
  properties.forEach((_properties) => {
    promises.push(axios.request(options(_properties)))
  })
  await Promise.all(promises)

  // const _res = await axios.request(options)

  return res.status(200).json('ok')
}
