import Header from './header'
import Footer from './footer'
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

// export async function getServerSideProps(context) {
//     return 'asd'
// }
