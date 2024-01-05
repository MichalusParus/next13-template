'use client'
import { useState } from 'react'
import { Select } from '@/src/components/molecules/form/select/Select'
import Section from '@/src/components/atoms/common/Section'
import SettingIcon from '@/src/components/atoms/icons/SettingIcon'
import Dropdown from '@/src/components/molecules/popover/Dropdown'
import Table from '@/src/components/organisms/table/Table'

export default function TableComponents() {
  const [isOpen, setIsOpen] = useState(false)
  const [style, setStyle] = useState<'primary' | 'secondary' | 'none'>('primary')
  const [size, setSize] = useState<'md' | 'sm' | 'lg'>('md')
  const [type, setType] = useState<'default' | 'onRowClick' | 'multiselect'>('default')
  const [isDoubleHeader, setIsDoubleHeader] = useState<'single' | 'double'>('single')

  const doubleColumns = [
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
  const singleColumns = [
    {
      label: 'label1',
      name: 'name4',
      width: 'auto',
    },
    {
      label: 'label2',
      name: 'name5',
      width: 'auto',
    },
    {
      label: 'label3',
      name: 'name6',
      width: 'auto',
    },
    {
      label: 'label4',
      name: 'name7',
      width: 'auto',
    },
  ]
  const data = new Array(110).fill(null).map((data, index) => ({
    _id: 'data1' + index,
    name4: 'data1' + index,
    name5: 'data2' + index,
    name6: 'data3' + index,
    name7: 'data3' + index,
  }))

  const onRowClick = (row: any) => {
    console.log(row)
  }

  return (
    <div>
      <Section className='relative mt-8 w-full' type='center' title='Table'>
        <div className='absolute right-0 top-0'>
          <Dropdown
            className='[&_.DropdownContentWrap]:pt-0'
            type='right'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            hideChevron
            overlay
            style='none'
            size='lg'
            width='w-[10rem]'
            padding='0'
            title={<SettingIcon />}
          >
            <Select
              name='style'
              label='Style'
              value={style}
              options={[
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'None', value: 'none' },
              ]}
              style='secondary'
              size='sm'
              hideLabel
              hideError
              onChange={(value: 'primary' | 'secondary' | 'none') => setStyle(value)}
            />
            <Select
              name='size'
              label='Size'
              value={size}
              options={[
                { label: 'Sm', value: 'sm' },
                { label: 'Md', value: 'md' },
                { label: 'Lg', value: 'lg' },
              ]}
              style='secondary'
              size='sm'
              hideLabel
              hideError
              onChange={(value: 'md' | 'sm' | 'lg') => setSize(value)}
            />
            <Select
              name='type'
              label='Type'
              value={type}
              options={[
                { label: 'default', value: 'default' },
                { label: 'onRowClick', value: 'onRowClick' },
                { label: 'multiselect', value: 'multiselect' },
              ]}
              style='secondary'
              size='sm'
              hideLabel
              hideError
              onChange={(value: 'default' | 'onRowClick' | 'multiselect') => setType(value)}
            />
            <Select
              name='header'
              label='header'
              value={isDoubleHeader}
              options={[
                { label: 'Single-Header', value: 'single' },
                { label: 'Double-Header', value: 'double' },
              ]}
              style='secondary'
              size='sm'
              hideLabel
              hideError
              onChange={(value: 'single' | 'double') => setIsDoubleHeader(value)}
            />
          </Dropdown>
        </div>
        <div className='relative flex flex-wrap items-start justify-between'>
          <Table
            name=''
            className='my-4'
            columns={isDoubleHeader === 'single' ? singleColumns : doubleColumns}
            rows={data}
            style={style}
            size={size}
            rowsPerPage={10}
            multiselect={
              type === 'multiselect'
                ? { submitLabel: 'Console it', handleMultiselect: (value) => console.log(value) }
                : undefined
            }
            onRowClick={type === 'onRowClick' ? onRowClick : undefined}
          />
        </div>
      </Section>
    </div>
  )
}
