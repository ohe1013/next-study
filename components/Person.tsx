import Link from 'next/link'
import { Person } from 'pages/person'

type PersonProps = {
  person: Person
}

export default function PersonComponent({ person }: PersonProps) {
  return (
    <li>
      <Link href="/person/personId/[id]" as={`/person/personId/${person.id}`}>
        {person.name}
      </Link>
    </li>
  )
}
