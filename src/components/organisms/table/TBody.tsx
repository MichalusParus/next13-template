import { useCallback } from 'react'
import { Checkbox } from '../../molecules/form/checkbox/Checkbox'
import { ColumnsDef, RowDef } from './types'
import Title from '../../atoms/typography/Title'

type Props = {
  name: string
  pagedData: RowDef[]
  columns: ColumnsDef[]
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  selectedRows: RowDef[]
  multiselect?: { submitLabel: string; handleMultiselect: (value: RowDef[]) => void }
  handleOnRowClick: (value: RowDef) => void
  onRowClick?: (value: RowDef) => void
}

export default function TBody({
  name,
  pagedData,
  columns,
  style = 'primary',
  size = 'md',
  selectedRows,
  multiselect,
  handleOnRowClick,
  onRowClick,
}: Props) {
  const haveSubColumns = columns.some((col) => col.columns && col.columns.length > 0)
  const mergedSubColumns = columns.map((c) => c.columns).flat()
  const columnsInRow = haveSubColumns ? mergedSubColumns : columns
  const isRowInteractive = onRowClick || multiselect
  const selectedClass = useCallback(
    (rowId: string) => {
      return selectedRows.map((r) => r.id).includes(rowId) ? 'selected' : ''
    },
    [selectedRows]
  )

  const rowStyle = {
    primary:
      'border border-primary-700 bg-primary-300 text-primary-text ' +
      'group-disabled:border-zinc-800 group-disabled:bg-zinc-400 group-disabled:text-primary-zinc-800 group-disabled:shadow-none group-disabled:cursor-not-allowed',
    secondary:
      'border border-secondary-700 bg-secondary-300 text-secondary-text ' +
      'group-disabled:border-zinc-800 group-disabled:bg-zinc-400 group-disabled:text-secondary-zinc-800 group-disabled:shadow-none group-disabled:cursor-not-allowed',
    none: '',
  }
  const rowInteractiveStyle = {
    primary:
      'hover:bg-primary-700 hover:text-primary-textHover ' +
      'focus-visible:bg-primary-700 focus-visible:text-primary-textHover ' +
      'active:bg-primary-300 active:shadow-active ' +
      '[&.selected]:bg-primary-500 [&.selected]:shadow-active [&.sorted]:bg-primary-700 ',
    secondary:
      'hover:bg-secondary-700 hover:text-secondary-textHover hover:shadow-button ' +
      'focus-visible:bg-secondary-700 focus-visible:text-secondary-textHover focus-visible:shadow-button ' +
      'active:bg-secondary-300 active:shadow-active ' +
      '[&.selected]:bg-secondary-500 [&.selected]:shadow-button [&.sorted]:bg-secondary-700 ',
    none: '',
  }
  const tdSize = {
    sm: `py-smy px-smx text-sm`,
    md: `py-mdy px-mdx text-md`,
    lg: `py-lgy px-lgx text-lg`,
  }
  const checkboxSize = {
    sm: `py-smy px-smy`,
    md: `py-mdy px-mdy`,
    lg: `py-lgy px-lgy`,
  }

  return (
    <tbody id={`tbody-${name}`}>
      {pagedData.length > 0 ? (
        pagedData.map((row) => (
          <tr
            key={row.id}
            id={row.id}
            className={`group focus:outline-none ${selectedClass(row.id)} ${rowStyle[style]} ${
              isRowInteractive ? `cursor-pointer ${rowInteractiveStyle[style]}` : 'cursor-default'
            }`}
            onClick={() => handleOnRowClick(row)}
            tabIndex={isRowInteractive ? 0 : -1}
          >
            {multiselect && (
              <td className={`${selectedClass(row.id)} ${checkboxSize[size]}`}>
                <Checkbox
                  type='fake'
                  style={style}
                  name={row.id}
                  label={row.id}
                  value={selectedRows.map((row) => row.id)}
                  options={[{ value: row.id, label: '' }]}
                  size={size}
                  onChange={() => {}}
                />
              </td>
            )}
            {columnsInRow.map((col) => (
              <td key={row.id + col!.name} className={`${selectedClass(row.id)} ${tdSize[size]}`}>
                {/* @ts-expect-error */}
                {row[col!.name]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td className={`${rowStyle[style]}`} colSpan={columnsInRow.length + (multiselect ? 1 : 0)}>
            <Title className='my-6 text-center' type='h4' style={style} size='lg'>
              No results
            </Title>
          </td>
        </tr>
      )}
    </tbody>
  )
}
