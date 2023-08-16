import { getData } from './api/product'

export default function Product(props: any) {
  return <div>{props.status}</div>
}

export async function getServerSideProps() {
  const results = await getData()
  return {
    props: {
      results,
    },
  }
}
