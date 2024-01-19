import { ColumnsDef } from './types'
import { useTranslations } from 'next-intl'
import { Button } from '../../atoms/common/Button'
import Dropdown from '../../molecules/popover/Dropdown'
import FilterIcon from '../../atoms/icons/FilterIcon'
import SearchBar from '../../molecules/form/SearchBar'

type Props = {
  isOpen: boolean
  column: ColumnsDef
  style?: 'primary' | 'secondary' | 'none'
  setIsOpen: (value: boolean) => void
  onSubmit: (value: string) => void
}

export default function TableFilter({ isOpen, column, style = 'primary', setIsOpen, onSubmit }: Props) {
  const t = useTranslations('common')

  const handleSubmit = (value: string) => {
    onSubmit(value)
    setIsOpen(false)
  }

  const filterStyle = {
    primary: 'text-primary-text',
    secondary: 'text-secondary-text',
    none: '',
  }

  return (
    <Dropdown
      className='peer-hover:[&_.FilterButton]:opacity-100 peer-focus-visible:[&_.FilterButton]:opacity-100'
      type='left'
      isOpen={isOpen}
      style='none'
      size='sm'
      width='w-max'
      setIsOpen={setIsOpen}
      overlay
      hideChevron
      padding=' '
      isUnlocked
      ariaLabel='Filter'
      dropdownButton={
        <Button
          className={`FilterButton opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 ${filterStyle[style]}`}
          style='none'
          size='sm'
          icon={<FilterIcon />}
          ariaLabel={`${t('filterIn')} ${column.label}`}
          onClick={() => setIsOpen(!isOpen)}
          role='combobox'
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-controls='Filter'
        />
      }
    >
      <SearchBar placeholder={`${t('tableSearch')} ${column.label}`} onSubmit={handleSubmit} />
    </Dropdown>
  )
}
