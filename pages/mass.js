import Layout from 'components/layout'
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
}

async function ss({ userId, itemId }) {
  console.log(userId, itemId)
  const notion = new Client({ auth: TOKEN })
  const resultUser = await notion.databases.query({
    database_id: DATABASE_ID_USER,
  })
  const resultMenu = await notion.databases.query({
    database_id: DATABASE_ID_MENU,
  })
  let curUserId = ''
  let curItemId = ''
  console.log(resultMenu)

  for (let user of resultUser) {
    if (user.id == userId) curUserId = userId
  }
  console.log(curItemId, curUserId)
}
