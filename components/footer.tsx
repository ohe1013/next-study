import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="bg-gray-100">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <span className="ml-3 dark:text-white text-xl">Jungdo</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2023 Jungdo —
            <Link
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              회식
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
