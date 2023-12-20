import { useCallback, useEffect, useState } from 'react'
import { ColumnsDef, RowDef, SortingDef } from './types'
import TBody from './TBody'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import Button from '../../atoms/common/Button'

type Props = {
  className?: string
  name: string
  columns: ColumnsDef[]
  rows: RowDef[]
  rowsPerPage?: number
  style?: 'primary' | 'secondary' | 'none'
  size?: 'sm' | 'md' | 'lg'
  multiselect?: { submitLabel: string; handleMultiselect: (value: RowDef[]) => void }
  onRowClick?: (value: RowDef) => void
}

export default function Table({
  className = '',
  name,
  columns,
  rows,
  rowsPerPage = 20,
  style = 'primary',
  size = 'md',
  multiselect,
  onRowClick,
}: Props) {
  const [filteredData, setFilteredData] = useState(rows)
  const [sorting, setSorting] = useState<SortingDef>({ value: '', type: 'none' })
  const [sortedData, setSortedData] = useState(filteredData)
  const [pagedData, setPagedData] = useState(sortedData.slice(0, rowsPerPage))
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage)

  const handleFilter = useCallback(
    (filter: { filterIn: string; filterBy: string }) => {
      // @ts-expect-error
      const filtered = rows.filter((row) => row[filter.filterIn].includes(filter.filterBy))
      setFilteredData(filtered)
      setSelectedPage(1)
    },
    [rows]
  )

  const handleSelect = useCallback(
    (row: RowDef) => {
      if (selectedRows.length > 0 && selectedRows.map((r) => r.id).includes(row.id)) {
        setSelectedRows(selectedRows.filter((rows) => rows.id !== row.id))
      } else {
        setSelectedRows([...selectedRows, row])
      }
    },
    [selectedRows]
  )

  const handleOnRowClick = useCallback(
    (row: RowDef) => {
      if (onRowClick) {
        onRowClick(row)
      } else if (multiselect) {
        handleSelect(row)
      }
    },
    [multiselect, handleSelect, onRowClick]
  )

  useEffect(() => {
    const handleSort = (a: any, b: any) =>
      a[sorting.value] < b[sorting.value] ? -1 : a[sorting.value] > b[sorting.value] ? 1 : 0
    if (sorting.type === 'asc') {
      setSortedData(filteredData.map((x) => x).sort((a, b) => handleSort(a, b)))
    } else if (sorting.type === 'dec') {
      setSortedData(filteredData.map((x) => x).sort((a, b) => handleSort(b, a)))
    } else {
      setSortedData(filteredData)
    }
  }, [sorting, filteredData])

  useEffect(() => {
    setPagedData(
      sortedData.slice((selectedPage - 1) * rowsPerPageState, (selectedPage - 1) * rowsPerPageState + rowsPerPageState)
    )
  }, [selectedPage, sorting, sortedData, rowsPerPageState])

  // Accessibility keyboard handler
  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.keyCode === 32 && e.target.parentElement.id === `tbody-${name}`) {
        e.preventDefault()
        handleOnRowClick(rows.find((row) => row.id === e.target.id)!)
      }
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [selectedRows, rows, name, handleOnRowClick])

  const tableStyle = {
    primary: 'border-primary-900 bg-primary-700 ',
    secondary: 'border-secondary-900 bg-secondary-700 ',
    none: '',
  }
  const submitPosition = {
    sm: '-bottom-12',
    md: '-bottom-14',
    lg: '-bottom-16',
  }

  return (
    <div className={`TableWrap ${className} relative rounded-md border-2 shadow-button ${tableStyle[style]} `}>
      <table className={`overflow-hidden rounded-md border`}>
        <TableHeader
          name={name}
          filteredData={filteredData}
          columns={columns}
          style={style}
          size={size}
          multiselect={Boolean(multiselect)}
          sorting={sorting}
          setSorting={setSorting}
          setSelectedRows={setSelectedRows}
          handleFilter={handleFilter}
        />
        <TBody
          name={name}
          pagedData={pagedData}
          columns={columns}
          selectedRows={selectedRows}
          style={style}
          size={size}
          multiselect={multiselect}
          handleOnRowClick={handleOnRowClick}
          onRowClick={onRowClick}
        />
        <TableFooter
          columns={columns}
          filteredData={filteredData}
          selectedPage={selectedPage}
          rowsPerPage={rowsPerPageState}
          style={style}
          multiselect={multiselect}
          setSelectedPage={setSelectedPage}
          setRowsPerPage={setRowsPerPageState}
        />
      </table>
      {multiselect && (
        <Button
          className={`absolute right-0 ${submitPosition[size]}`}
          style={style}
          size={size}
          onClick={() => multiselect.handleMultiselect(selectedRows)}
        >
          {multiselect.submitLabel}
        </Button>
      )}
    </div>
  )
}
