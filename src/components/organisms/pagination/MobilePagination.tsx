import { useTranslations } from 'next-intl'
import Button from '../../atoms/common/Button'
import ChevronIcon from '../../atoms/icons/ChevronIcon'

type Props = {
  className?: string
  pages: number[]
  selectedPage: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  setSelectedPage: (page: number) => void
}

export default function MobilePagination({
  className = '',
  pages,
  selectedPage,
  style = 'primary',
  size = 'md',
  setSelectedPage,
}: Props) {
  const t = useTranslations('common')

  const arrowPosition = {
    left: 'absolute -left-10 top-1/2 translate-y-[-50%] rotate-90',
    right: 'absolute -right-10 top-1/2 translate-y-[-50%] -rotate-90',
  }
  const buttonStyle = {
    primary: 'text-primary-text',
    secondary: 'text-secondary-text',
    none: '',
  }
  const buttonSize = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    none: '',
  }

  return (
    <div className={`MobilePaginationWrap ${className} relative ${pages.length > 1 ? 'visible' : 'invisible'}`}>
      <div className={`cursor-default ${buttonStyle[style]} ${buttonSize[size]}`}>
        <Button
          className={`LeftChevronButton ${arrowPosition['left']} ${buttonStyle[style]} ${
            selectedPage === 1 ? 'hidden' : 'flex'
          }`}
          style={'menu'}
          size={size}
          icon={<ChevronIcon />}
          onClick={() => setSelectedPage(selectedPage - 1)}
          aria-label={`${t('previousPage')} ${selectedPage - 1}`}
        />
        {selectedPage} / {pages.length || 1}
        <Button
          className={`RightChevronButton ${arrowPosition['right']} ${buttonStyle[style]} ${
            selectedPage === (pages.length || 1) ? 'hidden' : 'flex'
          }`}
          style={'menu'}
          size={size}
          icon={<ChevronIcon />}
          onClick={() => setSelectedPage(selectedPage + 1)}
          aria-label={`${t('nextPage')} ${selectedPage + 1}`}
        />
      </div>
    </div>
  )
}
