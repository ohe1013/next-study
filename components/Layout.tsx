import Header from './Header'
import Footer from './Footer'
import { Alert } from './Alert'
import { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
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
    <div
      css={tw`relative mx-auto dark:[background-color: #1e293b] [min-height: 100vh] `}
    >
      <DesktopTemplate>
        <Header />
        <main
          css={tw`[max-width: 1280px] mx-auto [border: 1px outset gray] [border-radius: 3px]`}
        >
          {children}
        </main>
        <Alert />
        {/* {!isAdmin && <Footer />} */}
      </DesktopTemplate>
    </div>
  )
}

const DesktopTemplate = styled.section(() => {
  return [
    tw`absolute left-1/2  [max-width: 480px] [width: 480px] [min-height: 100vh]`,
  ]
})
