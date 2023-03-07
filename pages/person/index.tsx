import PersonComponent from 'components/Person'
import { useQuery } from 'react-query'

export type Person = {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  gender: string
}

export type ResponseError = {
  message: string
}

//const fetcher = (url:string) => fetch(url).then((res)=> res.json())
export default function PersonIndex() {
  const fetchPersons = async () => {
    const res = await fetch('/api/person')
    return res.json()
  }
  const { data, error, isLoading } = useQuery(['getPeople'], fetchPersons)

  if (error) return <div>Error</div>
  if (isLoading) return <div>Loading</div>
  if (!data) return <div>isNotData</div>

  return (
    <ul>
      {data.map((p: Person) => (
        <PersonComponent key={p.id} person={p}></PersonComponent>
      ))}
    </ul>
  )
}
