import { useCallback, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '../../atoms/common/Button'
import ChevronIcon from '../../atoms/icons/ChevronIcon'

type Props = {
  className?: string
  pages: number[]
  selectedPage: number
  pageSpread: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  setSelectedPage: (page: number) => void
}

export default function StaticPagination({
  className = '',
  pages,
  selectedPage,
  pageSpread,
  style = 'primary',
  size = 'md',
  setSelectedPage,
}: Props) {
  const sidePagesCount = (pageSpread - 5) / 2
  const t = useTranslations('common')
  const paginationRef = useRef<any>(null)

  const aroundPages = useCallback(() => {
    if (selectedPage < sidePagesCount + 4) {
      return pages.slice(0, sidePagesCount * 2 + 3)
    } else if (selectedPage > pages.length - (sidePagesCount + 3)) {
      return pages.slice(pages.length - (sidePagesCount * 2 + 3), pages.length)
    }
    return pages.filter((page) => page >= selectedPage - sidePagesCount && page <= selectedPage + sidePagesCount)
  }, [selectedPage, sidePagesCount, pages])

  const displayablePages = pages.length > sidePagesCount * 2 + 6 ? aroundPages() : pages

  // Focus Trap
  useEffect(() => {
    let index = 0
    let open = false
    const focusableEl = paginationRef.current.querySelectorAll(
      '.PageButton, .LeftChevronButton:not(.hidden), .RightChevronButton:not(.hidden)'
    )
    const handleClick = (e: any) => {
      if ((e.target.id === `StaticPaginationWrap` && e.keyCode === 13) || (e.keyCode === 32 && !open)) {
        e.preventDefault()
        open = true
        focusableEl[0].focus()
      } else if (open) {
        switch (e.keyCode) {
          case 39:
            e.preventDefault()
            if (index + 1 === focusableEl.length) {
              focusableEl[0].focus()
              index = 0
            } else {
              focusableEl[index + 1].focus()
              index++
            }
            break
          case 37:
            e.preventDefault()
            if (index <= 0) {
              focusableEl[focusableEl.length - 1].focus()
              index = focusableEl.length - 1
            } else {
              focusableEl[index - 1].focus()
              index--
            }
            break
          case 27:
            e.preventDefault()
            open = false
            paginationRef.current.focus()
            break
          default:
            break
        }
      }
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [selectedPage])

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
    primary: 'shadow-active border border-primary-text rounded-full bg-primary-500 w-2 h-2',
    secondary: 'shadow-active border border-secondary-text rounded-full bg-secondary-500 w-2 h-2',
    none: '',
  }

  return (
    <div
      className={`StaticPaginationWrap ${className} relative flex items-center justify-center focus:outline-offset-8 focus:outline-text ${
        pages.length > 1 ? 'visible' : 'invisible'
      }`}
      ref={paginationRef}
      tabIndex={0}
      aria-label={t('pagination')}
    >
      <Button
        className={`LeftChevronButton absolute top-1/2 translate-y-[-50%] [&_svg]:rotate-90 ${chevronPosition[size]} ${
          selectedPage === 1 ? 'hidden' : 'flex'
        }`}
        style={style}
        size={size}
        icon={<ChevronIcon />}
        onClick={() => setSelectedPage(selectedPage - 1)}
        tabIndex={-1}
        aria-label={`${t('previousPage')} ${selectedPage - 1}`}
      />
      {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 ? (
        <Button
          className={`PageButton ${selectedPage === pages[0] ? 'selected' : ''} ${buttonSize[size]}`}
          style={style}
          size={size}
          icon={String(pages[0])}
          onClick={() => setSelectedPage(pages[0])}
          tabIndex={-1}
          aria-label={`${t('page')} ${pages[0]}`}
        />
      ) : null}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 ? (
        <div className={`DottWrap flex items-center justify-around ${buttonSize[size]}`}>
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
        </div>
      ) : null}
      {displayablePages.map((page) => (
        <Button
          key={page}
          className={`PageButton ${selectedPage === page ? 'selected' : ''} ${buttonSize[size]}`}
          style={style}
          size={size}
          icon={String(page)}
          onClick={() => setSelectedPage(page)}
          tabIndex={-1}
          aria-label={`${t('page')} ${page}`}
        />
      ))}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage < pages.length - (sidePagesCount + 2) ? (
        <div className={`DottWrap flex items-center justify-around ${buttonSize[size]}`}>
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
          <div className={dottStyle[style]} />
        </div>
      ) : null}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage < pages.length - (sidePagesCount + 2) ? (
        <Button
          className={`PageButton ${selectedPage === pages[pages.length - 1] ? 'selected' : ''} ${buttonSize[size]}`}
          style={style}
          size={size}
          icon={String(pages[pages.length - 1])}
          onClick={() => setSelectedPage(pages[pages.length - 1])}
          tabIndex={-1}
          aria-label={`${t('page')} ${pages[pages.length - 1]}`}
        />
      ) : null}
      <Button
        className={`RightChevronButton absolute top-1/2 translate-y-[-50%] [&_svg]:-rotate-90 ${
          chevronPosition[size]
        } ${selectedPage === pages.length ? 'hidden' : 'flex'}`}
        style={style}
        size={size}
        icon={<ChevronIcon />}
        onClick={() => setSelectedPage(selectedPage + 1)}
        tabIndex={-1}
        aria-label={`${t('nextPage')} ${selectedPage + 1}`}
      />
    </div>
  )
}
