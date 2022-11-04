import {TOKEN, DATABASE_ID} from '../config/index'


export default function Vote() {
  return( 
      <>
      </>
  )
}

export async function getServerSideProps() {
  const options = {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        
          'id' : 'fd6bf268-1b6c-43a4-80d8-0b015db58f60',
          'properties' :{
            "J@cT": null,
          }
        })
    };
    
    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, options)
    
    const result = await res.json();
    console.log(result)
  return {
    props: {
      result
    },
  }
}