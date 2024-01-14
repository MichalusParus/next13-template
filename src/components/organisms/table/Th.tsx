import { useCallback, useState } from 'react'
import { ColDef, SortingDef } from './types'
import { Checkbox } from '../../molecules/form/checkbox/Checkbox'
import TableFilter from './TableFilter'
import Button from '../../atoms/common/Button'
import ChevronIcon from '../../atoms/icons/ChevronIcon'
import Title from '../../atoms/typography/Title'
import { useTranslations } from 'next-intl'

type Props = {
  name?: string
  column: ColDef
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  sorting: SortingDef
  selectAll?: string
  haveSubColumns?: boolean
  colSpan?: number
  handleAll?: (value: string[]) => void
  setSorting?: (value: SortingDef) => void
  handleFilter?: (value: { filterIn: string; filterBy: string }) => void
}

export default function Th({
  name,
  column,
  style = 'primary',
  size = 'md',
  sorting,
  selectAll,
  haveSubColumns,
  colSpan,
  handleAll,
  setSorting,
  handleFilter,
}: Props) {
  const t = useTranslations('common')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSorting = useCallback(() => {
    if (setSorting && sorting.value === column.name) {
      if (sorting.type === 'none') {
        setSorting({ value: column.name, type: 'asc' })
      } else if (sorting.type === 'asc') {
        setSorting({ value: column.name, type: 'dec' })
      } else if (sorting.type === 'dec') {
        setSorting({ value: '', type: 'none' })
      }
    } else if (setSorting) {
      setSorting({ value: column.name, type: 'asc' })
    }
  }, [sorting, column.name, setSorting])

  const onSubmit = useCallback(
    (value: string) => {
      if (handleFilter) {
        const filterIn = column.name
        handleFilter({ filterIn: filterIn, filterBy: value })
      }
    },
    [column.name, handleFilter]
  )

  const thStyle = {
    primary: 'border border-primary-900 bg-primary-500 text-primary-text ',
    secondary: 'border border-secondary-700 bg-secondary-500 text-secondary-text ',
    none: '',
  }
  const thInteractiveStyle = {
    primary:
      'hover:bg-primary-700 hover:text-primary-textHover' +
      'focus-visible:bg-primary-700 focus-visible:text-primary-textHover ' +
      '[&.sorted]:bg-primary-700 [&.sorted]:shadow-button ' +
      '[&.selected]:bg-primary-700 [&.selected]:shadow-button [&.sorted]:bg-primary-700 ' +
      'active:bg-primary-300 active:shadow-active ',
    secondary:
      'hover:bg-secondary-700 hover:text-secondary-textHover ' +
      'focus-visible:bg-secondary-700 focus-visible:text-secondary-textHover focus-visible:shadow-button ' +
      '[&.sorted]:bg-secondary-700 [&.sorted]:shadow-active ' +
      '[&.selected]:bg-secondary-700 [&.selected]:shadow-button [&.sorted]:bg-secondary-700 ' +
      'active:bg-secondary-300 active:shadow-active ',
    none: '',
  }
  const thSize = {
    sm: `p-smy`,
    md: `p-mdy`,
    lg: `p-lgy`,
  }
  const titleSize = {
    sm: `lg`,
    md: `xl`,
    lg: `2xl`,
  }
  const iconRotateState =
    sorting.value !== column.name
      ? 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
      : sorting.type === 'dec'
      ? 'opacity-100 rotate-0'
      : sorting.type === 'asc'
      ? 'opacity-100 rotate-180'
      : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'

  if (handleAll && selectAll) {
    return (
      <th
        rowSpan={2}
        className={`${thSize[size]} ${selectAll === `${name}All` ? 'selected' : ''} ${thStyle[style]} ${
          !haveSubColumns ? thInteractiveStyle[style] : ''
        }`}
      >
        <Checkbox
          className={haveSubColumns ? 'mt-[150%]' : ''}
          name={`${name}All`}
          label='all'
          value={[selectAll]}
          options={[{ value: `${name}All`, label: '' }]}
          style={style}
          size={size}
          hideError
          hideLabel
          onChange={handleAll}
          aria-label={t('selectAll')}
        />
      </th>
    )
  }

  return (
    <th
      className={`group ${sorting.value === column.name ? 'sorted' : ''} ${thStyle[style]} ${
        !haveSubColumns ? thInteractiveStyle[style] : ''
      }`}
      style={{ width: column.width }}
      colSpan={colSpan}
    >
      {setSorting && handleFilter ? (
        <div className='flex items-center justify-between'>
          <Button
            className='group peer w-full'
            style='none'
            size={size}
            ariaLabel={`${t('sortIn')} ${column.label}`}
            onClick={handleSorting}
          >
            <div className='flex w-full justify-start'>
              {column.label}
              <ChevronIcon className={`transition-dropdown ${iconRotateState}`} />
            </div>
          </Button>
          <TableFilter
            isOpen={isFilterOpen}
            column={column}
            style={style}
            setIsOpen={setIsFilterOpen}
            onSubmit={onSubmit}
          />
        </div>
      ) : (
        <Title type='h3' size={titleSize[size] as 'lg' | 'xl' | '2xl'} className={`px-mdx py-mdy`}>
          {column.label}
        </Title>
      )}
    </th>
  )
}
