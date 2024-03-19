import axios from 'axios'
import { DATABASE_ID_ADMININFO, PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'

async function createDatabases(req: NextApiRequest, res: NextApiResponse) {}

async function queryDatabases(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${DATABASE_ID_ADMININFO}/query`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
    data: {
      filter: {
        property: 'code',
        rich_text: {
          equals: code,
        },
      },
    },
  }

  const _res = await axios.request(options)
  if (_res.data.results.length === 0) {
    return res.status(204).end()
  }
  const result: Record<string, any> = {}
  Object.entries(_res.data.results[0].properties).forEach(
    ([key, value]: [string, any]) => {
      if (value.hasOwnProperty('rich_text')) {
        result[key] = value.rich_text[0].text.content
      } else if (value.hasOwnProperty('title')) {
        result[key] = value.title[0].text.content
      }
    },
  )

  return res.status(200).json(result)
}
export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query

  switch (type) {
    case 'CREATE': {
      return await createDatabases(req, res)
    }
    case 'QUERY': {
      return await queryDatabases(req, res)
    }
  }
}
