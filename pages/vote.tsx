import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import fetchTodosList from './api/todos'
import React, { useEffect } from 'react'

export default function Vote() {
  const { ref, inView } = useInView()

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'todos',
    ({ pageParam = 1 }) => fetchTodosList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextId !== 200 ? lastPage.nextId : undefined
      },
    },
  )
  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView, fetchNextPage])
  if (status === 'loading') return <div>loading</div>
  if (status === 'error') return <div> Error</div>
  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                height: 500,
                width: 200,
                color: 'white',
                background: 'black',
              }}
            >
              {' '}
              {page.id} {page.title}
            </div>
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <div>로딩중</div> : <div ref={ref}></div>}
    </>
  )
}
