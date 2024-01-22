import Header from './Header'
import Footer from './Footer'
import { Alert } from './Alert'
import { useEffect, useState } from 'react'
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
    <div className="bg-primary ">
      <Header />
      {children}
      {!isAdmin && <Footer />}
      <Alert />
    </div>
  )
}
