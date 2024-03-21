import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'

async function createDatabases(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
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
  req.body.forEach((data: { label: string }) => {
    properties[data.label] = {
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

async function queryDatabases(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body
  const { database_id } = req.query
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${database_id}/query`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
    data: {
      filter: {
        property: '이름',
        rich_text: {
          equals: name,
        },
      },
    },
  }

  const _res = await axios.request(options)
  if (_res.data.results.length === 0) {
    return res.status(204).end()
  }

  return res.status(200).json('ok')
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
