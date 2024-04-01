import axios, { AxiosResponse } from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { Entries } from 'types/util'

async function createDatabases(req: NextApiRequest, res: NextApiResponse) {
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
      Record<string, { type: `tag${string}` | `input${string}`; label: string }>
    >
  ).forEach(([key, value]) => {
    switch (true) {
      case value.type.indexOf('input') > -1:
        {
          properties[value.label] = {
            rich_text: {},
          }
        }
        break
      case value.type.indexOf('tag') > -1: {
        properties[value.label] = {
          multi_select: {},
        }
        break
      }
    }
  })
  const options = {
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

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}

async function queryDatabases(req: NextApiRequest, res: NextApiResponse) {
  const { database_id } = req.query
  let options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${database_id}/query`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
  }

  const _res: AxiosResponse = await axios.request(options)
  if (_res.data.results.length === 0) {
    return res.status(204).end()
  }
  const result = _res.data.results.map((item: any) => item.properties)

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
