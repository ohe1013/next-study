// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'request'
type Data = {
  name: string
}
const getNews = () => {
  const answer: any[] = []
  return
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const answer = []
  request(
    {
      url: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%9D%B8%EB%8D%95%EC%9B%90+%EA%B3%B5%ED%83%84',
      method: 'GET',
    },
    (error, response, body) => {
      if (error) {
        console.error(error)
        return
      }
      if (response.statusCode === 200) {
        answer.push(body)
        return body
        // cheerio를 활용하여 body에서 데이터 추출
      }
    },
  ).on('complete', function (a) {
    res.status(200).json(a.body)
  })
}
