import Header from './Header'
import Footer from './Footer'
import { Alert } from './Alert'
export default function Layout({ children }: any) {
  return (
    <div className="bg-primary ">
      <Header />
      {children}
      <Footer />
      <Alert />
    </div>
  )
}
