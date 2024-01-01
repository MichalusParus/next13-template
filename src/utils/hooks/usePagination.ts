import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const usePagination = <P>(data: P[], itemsPerPage: number) => {
  const searchParams = useSearchParams()
  const [pagedData, setPagedData] = useState(data.slice(0, itemsPerPage))
  const [selectedPage, setSelectedPage] = useState(1)
  const pages = []
  const maxPageIndex = data.length % itemsPerPage === 0 ? data.length / itemsPerPage - 1 : data.length / itemsPerPage
  for (let i = 0; i <= maxPageIndex; i++) {
    pages.push(i + 1)
  }

  useEffect(() => {
    setPagedData(data.slice((selectedPage - 1) * itemsPerPage, (selectedPage - 1) * itemsPerPage + itemsPerPage))
  }, [data, selectedPage, itemsPerPage, setPagedData])

  useEffect(() => {
    setSelectedPage(1)
  }, [searchParams, setSelectedPage])

  return {
    pagedData: pagedData,
    pages: pages,
    selectedPage: selectedPage,
    setSelectedPage: setSelectedPage,
  }
}
