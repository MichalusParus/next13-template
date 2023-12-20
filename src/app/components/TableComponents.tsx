import Section from '@/src/components/atoms/common/Section'
import Table from '@/src/components/organisms/table/Table'

export default function TableComponents() {
  const columns = [
    {
      label: 'label1',
      name: 'name1',
      width: 'auto',
      columns: [
        { label: 'label4', name: 'name4', width: 'auto' },
        { label: 'label5', name: 'name5', width: 'auto' },
      ],
    },
    {
      label: 'label2',
      name: 'name2',
      width: 'auto',
      columns: [
        { label: 'label6', name: 'name6', width: 'auto' },
        { label: 'label7', name: 'name7', width: 'auto' },
      ],
    },
  ]
  const data = new Array(100).fill(null).map((data, index) => ({
    id: 'data1' + index,
    name4: 'data1' + index,
    name5: 'data2' + index,
    name6: 'data3' + index,
    name7: 'data3' + index,
  }))
  const data1 = new Array(100).fill(null).map((data, index) => ({
    id: 'data12' + index,
    name4: 'data12' + index,
    name5: 'data22' + index,
    name6: 'data32' + index,
    name7: 'data3' + index,
  }))
  const data3 = new Array(100).fill(null).map((data, index) => ({
    id: 'data123' + index,
    name4: 'data123' + index,
    name5: 'data223' + index,
    name6: 'data322' + index,
    name7: 'data3' + index,
  }))

  const onRowClick = (row: any) => {
    console.log(row)
  }

  return (
    <div>
      <Section className='mt-8 w-full' type='center' title='Table'>
        <div className='flex w-full flex-wrap items-start justify-between'>
          <Table name='' className='my-4' columns={columns} rows={data} size='sm' rowsPerPage={10} />
          <Table name='' className='my-4' columns={columns} rows={data} size='md' rowsPerPage={10} />
          <Table name='' className='my-4' columns={columns} rows={data} size='lg' rowsPerPage={10} />
        </div>
      </Section>
      <Section className='mt-8 w-full' type='center' title='OnRowClick'>
        <div className='flex w-full flex-wrap items-start justify-between'>
          <Table
            name='test1'
            className='my-4'
            columns={columns}
            rows={data}
            size='sm'
            rowsPerPage={10}
            onRowClick={onRowClick}
          />
          <Table
            name='hhh'
            className='my-4'
            columns={columns}
            rows={data}
            size='md'
            rowsPerPage={10}
            onRowClick={onRowClick}
          />
          <Table
            name='jjj'
            className='my-4'
            columns={columns}
            rows={data}
            size='lg'
            rowsPerPage={10}
            onRowClick={onRowClick}
          />
        </div>
      </Section>
      <Section className='mt-8 w-full' type='center' title='Multiselect Table'>
        <div className='flex w-full flex-wrap items-start justify-between'>
          <Table
            name='test1'
            className='my-10'
            columns={columns}
            rows={data1}
            size='sm'
            rowsPerPage={10}
            multiselect={{ submitLabel: 'Submit', handleMultiselect: (value) => console.log(value) }}
          />
          <Table
            name='test2'
            style='secondary'
            className='my-10'
            columns={columns}
            rows={data3}
            size='md'
            rowsPerPage={10}
            multiselect={{ submitLabel: 'Submit', handleMultiselect: (value) => console.log(value) }}
          />
          <Table
            name='test3'
            className='my-10'
            columns={columns}
            rows={data}
            size='lg'
            rowsPerPage={10}
            multiselect={{ submitLabel: 'Submit', handleMultiselect: (value) => console.log(value) }}
          />
        </div>
      </Section>
    </div>
  )
}
