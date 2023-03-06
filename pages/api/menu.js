import axios from 'axios'
import { TOKEN, DATABASE_ID_MENU } from '../../config/index'
export default async function menu(req, res) {
  const options = {
    method: 'post',
    url: `https://api.notion.com/v1/databases/${DATABASE_ID_MENU}/query`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
    },
    data: {
      filter: {
        property: 'search',
      },
    },
  }
  const _res = await axios.request(options)
  console.log(_res.data)
  return await res.status(200).json(_res.data)
}
