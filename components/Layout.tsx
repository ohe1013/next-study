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
      css={tw`relative mx-auto dark:[background-color: #1e293b] [min-height: 100vh]`}
    >
      <div css={tw`w-80 `}></div>
      <DesktopTemplate>
        <Header />
        {children}
        {!isAdmin && <Footer />}
        <Alert />
      </DesktopTemplate>
    </div>
  )
}

const DesktopTemplate = styled.div(() => {
  return [
    tw`absolute left-1/2  [max-width: 480px] [width: 480px] [min-height: 100vh]`,
  ]
})
