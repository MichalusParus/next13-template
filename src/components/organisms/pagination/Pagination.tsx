import { useCallback } from 'react'
import StaticPagination from './StaticPagination'
import MobilePagination from './MobilePagination'

type Props = {
  className?: string
  pages: number[]
  selectedPage: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  maxSpread?: 7 | 9 | 11 | 13
  setSelectedPage: (page: number) => void
}

export default function Pagination({
  className = '',
  pages,
  selectedPage,
  style = 'primary',
  size = 'md',
  maxSpread,
  setSelectedPage,
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
    <div className={`PaginationWrap ${className}`}>
      <div className='PaginationInnerWrap flex sm:hidden'>
        <MobilePagination
          pages={pages}
          selectedPage={selectedPage}
          style={style}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden sm:flex md:hidden'>
        <StaticPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(7)}
          style={style}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden md:flex lg:hidden'>
        <StaticPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(9)}
          style={style}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden lg:flex xl:hidden'>
        <StaticPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(11)}
          style={style}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden xl:flex 2xl:hidden'>
        <StaticPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(13)}
          style={style}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className='PaginationInnerWrap hidden 2xl:flex'>
        <StaticPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(15)}
          style={style}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
    </div>
  )
}
