import Layout from 'components/layout'
import { useEffect, useRef } from 'react'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import Chart from 'chart.js/auto' // chartjs의 차트 클래스를 가져옴
import LoadingModal from '../components/LoadingModal'
export default function Main() {
  const chartRef = useRef(null)
  const { data, isLoading } = useQuery(['menus'], queryFN, {
    staleTime: 1000,
    cacheTime: 5000,
  })

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
      const jsx = {}
      data.results.forEach((menu) => {
        if (menu.properties.name.title[0]) {
          jsx[menu.properties.name.title[0].text.content] =
            menu.properties.up.number
        }
      })
      const keys = Object.keys(jsx)
      const xAxis = []
      const yAxis = []
      keys.forEach((key) => {
        xAxis.push(key)
        yAxis.push(jsx[key])
      })
      const ctx = chartRef.current.getContext('2d')
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: xAxis,
          datasets: [
            {
              data: yAxis,
            },
          ],
        },
      })

      // 차트 객체를 참조할 수 있도록 설정
      chartRef.current.chart = newChart
    }
  }, [data])

  return (
    <Layout>
      {isLoading ? (
        <LoadingModal isLoading={true} />
      ) : (
        <section className="text-gray-600 pt-10 body-font">
          <div className="container px-5  mx-auto">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="flex justify-center text-red-600">
            <span>* 예약 가능 여부에 따라 변경 취소 될 수 있습니다. *</span>
          </div>
        </section>
      )}
    </Layout>
  )
}
// 빌드 타임에 호출

const queryFN = async () => {
  return (await fetch('/api/menu/')).json()
}
export async function getServerSideProps(context) {
  const queryClient = new QueryClient(['menus'], queryFN)
  await queryClient.prefetchQuery(['menu', queryFN])

  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  }
}
