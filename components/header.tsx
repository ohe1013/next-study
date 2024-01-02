import Head from 'next/head'
import DarkModeToggleButton from './dark-mode-toggle-button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <Head>
        <title>OHK 투표 사이트</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./assets/vote.png" />
      </Head>
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-0"
        >
          <span className="ml-3 dark:text-white text-xl">OHK</span>
        </Link>
        <Link
          href="/admin"
          className="flex title-font font-medium items-center text-gray-900 mb-0"
        >
          <span className="ml-3 dark:text-white text-xl">관리자</span>
        </Link>
        <nav className="ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/result" className="mr-5 hover:text-gray-900">
            결과보기
          </Link>
        </nav>
        <DarkModeToggleButton></DarkModeToggleButton>
      </div>
    </header>
  )
}
