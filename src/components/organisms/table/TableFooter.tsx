import { ColumnsDef, RowDef } from './types'
import { Select } from '../../molecules/form/select/Select'
import MobilePagination from '../pagination/MobilePagination'

type Props = {
  columns: ColumnsDef[]
  filteredData: RowDef[]
  selectedPage: number
  rowsPerPage: number
  style?: 'primary' | 'secondary' | 'none'
  multiselect?: { submitLabel: string; handleMultiselect: (value: RowDef[]) => void }
  setSelectedPage: (value: number) => void
  setRowsPerPage: (value: number) => void
}

export default function TableFooter({
  columns,
  filteredData,
  selectedPage,
  rowsPerPage,
  style = 'primary',
  multiselect,
  setSelectedPage,
  setRowsPerPage,
}: Props) {
  const haveSubColumns = columns.some((col) => col.columns && col.columns.length > 0)
  const mergedSubColumns = columns.map((c) => c.columns).flat()
  const rowPerPageOptions = new Array(5)
    .fill(null)
    .map((value, index) => ({ label: `${(index + 1) * 10}`, value: (index + 1) * 10 }))

  const handleRowsPerPage = (value: number) => {
    setSelectedPage(1)
    setRowsPerPage(value)
  }

  const footerStyle = {
    primary:
      'border border-primary-900 bg-primary-500 text-primary-text ' +
      'group-disabled:border-zinc-800 group-disabled:bg-zinc-400 group-disabled:text-primary-zinc-800 group-disabled:shadow-none group-disabled:cursor-not-allowed',
    secondary:
      'border border-secondary-900 bg-secondary-500 text-secondary-text ' +
      'group-disabled:border-zinc-800 group-disabled:bg-zinc-400 group-disabled:text-secondary-zinc-800 group-disabled:shadow-none group-disabled:cursor-not-allowed',
    none: '',
  }
  const selectStyle = {
    primary: '[&_.DropdownInnerWrap]:bg-primary-500',
    secondary: '[&_.DropdownInnerWrap]:bg-secondary-500',
    none: '',
  }

  return (
    <tfoot>
      <tr className={`${footerStyle[style]}`}>
        <td colSpan={(haveSubColumns ? mergedSubColumns.length : columns.length) + (multiselect ? 1 : 0)}>
          <div className='relative flex w-full items-center justify-between pl-4 pr-12 text-sm'>
            <div className={`flex w-[4rem] ${filteredData.length < rowsPerPage ? 'invisible' : ''}`}>
              Rows:
              <Select
                className={`ml-2 [&_.DropdownButton]:pl-2 [&_svg]:right-0 ${selectStyle}`}
                name='rowsPerPage'
                type='top'
                label='rows per page:'
                value={rowsPerPage}
                options={rowPerPageOptions}
                style={style}
                size='none'
                placeholder='Rows'
                hideError
                hideLabel
                onChange={(value: number) => handleRowsPerPage(value)}
              />
            </div>
            <MobilePagination
              className={`[&_button]:w-smHeight ${filteredData.length < rowsPerPage ? 'invisible' : ''}`}
              data={filteredData}
              itemsPerPage={rowsPerPage}
              selectedPage={selectedPage}
              style={style}
              size={'none'}
              setPage={setSelectedPage}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  )
}
