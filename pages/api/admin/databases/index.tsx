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
    // 데이터가 없는 경우 204 No Content 상태 코드 반환
    return res.status(204).end()
  }

  // 데이터가 있는 경우, 정상적으로 데이터 반환
  return res.status(200).json(_res.data.results)
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
