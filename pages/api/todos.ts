import axios from 'axios'

export default async function fetchTodosList(_id: number) {
  const res = await axios.get(
    'https://jsonplaceholder.typicode.com/todos/' + _id,
  )
  const { id, title } = res.data
  return { id, title, nextId: parseInt(id) + 1 }
}
