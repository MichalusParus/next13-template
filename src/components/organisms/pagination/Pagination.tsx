import { useCallback } from 'react'
import StaticPagination from './StaticPagination'
import MobilePagination from './MobilePagination'

type Props = {
  className?: string
  data: {}[]
  selectedPage: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  itemsPerPage?: number
  maxSpread?: 7 | 9 | 11 | 13
  setPage: (page: number) => void
}

export default function Pagination({
  className = '',
  data,
  selectedPage,
  style = 'primary',
  size = 'md',
  itemsPerPage = 40,
  maxSpread,
  setPage,
}: Props) {
  const getPageSpread = useCallback(
    (value: number) => {
      if (maxSpread) {
        if (maxSpread < value) {
          return maxSpread
        } else {
          return value
        }
      } else {
        return value
      }
    },
    [maxSpread]
  )

  return (
    <div className={`PaginationWrap ${className} relative`}>
      <div className='PaginationInnerWrap flex sm:hidden'>
        <MobilePagination
          data={data}
          itemsPerPage={itemsPerPage}
          selectedPage={selectedPage}
          style={style}
          size={size}
          setPage={setPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden sm:flex md:hidden'>
        <StaticPagination
          data={data}
          selectedPage={selectedPage}
          itemsPerPage={itemsPerPage}
          pageSpread={getPageSpread(7)}
          style={style}
          size={size}
          setPage={setPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden md:flex lg:hidden'>
        <StaticPagination
          data={data}
          selectedPage={selectedPage}
          itemsPerPage={itemsPerPage}
          pageSpread={getPageSpread(9)}
          style={style}
          size={size}
          setPage={setPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden lg:flex xl:hidden'>
        <StaticPagination
          data={data}
          selectedPage={selectedPage}
          itemsPerPage={itemsPerPage}
          pageSpread={getPageSpread(11)}
          style={style}
          size={size}
          setPage={setPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden xl:flex 2xl:hidden'>
        <StaticPagination
          data={data}
          selectedPage={selectedPage}
          itemsPerPage={itemsPerPage}
          pageSpread={getPageSpread(13)}
          style={style}
          size={size}
          setPage={setPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden 2xl:flex'>
        <StaticPagination
          data={data}
          selectedPage={selectedPage}
          itemsPerPage={itemsPerPage}
          pageSpread={getPageSpread(15)}
          style={style}
          size={size}
          setPage={setPage}
        />
      </div>
    </div>
  )
}
