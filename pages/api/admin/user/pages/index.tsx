import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { uniqueId } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'

type Input = {
  label: string
  value: string
}

export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  const properties: Array<Record<string, any>> = []
  const { database_id } = req.query
  req.body.forEach((data: Input, idx: number) => {
    properties[idx] = {
      id: {
        title: [
          {
            text: {
              content: uniqueId(),
            },
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
    properties[idx][data.label] = {
      rich_text: [
        {
          text: {
            content: data.value,
          },
        },
      ],
    }
  })
  let options = (property: any) => ({
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
      properties: property,
    },
  })
  const promises: any[] = []
  properties.forEach((_properties) => {
    console.log(_properties)
    promises.push(axios.request(options(_properties)))
  })
  await Promise.all(promises)

  return res.status(200).json('ok')
}
