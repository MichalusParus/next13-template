import { useCallback, useState } from 'react'
import { ColumnsDef, RowDef, SortingDef } from './types'
import Th from './Th'

type Props = {
  name?: string
  filteredData: RowDef[]
  columns: ColumnsDef[]
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  multiselect?: boolean
  sorting: SortingDef
  setSorting: (value: SortingDef) => void
  setSelectedRows: (value: RowDef[]) => void
  handleFilter?: (value: { filterIn: string; filterBy: string }) => void
}

export default function TableHeader({
  name,
  filteredData,
  columns,
  style = 'primary',
  size = 'md',
  multiselect,
  sorting,
  setSorting,
  setSelectedRows,
  handleFilter,
}: Props) {
  const [selectAll, setSelectAll] = useState(`none`)
  const haveSubColumns = columns.some((col) => col.columns && col.columns.length > 0)
  const mergedSubColumns = columns.map((c) => c.columns).flat()

  const handleAll = useCallback(() => {
    if (selectAll === 'none') {
      setSelectedRows(filteredData)
      setSelectAll(`${name}All`)
    } else {
      setSelectedRows([])
      setSelectAll('none')
    }
  }, [selectAll, filteredData, name, setSelectedRows])

  return (
    <thead>
      <tr className='relative'>
        {multiselect ? (
          <Th
            name={name}
            column={columns[0]}
            sorting={sorting}
            style={style}
            size={size}
            selectAll={selectAll}
            colSpan={columns[0].columns?.length}
            haveSubColumns={haveSubColumns}
            handleAll={handleAll}
          />
        ) : null}
        {columns.map((col) => (
          <Th
            key={col.label}
            column={col}
            sorting={sorting}
            style={style}
            size={size}
            colSpan={col.columns?.length}
            setSorting={haveSubColumns ? undefined : setSorting}
            handleFilter={haveSubColumns ? undefined : handleFilter}
            haveSubColumns={haveSubColumns}
          />
        ))}
      </tr>
      {haveSubColumns ? (
        <tr className='relative'>
          {mergedSubColumns.map((col) => (
            <Th
              key={col!.label}
              column={col!}
              sorting={sorting}
              style={style}
              size={size}
              setSorting={setSorting}
              handleFilter={handleFilter}
            />
          ))}
        </tr>
      ) : null}
    </thead>
  )
}
