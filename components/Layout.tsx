import Header from './Header'
import Footer from './Footer'
import { Alert } from './Alert'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
export default function Layout({ children }: any) {
  //to fix temporary
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (window.location.pathname.indexOf('admin') > -1) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [setIsAdmin])
  return (
    <div css={tw`dark:[background-color: #1e293b] [min-height: 100vh]`}>
      <Header />
      {children}
      {!isAdmin && <Footer />}
      <Alert />
    </div>
  )
}
