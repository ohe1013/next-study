import { useState } from 'react'

interface TeamRegisterProps {
  id: string
  name: string
  onNext: ({ id, name }: { id: string; name: string }) => void
}

export default function TeamRegister({
  id: _id,
  name: _name,
  onNext,
}: TeamRegisterProps) {
  const [id, setId] = useState(_id)
  const [name, setName] = useState(_name)
  const onClick = () => {
    onNext({ id, name })
  }
  return (
    <>
      <label>id</label>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <label>name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </>
  )
}
