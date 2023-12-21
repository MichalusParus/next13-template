import { useCallback } from 'react'
import { availablePages } from '@/src/components/utils/utils'
import Button from '../../atoms/common/Button'
import ChevronIcon from '../../atoms/icons/ChevronIcon'

type Props = {
  className?: string
  data: {}[]
  selectedPage: number
  itemsPerPage: number
  pageSpread: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  setPage: (page: number) => void
}

export default function StaticPagination({
  className = '',
  data,
  selectedPage,
  itemsPerPage,
  pageSpread,
  style = 'primary',
  size = 'md',
  setPage,
}: Props) {
  const pages = availablePages(data, itemsPerPage)
  const sidePagesCount = (pageSpread - 5) / 2

  const aroundPages = useCallback(() => {
    if (selectedPage < sidePagesCount + 4) {
      return pages.slice(0, sidePagesCount * 2 + 3)
    } else if (selectedPage > pages.length - (sidePagesCount + 3)) {
      return pages.slice(pages.length - (sidePagesCount * 2 + 3), pages.length)
    }
    return pages.filter((page) => page >= selectedPage - sidePagesCount && page <= selectedPage + sidePagesCount)
  }, [selectedPage, sidePagesCount, pages])

  const displayablePages = pages.length > sidePagesCount * 2 + 6 ? aroundPages() : pages

  const buttonSize = {
    sm: 'min-w-[2rem] mx-1 ',
    md: 'min-w-[2.375rem] mx-1 md:mx-2 ',
    lg: 'min-w-[2.75rem] mx-1 md:mx-2 ',
  }
  const chevronPosition = {
    sm: '[&.LeftChevronButton]:-left-12 [&.RightChevronButton]:-right-12',
    md: '[&.LeftChevronButton]:-left-14 [&.RightChevronButton]:-right-14',
    lg: '[&.LeftChevronButton]:-left-16 [&.RightChevronButton]:-right-16',
  }
  const dottStyle = {
    primary: 'shadow-active border border-border rounded-full bg-primary-500 w-2 h-2',
    secondary: 'shadow-active border border-border rounded-full bg-secondary-500 w-2 h-2',
    none: '',
  }

  return (
    <div className={`StaticPaginationWrap ${className} flex items-center justify-center`}>
      <Button
        className={`LeftChevronButton absolute top-1/2 translate-y-[-50%] [&_svg]:rotate-90 ${chevronPosition[size]} ${
          selectedPage === 1 ? 'hidden' : 'flex'
        }`}
        style={style}
        size={size}
        icon={<ChevronIcon />}
        onClick={() => setPage(selectedPage - 1)}
      />
      {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 && (
        <Button
          key={pages[0]}
          className={`PageButton ${selectedPage === pages[0] ? 'selected' : ''} ${buttonSize[size]}`}
          style={style}
          size={size}
          icon={String(pages[0])}
          onClick={() => setPage(pages[0])}
        />
      )}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 && (
        <div className={`DottWrap flex items-center justify-around ${buttonSize[size]}`}>
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
        </div>
      )}
      {displayablePages.map((page) => (
        <Button
          key={page}
          className={`PageButton ${selectedPage === page ? 'selected' : ''} ${buttonSize[size]}`}
          style={style}
          size={size}
          icon={String(page)}
          onClick={() => setPage(page)}
        />
      ))}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage < pages.length - (sidePagesCount + 2) && (
        <div className={`DottWrap flex items-center justify-around ${buttonSize[size]}`}>
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
        </div>
      )}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage < pages.length - (sidePagesCount + 2) && (
        <Button
          key={pages[pages.length - 1]}
          className={`PageButton ${selectedPage === pages[pages.length - 1] ? 'selected' : ''} ${buttonSize[size]}`}
          style={style}
          size={size}
          icon={String(pages[pages.length - 1])}
          onClick={() => setPage(pages[pages.length - 1])}
        />
      )}
      <Button
        className={`RightChevronButton absolute top-1/2 translate-y-[-50%] [&_svg]:-rotate-90 ${
          chevronPosition[size]
        } ${selectedPage === pages.length ? 'hidden' : 'flex'}`}
        style={style}
        size={size}
        icon={<ChevronIcon />}
        onClick={() => setPage(selectedPage + 1)}
      />
    </div>
  )
}
