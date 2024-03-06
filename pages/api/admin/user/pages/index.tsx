import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'

type Input = {
  label: string
  value: string
}

export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  const properties: any = {}
  const { database_id } = req.query
  req.body.forEach((data: Input) => {
    properties[data.label] = {
      rich_text: [
        {
          text: {
            content: data.value,
          },
        },
      ],
    }
  })
  let options

  switch (requestMethod) {
    default:
    case 'POST':
      options = {
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
      }
      break
  }

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}
