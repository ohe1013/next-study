import Layout from 'components/layout';
import {Client} from '@notionhq/client'
import {TOKEN, DATABASE_ID} from '../config/index'
import { useEffect } from 'react';

export default function Main({results} ) {
  useEffect(() => {
    console.log(results)
  })
  const getDatabaseDisplay = () => {
    let jsx = [];
    results.forEach((project) => {
      jsx.push(
        <div className="text-gray-600 body-font">
        <h1>{project.properties.이름.title[0].plain_text}</h1>
        <h1>{project.properties.날짜.date.start}</h1>
        </div>
      )
    });
    return jsx;
  }
  return <div>{getDatabaseDisplay()}</div>

}
// 빌드 타임에 호출
export async function getServerSideProps() {
    const notion = new Client({auth : TOKEN}
    const resultUpdate = await notion.pages.update({
      page_id : "fe82004e-dbba-4bd3-a0d5-0af18f924497",
      properties : {
        "설명" : {
          "rich_text": [
            {
              text:{
                content: "업데이트중입니다 ", 
                link: null
              },
          }
        ]
        }
      }
    })
    const result = await notion.databases.query({
      database_id: DATABASE_ID
    })
    return {
      props: {
        results : result.results
      },
    }
  }