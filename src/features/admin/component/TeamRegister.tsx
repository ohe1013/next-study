interface TeamRegisterProps {
  id: string
  name: string
  setId: (val: string) => void
  setName: (val: string) => void
  onClick: () => void
}

export default function TeamRegister({
  id,
  name,
  setId,
  setName,
  onClick,
}: TeamRegisterProps) {
  return (
    <>
      <label>id</label>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <label>name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onClick}>다음</button>
    </>
  )
}
