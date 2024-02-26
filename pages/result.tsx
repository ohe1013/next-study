import { useEffect, useRef, useState } from 'react'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import Chart from 'chart.js/auto' // chartjs의 차트 클래스를 가져옴
import LoadingModal from '../components/LoadingModal'

type PieChart = Chart<'pie', number[], string>
interface Menu {
  properties: {
    name: {
      title: { text: { content: string } }[]
    }
    up: { number: number }
  }
}
export default function Main() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [chartData, setChartData] = useState<Record<string, number>>({})
  const { data: res, isLoading } = useQuery(['menus'], queryFN, {
    staleTime: 1000,
    cacheTime: 5000,
  })

  useEffect(() => {
    if (res) {
      const data: Record<string, number> = {}
      //근본적으로 res가 달라졌을때 동기화되어야 한다.
      res.results.forEach((menu: Menu) => {
        if (menu.properties.name.title[0]) {
          const key = menu.properties.name.title[0].text.content
          const value = menu.properties.up.number
          data[key] = value
        }
      })
      setChartData(data)
    }
  }, [res])
  useEffect(() => {
    if (chartRef.current) {
      const labels = Object.keys(chartData)
      const dataset = Object.values(chartData)
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: dataset,
              },
            ],
          },
        })
        return () => newChart.destroy()
      }
    }
  }, [chartData])

  return (
    <>
      {isLoading ? (
        <LoadingModal isLoading={true} />
      ) : (
        <section className="text-gray-600 pt-10 body-font">
          <div className="container px-5 mx-auto">
            <div className="w-full mx-auto">
              <canvas key={res?.request_id} ref={chartRef}></canvas>
            </div>
          </div>
          <div className="flex justify-center text-red-600">
            <span>* 예약 가능 여부에 따라 변경 취소 될 수 있습니다. *</span>
          </div>
        </section>
      )}
    </>
  )
}
// 빌드 타임에 호출

const queryFN = async (): Promise<{
  has_more: boolean
  next_cursor: any
  object: any
  page_or_database: {}
  request_id: string
  results: Array<any>
  type: string
}> => {
  return (await fetch('/api/menu/')).json()
}
// export async function getServerSideProps() {
//   const queryClient = new QueryClient()
//   await queryClient.prefetchQuery(['menu', queryFN])

//   return {
//     props: {
//       dehydratedProps: dehydrate(queryClient),
//     },
//   }
// }
