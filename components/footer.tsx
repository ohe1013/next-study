import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          href="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
        >
          <span className="ml-3 dark:text-white text-xl">OHK</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
          © 2023 OHK —
          <Link
            href="https://twitter.com/knyttneve"
            rel="noopener noreferrer"
            className="text-gray-500 sm:ml-6 sm:mt-0 mt-4  ml-1 dark:text-white"
            target="_blank"
          >
            투표
          </Link>
          <Link
            className="text-gray-500 sm:ml-6 sm:mt-0 mt-4 dark:text-white"
            href="https://www.flaticon.com/kr/free-icons/"
            title="투표 아이콘"
          >
            ©투표 아이콘 제작자: Freepik - Flaticon
          </Link>
        </p>
      </div>
    </footer>
  )
}
