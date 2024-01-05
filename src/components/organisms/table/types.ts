export type ColDef = {
  name: string
  label: string
  width: string
}

export type ColumnsDef = {
  name: string
  label: string
  width: string
  columns?: ColDef[]
}

export type RowDef = {
  _id: string
}

export type SortingDef = { value: string; type: 'asc' | 'dec' | 'none' }
