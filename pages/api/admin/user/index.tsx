import axios from 'axios'
import { PARENT_PAGE_ID, TOKEN } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
/**
{
    "parent" : {
        "type" : "page_id",
        "page_id" : "e6751993eae64f14b85f0b3140c9f542"

    },
    "title" : [
        {
            "type": "text",
            "text": {
                "content": "test",
                "link":null
            }
        }
    ],
    "properties": {
        "Name": {
          "title": {}
        },
        "Description": {
          "rich_text": {}
        },
        "In stock": {
          "checkbox": {}
        },
        "Food group": {
          "select": {
            "options": [
              {
                "name": "🥦Vegetable",
                "color": "green"
              },
              {
                "name": "🍎Fruit",
                "color": "red"
              },
              {
                "name": "💪Protein",
                "color": "yellow"
              }
            ]
          }
        },
        "Price": {
          "number": {
            "format": "dollar"
          }
        },
        "Last ordered": {
          "date": {}
        },
        "+1": {
          "people": {}
        },
        "Photo": {
          "files": {}
        }
      }
}
 */
export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  let options

  switch (requestMethod) {
    default:
    case 'POST':
      options = {
        method: 'POST',
        url: `https://api.notion.com/v1/databases`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Notion-Version': '2022-06-28',
          'content-type': 'application/json',
        },
        data: req.body,
      }
      break
  }

  const _res = await axios.request(options)

  return res.status(200).json(_res.data)
}
