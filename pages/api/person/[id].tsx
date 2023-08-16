import { NextApiRequest, NextApiResponse } from 'next'
import { people } from '../../../data'
import { Person, ResponseError } from 'pages/person'
import { TOKEN } from 'config'
import axios from 'axios'

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>,
) {
  const { query } = req
  const { id } = query
  const options = {
    method: 'get',
    url: `https://api.notion.com/v1/pages/${id}`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
  }
  const _res = await axios.request(options)
  return await res.status(200).json(_res.data)
}
