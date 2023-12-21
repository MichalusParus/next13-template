import { ColumnsDef } from './types'
import Button from '../../atoms/common/Button'
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
      dropdownButton={
        <Button
          className={`FilterButton opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 ${filterStyle[style]}`}
          style='none'
          size='sm'
          onClick={() => setIsOpen(!isOpen)}
          icon={<FilterIcon />}
        />
      }
    >
      <SearchBar placeholder={`Search in ${column.label}`} onSubmit={handleSubmit} />
    </Dropdown>
  )
}
