import { useRouter } from 'next/router'
import { useQuery, QueryClient } from 'react-query'
import { Person, ResponseError } from 'pages/person'

const fetchPersons = async (id: number) => {
  const res = await fetch(`/api/person/${id}`)
  return res.json()
}

export default function PersonPage() {
  const queryClient = new QueryClient()
  const { query } = useRouter()
  const { data, error, isLoading, isSuccess } = useQuery<
    Person,
    ResponseError,
    Person,
    [string]
  >(
    ['getPeopleById'],
    () => {
      return fetchPersons(parseInt(query.id as string))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getPeople'] })
      },
    },
  )
  console.log(data, error, isLoading)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (data === undefined) return null
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair color</th>
          <th>Skin color</th>
          <th>Eye color</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {!isSuccess ? (
            <td colSpan={7} align="center">
              Validating...
            </td>
          ) : (
            <>
              <td>{data.name}</td>
              <td>{data.height}</td>
              <td>{data.mass}</td>
              <td>{data.hair_color}</td>
              <td>{data.skin_color}</td>
              <td>{data.eye_color}</td>
              <td>{data.gender}</td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
}
