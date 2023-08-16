// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: 201
  name: string
  data: string
}

export async function getData() {
  return { status: 201, name: 'John Doe', data: 'result' }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ status: 201, name: 'John Doe', data: 'result' })
}
