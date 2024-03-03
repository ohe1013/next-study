import axios from 'axios'
import { TOKEN } from 'config'
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
  const { page_id } = req.query
  const properties: Record<string, any>[] = []
  const dataList = req.body
  dataList.forEach((data, idx) => {
    ;(Object.entries(data) as Entries<Record<string, Tag | Input>>).forEach(
      ([key, value]) => {
        switch (value.type) {
          case 'input':
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
          case 'tag': {
            properties[idx][value.label] = {
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
  })

  let options = (properties) => ({
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
        page_id: page_id,
      },
      properties,
    },
  })
  const promises = []
  properties.forEach((_properties) => {
    promises.push(axios.request(options(_properties)))
  })
  await Promise.all(promises)

  // const _res = await axios.request(options)

  return res.status(200).json('ok')
}
