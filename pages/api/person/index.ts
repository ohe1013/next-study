import { NextApiResponse, NextApiRequest } from 'next'
import { people } from '../../../data'
import { Person } from 'pages/person'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Person[]>,
) {
  return res.status(200).json(people)
}
