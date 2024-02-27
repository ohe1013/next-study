import Link from 'next/link'
import Confetti from 'react-confetti'
import useWindowSize from 'src/hooks/useWindowSize/useWindowSize'
import styles from './Complete.module.css'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { BottomCTA } from 'components/basic/BottomCTA'
export default function Complete() {
  const { width, height } = useWindowSize()
  const router = useRouter()
  return (
    <div
      css={tw`flex flex-col justify-center items-center mt-20 text-center w-full h-full`}
    >
      <div className={styles['checkmark-circle']}>
        <div className={styles['background']}></div>
        <div className={`${styles['checkmark']} ${styles['draw']}`}></div>
      </div>
      <Confetti width={width} height={height}></Confetti>
      <p css={tw`text-5xl my-10`}>축하합니다.</p>
      <p css={tw`text-sm my-10`}>
        처음 사용해보신다면 <a>튜토리얼</a>을 확인하세요.
      </p>

      <BottomCTA onClick={() => router.push({ pathname: '/' })}>
        홈으로가기
      </BottomCTA>
    </div>
  )
}
