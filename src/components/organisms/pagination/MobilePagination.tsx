import Button from '../../atoms/common/Button'
import ChevronIcon from '../../atoms/icons/ChevronIcon'
import { availablePages } from '@/src/components/utils/utils'

type Props = {
  className?: string
  data: {}[]
  selectedPage: number
  itemsPerPage: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  setPage: (page: number) => void
}

export default function MobilePagination({
  className = '',
  data,
  selectedPage,
  itemsPerPage,
  style = 'primary',
  size = 'md',
  setPage,
}: Props) {
  const pages = availablePages(data, itemsPerPage)
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
    <div className={`MobilePaginationWrap relative ${className}`}>
      <div className={`cursor-default ${buttonStyle[style]} ${buttonSize[size]}`}>
        <Button
          className={`LeftChevronButton absolute -left-10 top-1/2 translate-y-[-50%] rotate-90 ${buttonStyle[style]} ${
            selectedPage === 1 ? 'hidden' : 'flex'
          }`}
          style={'menu'}
          size={size}
          icon={<ChevronIcon />}
          onClick={() => setPage(selectedPage - 1)}
        />
        {selectedPage} / {pages.length || 1}
        <Button
          className={`RightChevronButton absolute -right-10 top-1/2 translate-y-[-50%] -rotate-90 ${
            buttonStyle[style]
          } ${selectedPage === (pages.length || 1) ? 'hidden' : 'flex'}`}
          style={'menu'}
          size={size}
          icon={<ChevronIcon />}
          onClick={() => setPage(selectedPage + 1)}
        />
      </div>
    </div>
  )
}