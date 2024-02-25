import { Button } from 'components/basic/Button'
import Image from 'next/image'
import tw from 'twin.macro'

export default function Init({
  onNext,
}: {
  onNext: (type: 'create' | 'update') => void
}) {
  return (
    <>
      <div className="flex justify-center mt-10">
        <Image
          unoptimized
          height={200}
          width={300}
          alt="vote"
          src="../../../assets/vote.png"
          priority={false}
        ></Image>
      </div>

      <Button onClick={() => onNext('create')}>새로 등록하기</Button>
      <Button
        buttonStyle="weak"
        className={tw`mt-10`}
        onClick={() => onNext('update')}
      >
        기존 회식 수정
      </Button>
    </>
  )
}
