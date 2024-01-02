import { Client } from '@notionhq/client'
import { useRouter } from 'next/router'
import {
  TOKEN,
  DATABASE_ID,
  DATABASE_ID_MENU,
  DATABASE_ID_USER,
} from '../config/index'

export default function Mainss() {
  const router = useRouter()
  const { userId, itemId } = router.query
  ss({ userId, itemId })
  console.log(userId, itemId)
}

async function ss({ userId, itemId }) {
  console.log(userId, itemId)
  const data = {
    properties: {
      up: {
        number: 5,
      },
    },
  }
  const gethOption = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(data),
  }
  const patchOption = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(data),
  }
  console.log(options.headers)

  fetch(`https://api.notion.com/v1/pages/`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
}
